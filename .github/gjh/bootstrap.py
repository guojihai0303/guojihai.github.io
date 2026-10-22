"""Import the verified public portfolio into its GitHub repository once."""
import argparse
from concurrent.futures import ThreadPoolExecutor
import hashlib
import json
from pathlib import Path, PurePosixPath
import time
from urllib.request import Request, urlopen


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--manifest', required=True)
    parser.add_argument('--output', default='site')
    parser.add_argument('--source-url', required=True)
    args = parser.parse_args()
    records = json.loads(Path(args.manifest).read_text())['files']
    output = Path(args.output)
    output.mkdir(parents=True, exist_ok=True)

    def download(record):
        relative = PurePosixPath(record['path'])
        if relative.is_absolute() or '..' in relative.parts:
            raise ValueError('Unsafe asset path')
        target = output / str(relative)
        if target.is_file() and hashlib.sha256(target.read_bytes()).hexdigest() == record['sha256']:
            return relative
        for attempt in range(3):
            try:
                request = Request(args.source_url.rstrip('/') + '/' + str(relative), headers={'User-Agent': 'gjh-portfolio-migration'})
                with urlopen(request, timeout=45) as response:
                    content = response.read()
                if hashlib.sha256(content).hexdigest() != record['sha256']:
                    raise ValueError(f'Asset checksum mismatch: {relative}')
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_bytes(content)
                return relative
            except Exception:
                if attempt == 2:
                    raise
                time.sleep(attempt + 1)

    with ThreadPoolExecutor(max_workers=8) as pool:
        for index, path in enumerate(pool.map(download, records), 1):
            if index % 10 == 0 or index == len(records):
                print(f'Imported {index}/{len(records)} assets: {path}', flush=True)


if __name__ == '__main__':
    main()
