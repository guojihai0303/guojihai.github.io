"""Export the static portfolio for a GitHub Pages project path."""
import argparse
import re
import shutil
from pathlib import Path


def export(source, output, base_path):
    source, output = Path(source).resolve(), Path(output).resolve()
    if source == output or source in output.parents or output in source.parents:
        raise ValueError('Source and output must be separate directories')
    base = '/' + base_path.strip('/') + '/' if base_path.strip('/') else '/'
    if not re.fullmatch(r'/[A-Za-z0-9._/-]*', base) or '..' in base:
        raise ValueError('Invalid Pages base path')
    if output.exists():
        shutil.rmtree(output)
    shutil.copytree(source, output)
    if base != '/':
        roots = sorted(p.name for p in source.iterdir() if p.is_dir())
        root_files = sorted(p.name for p in source.iterdir() if p.is_file())
        for path in output.rglob('*'):
            if not path.is_file() or path.suffix not in {'.html', '.js', '.css', '.json', '.gltf', '.svg'}:
                continue
            text = path.read_text()
            for root in roots:
                text = text.replace('/' + root + '/', base + root + '/')
            for filename in root_files:
                text = text.replace('/' + filename, base + filename)
            # Replace actual navigation targets without changing JS split('/') or regular expressions.
            text = text.replace('href="/"', 'href="' + base + '"')
            text = text.replace('href:"/"', 'href:"' + base + '"')
            text = text.replace('"href":"/"', '"href":"' + base + '"')
            text = text.replace('href="/#', 'href="' + base + '#')
            text = text.replace('href:"/#', 'href:"' + base + '#')
            path.write_text(text)
    (output / '.nojekyll').touch()
    print(f'GitHub Pages export: {output}, base path: {base}')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--source', default='dist')
    parser.add_argument('--output', default='github-pages')
    parser.add_argument('--base-path', default='/guojihai.github.io/')
    args = parser.parse_args()
    export(args.source, args.output, args.base_path)
