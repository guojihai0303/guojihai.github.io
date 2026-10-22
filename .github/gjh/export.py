"""Export the static portfolio for a GitHub Pages project path."""
import argparse
import hashlib
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
    # These customized chunks keep the upstream filenames in source. Give each
    # release new public URLs so phones cannot reuse a cached static-only build.
    chunks = ['15nh0e2k5nwqq.js', '1dbwvjy7oq4ue.js', '3v38rxbik4q2p.js', '31w90vyaxe_4q.js']
    chunk_dir = output / '_next/static/chunks'
    digest = hashlib.sha256()
    for name in chunks:
        digest.update((chunk_dir / name).read_bytes())
    version = digest.hexdigest()[:12]
    renamed = {name: name[:-3] + '-gjh-' + version + '.js' for name in chunks}
    for path in output.rglob('*'):
        if path.is_file() and path.suffix in {'.html', '.js', '.json'}:
            text = path.read_text()
            updated = text
            for old, new in renamed.items():
                updated = updated.replace(old, new)
            if updated != text:
                path.write_text(updated)
    for old, new in renamed.items():
        (chunk_dir / old).rename(chunk_dir / new)
    (output / '.nojekyll').touch()
    print(f'GitHub Pages export: {output}, base path: {base}')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--source', default='dist')
    parser.add_argument('--output', default='github-pages')
    parser.add_argument('--base-path', default='/guojihai.github.io/')
    args = parser.parse_args()
    export(args.source, args.output, args.base_path)
