(function () {
  var root = document.documentElement;
  var themeBtn = document.getElementById('themeToggle');
  var themeText = document.getElementById('themeToggleText');

  function syncThemeUI() {
    var dark = root.getAttribute('data-theme') === 'dark';
    if (themeBtn) themeBtn.setAttribute('aria-pressed', dark ? 'true' : 'false');
    if (themeText) themeText.textContent = dark ? 'Terang' : 'Gelap';
  }

  syncThemeUI();
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var nextDark = root.getAttribute('data-theme') !== 'dark';
      if (nextDark) root.setAttribute('data-theme', 'dark');
      else root.removeAttribute('data-theme');
      try { localStorage.setItem('kk_theme', nextDark ? 'dark' : 'light'); } catch (_) {}
      syncThemeUI();
    });
  }

  var menuBtn = document.getElementById('menuToggle');
  var drawer = document.getElementById('mobileDrawer');
  if (menuBtn && drawer) {
    function setMenuOpen(open) {
      drawer.classList.toggle('open', open);
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    menuBtn.addEventListener('click', function () {
      setMenuOpen(!drawer.classList.contains('open'));
    });
    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setMenuOpen(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        setMenuOpen(false);
        menuBtn.focus();
      }
    });
  }
})();
