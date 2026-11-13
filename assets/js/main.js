(() => {
  const root = document.documentElement;
  const store = (key, value) => {
    try { value ? localStorage.setItem(key, value) : localStorage.removeItem(key); } catch (_) { /* Storage is optional. */ }
  };

  // Text size: small / default / large, remembered across pages.
  const sizeButtons = document.querySelectorAll('[data-size-option]');
  const showSize = () => sizeButtons.forEach(button =>
    button.setAttribute('aria-pressed', String(button.dataset.sizeOption === (root.dataset.size || 'default'))));
  sizeButtons.forEach(button => button.addEventListener('click', () => {
    const size = button.dataset.sizeOption;
    if (size === 'default') delete root.dataset.size; else root.dataset.size = size;
    store('reading-size', size === 'default' ? null : size);
    showSize();
  }));
  showSize();

  // Theme: cycles system → light → dark. No data-theme means "follow the system".
  const media = matchMedia('(prefers-color-scheme: dark)');
  const resolvedTheme = () => root.dataset.theme || (media.matches ? 'dark' : 'light');
  const syncGiscus = () => {
    const frame = document.querySelector('iframe.giscus-frame');
    if (frame) frame.contentWindow.postMessage({ giscus: { setConfig: { theme: resolvedTheme() } } }, 'https://giscus.app');
  };
  const toggle = document.querySelector('.theme-toggle');
  const modes = [undefined, 'light', 'dark'];
  const labelToggle = () => toggle.setAttribute('aria-label', `Theme: ${root.dataset.theme || 'system'}`);
  toggle.addEventListener('click', () => {
    const next = modes[(modes.indexOf(root.dataset.theme) + 1) % modes.length];
    if (next) root.dataset.theme = next; else delete root.dataset.theme;
    store('theme', next);
    labelToggle();
    syncGiscus();
  });
  labelToggle();
  media.addEventListener('change', syncGiscus);

  // Giscus: inject its script with the current theme so the widget matches on load.
  const giscus = document.getElementById('giscus');
  if (giscus) {
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    for (const [key, value] of Object.entries({ ...giscus.dataset, theme: resolvedTheme() })) {
      script.setAttribute('data-' + key.replace(/[A-Z]/g, c => '-' + c.toLowerCase()), value);
    }
    giscus.append(script);
  }
})();
