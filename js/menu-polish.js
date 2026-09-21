/* Public navigation polish: accessible mobile drawer and desktop active state. */
(() => {
  'use strict';
  const enhance = () => {
    const header = document.querySelector('.site-header');
    if (!header || header.dataset.menuReady) return;
    const nav = header.querySelector('nav');
    if (!nav) return;
    header.dataset.menuReady = 'true';
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'menu-toggle';
    toggle.setAttribute('aria-label', 'Buka menu navigasi');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<span></span><span></span><span></span>';
    header.insertBefore(toggle, nav);
    const drawer = document.createElement('aside');
    drawer.className = 'mobile-drawer';
    drawer.setAttribute('aria-label', 'Menu navigasi SIPAKATAU');
    drawer.innerHTML = '<div class="drawer-head"><strong>Menu SIPAKATAU</strong><button type="button" class="drawer-close" aria-label="Tutup menu">×</button></div><div class="drawer-links"></div><div class="drawer-help"><span class="drawer-help-icon">?</span><span><strong>Butuh bantuan?</strong><small>Panduan dan aksesibilitas layanan</small></span></div>';
    const links = drawer.querySelector('.drawer-links');
    nav.querySelectorAll('a').forEach((link) => {
      const copy = link.cloneNode(true);
      copy.className = 'drawer-link' + (link.classList.contains('current') ? ' current' : '');
      links.appendChild(copy);
      copy.addEventListener('click', close);
    });
    const backdrop = document.createElement('div');
    backdrop.className = 'menu-backdrop';
    document.body.append(drawer, backdrop);
    const closeButton = drawer.querySelector('.drawer-close');
    function open() { document.body.classList.add('menu-open'); toggle.setAttribute('aria-expanded', 'true'); toggle.setAttribute('aria-label', 'Tutup menu navigasi'); closeButton.focus(); }
    function close() { document.body.classList.remove('menu-open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Buka menu navigasi'); }
    toggle.addEventListener('click', () => document.body.classList.contains('menu-open') ? close() : open());
    backdrop.addEventListener('click', close);
    closeButton.addEventListener('click', close);
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') close(); });
  };
  new MutationObserver(enhance).observe(document.body, { childList: true, subtree: true });
  enhance();
})();
