"""Keep a legacy Pages root identical to the custom workflow's artifact."""
import argparse
from pathlib import Path
import shutil
import subprocess


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--source', required=True)
    args = parser.parse_args()
    source = Path(args.source).resolve()
    root = Path.cwd().resolve()
    files = sorted(path for path in source.rglob('*') if path.is_file())
    staged = []
    for path in files:
        relative = path.relative_to(source)
        if relative.parts[0] == '.git':
            raise ValueError('Git metadata is not publishable')
        target = root / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(path, target)
        staged.append(str(relative))
    subprocess.run(['git', 'add', '--', *staged], check=True)
    print(f'Synchronized {len(staged)} published files')


if __name__ == '__main__':
    main()
