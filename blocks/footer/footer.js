import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';

/**
 * loads and decorates the footer
 * @param {Element} block The header block element
 */

export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';
  const footerPath = cfg.footer || '/footer';
  const resp = await fetch(`${footerPath}.plain.html`, window.location.pathname.endsWith('/footer') ? { cache: 'reload' } : {});
  const html = await resp.text();
  const footer = document.createElement('div');
  footer.innerHTML = html;

  var links = footer.getElementsByClassName('links')[0];
  var container = links.getElementsByTagName('div')[0];
  container.className = 'grid';

  var rows = links.getElementsByTagName('ul');
  Array.from(rows).forEach(element => {
    element.className = 'link';
  });

  var copyright = footer.getElementsByClassName('copyright')[0];
  var container = copyright.getElementsByTagName('div')[0];
  container.className = 'grid';

  await decorateIcons(footer);
  block.append(footer);
}
