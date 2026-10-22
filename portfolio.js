(() => {
  let projectsPromise;
  let projects = [];
  let active = 0;
  let dialog;
  let previousFocus;
  let previousOverflow = '';

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  function ensureDialog() {
    if (dialog) return;
    dialog = el('dialog', 'portfolio-viewer');
    dialog.setAttribute('aria-labelledby', 'portfolio-viewer-title');
    dialog.setAttribute('data-lenis-prevent', '');
    const shell = el('div', 'portfolio-viewer-shell');
    const nav = el('header', 'portfolio-viewer-nav');
    const title = el('p', 'portfolio-viewer-title');
    title.id = 'portfolio-viewer-title';
    const count = el('span', 'portfolio-viewer-count');
    const close = el('button', 'portfolio-viewer-close');
    close.type = 'button';
    close.setAttribute('aria-label', '关闭项目详情');
    close.append(el('span', '', '关闭'), el('span', '', '×'));
    close.addEventListener('click', () => dialog.close());
    nav.append(title, count, close);
    const scroll = el('div', 'portfolio-viewer-scroll');
    scroll.setAttribute('data-lenis-prevent', '');
    shell.append(nav, scroll);
    dialog.append(shell);
    document.body.append(dialog);
    dialog.addEventListener('wheel', event => event.stopPropagation(), { passive: true });
    dialog.addEventListener('touchmove', event => event.stopPropagation(), { passive: true });
    dialog.addEventListener('keydown', event => event.stopPropagation());
    dialog.addEventListener('close', () => {
      document.documentElement.style.overflow = previousOverflow;
      dialog.querySelector('.portfolio-viewer-scroll').replaceChildren();
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    });
  }

  function renderProject(index) {
    active = (index + projects.length) % projects.length;
    const project = projects[active];
    dialog.querySelector('.portfolio-viewer-title').textContent = project.name;
    dialog.querySelector('.portfolio-viewer-count').textContent = `${project.number} / 08`;
    const scroll = dialog.querySelector('.portfolio-viewer-scroll');
    const intro = el('header', 'portfolio-viewer-intro');
    intro.append(el('p', '', project.category), el('h2', '', project.name), el('p', '', project.summary));
    const board = el('div', 'portfolio-board');
    for (const [index, tile] of project.tiles.entries()) {
      const image = el('img');
      image.src = tile.src;
      image.width = tile.width;
      image.height = tile.height;
      image.alt = `${project.name}设计方案，第 ${index + 1} 部分`;
      image.loading = index === 0 ? 'eager' : 'lazy';
      image.decoding = 'async';
      board.append(image);
    }
    const footer = el('footer', 'portfolio-viewer-footer');
    const previous = el('button', '', `← ${projects[(active - 1 + projects.length) % projects.length].name}`);
    const next = el('button', '', `${projects[(active + 1) % projects.length].name} →`);
    previous.type = next.type = 'button';
    previous.addEventListener('click', () => renderProject(active - 1));
    next.addEventListener('click', () => renderProject(active + 1));
    footer.append(previous, next);
    scroll.replaceChildren(intro, board, footer);
    scroll.scrollTop = 0;
  }

  document.addEventListener('click', async event => {
    const link = event.target.closest('a[data-project]');
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (typeof HTMLDialogElement === 'undefined') return;
    event.preventDefault();
    ensureDialog();
    previousFocus = link;
    previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    dialog.querySelector('.portfolio-viewer-title').textContent = '项目详情';
    dialog.querySelector('.portfolio-viewer-count').textContent = '';
    dialog.querySelector('.portfolio-viewer-scroll').replaceChildren(el('p', 'portfolio-viewer-loading', '正在加载作品…'));
    dialog.showModal();
    try {
      projectsPromise ||= fetch('/guojihai.github.io/portfolio/projects.json').then(response => {
        if (!response.ok) throw new Error('Portfolio unavailable');
        return response.json();
      }).catch(error => { projectsPromise = undefined; throw error; });
      projects = await projectsPromise;
      const index = projects.findIndex(project => project.id === link.dataset.project);
      if (index < 0) throw new Error('Unknown project');
      if (dialog.open) renderProject(index);
    } catch {
      dialog.close();
      location.assign(link.href);
    }
  });
})();
