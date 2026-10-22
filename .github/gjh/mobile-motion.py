"""Apply the mobile portfolio update to the existing GitHub source snapshot."""
import argparse
import hashlib
import json
from pathlib import Path


PATCHES = {
    '_next/static/chunks/3v38rxbik4q2p.js': (
        'function s(e){return e>767}',
        'function s(e){return e>0}',
    ),
    '_next/static/chunks/15nh0e2k5nwqq.js': (
        'g=p&&n>0&&n<768,y=!f&&(0,as.shouldLoadStaticPortfolioImages)(n,a)',
        'g=!f&&p&&n>0&&n<768,y=!f&&(h||d||(0,as.shouldLoadStaticPortfolioImages)(n,a))',
    ),
    '_next/static/chunks/1dbwvjy7oq4ue.js': (
        'let r=new a.WebGLRenderer({canvas:t,alpha:!0,antialias:!0}),C=window.innerWidth',
        'let r;try{r=new a.WebGLRenderer({canvas:t,alpha:!0,antialias:!0})}catch{R();return}let C=window.innerWidth',
    ),
}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--source', default='site')
    parser.add_argument('--manifest', default='.github/gjh/assets.json')
    args = parser.parse_args()
    source = Path(args.source)
    updates = {}
    for relative, (before, after) in PATCHES.items():
        path = source / relative
        text = path.read_text()
        if text.count(before) == 1:
            updates[path] = text.replace(before, after, 1)
        elif text.count(before) != 0 or text.count(after) != 1:
            raise ValueError(f'Unexpected source; refusing to patch {relative}')
    for path, text in updates.items():
        path.write_text(text)
    manifest_path = Path(args.manifest)
    manifest = json.loads(manifest_path.read_text())
    for record in manifest['files']:
        if record['path'] in PATCHES:
            data = (source / record['path']).read_bytes()
            record['sha256'] = hashlib.sha256(data).hexdigest()
            if 'bytes' in record:
                record['bytes'] = len(data)
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, separators=(',', ':')) + '\n')
    print(f'Mobile portfolio motion ready; updated {len(updates)} chunks')


if __name__ == '__main__':
    main()
