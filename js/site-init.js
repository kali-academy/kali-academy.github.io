// ============================================================
// SITE INIT - Core site enhancements
// ============================================================

(function () {
  'use strict';

  const LANG_STORAGE_KEY = 'kali_lang';
  const DEFAULT_LANG = 'ar';

  const TRANSLATIONS = {
    en: {
      navHome: 'Home',
      navCommands: 'Commands',
      navTutorials: 'Tutorials',
      navSteps: 'Applied Scenarios',
      navTools: 'Tools',
      navArticles: 'Articles',
      navTerminal: 'Terminal',
      navDisclaimer: 'Disclaimer',
      shareSite: 'Share',
      systemOnline: 'SYSTEM ONLINE',
      indexTitle: 'Kali Academy | Learn Kali Linux and Cybersecurity',
      tutorialsTitle: 'Tutorials - KaliAcademy | Cybersecurity Lessons',
      commandsTitle: 'Commands Database - KaliAcademy | 500 Kali Linux Commands',
      stepsTitle: 'Applied Scenarios - KaliAcademy | Practical Pentest Scenarios',
      toolsTitle: 'Tools Directory - KaliAcademy | Cybersecurity Tools',
      articlesTitle: 'Articles - KaliAcademy | Cybersecurity Learning Blog',
      educationalOnly: 'For educational purposes only'
    },
    ar: {
      navHome: 'الرئيسية',
      navCommands: 'الأوامر',
      navTutorials: 'الدروس',
      navSteps: 'السيناريوهات التطبيقية',
      navTools: 'الأدوات',
      navArticles: 'مقالات',
      navTerminal: 'Terminal',
      navDisclaimer: 'إخلاء المسؤولية',
      shareSite: 'مشاركة',
      systemOnline: 'SYSTEM ONLINE',
      indexTitle: 'Kali Academy | تعلم كالي لينكس والأمن السيبراني بالعربي',
      tutorialsTitle: 'الدروس التعليمية - KaliAcademy | تعلم الأمن السيبراني',
      commandsTitle: 'قاعدة الأوامر - KaliAcademy | 500 أمر Kali Linux',
      stepsTitle: 'السيناريوهات التطبيقية - KaliAcademy | سيناريوهات اختبار اختراق عملية',
      toolsTitle: 'دليل الأدوات - KaliAcademy | 100 أداة أمن سيبراني',
      articlesTitle: 'المقالات - KaliAcademy | مدونة تعلم الأمن السيبراني',
      educationalOnly: 'للأغراض التعليمية فقط'
    }
  };

  function getCurrentLang() {
    try {
      var saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === 'ar' || saved === 'en') return saved;
    } catch (_) {}
    return document.documentElement.lang === 'ar' ? 'ar' : DEFAULT_LANG;
  }

  function t(lang, key, fallback) {
    fallback = fallback || '';
    return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || fallback || key;
  }

  function setLang(lang) {
    var next = lang === 'ar' ? 'ar' : 'en';
    document.documentElement.lang = next;
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
    if (document.body) {
      document.body.setAttribute('dir', next === 'ar' ? 'rtl' : 'ltr');
      document.body.classList.toggle('lang-en', next === 'en');
    }
    try { localStorage.setItem(LANG_STORAGE_KEY, next); } catch (_) {}
    document.dispatchEvent(new CustomEvent('kali:langChanged', { detail: { lang: next } }));
    return next;
  }

  // Safe label replacement - prevents duplication by always cleaning text nodes first
  function replaceLinkLabel(el, text) {
    if (!el) return;
    var span = el.querySelector('span[data-i18n]');
    if (span) { span.textContent = text; return; }
    span = el.querySelector('span');
    if (span) { span.textContent = text; return; }
    var icon = el.querySelector('i');
    if (icon) {
      Array.from(el.childNodes).forEach(function(n) { if (n.nodeType === Node.TEXT_NODE) n.remove(); });
      el.appendChild(document.createTextNode(' ' + text));
    } else {
      el.textContent = text;
    }
  }

  function applySharedTexts(lang) {
    var navKeys = {
      'index.html': 'navHome', 'commands.html': 'navCommands', 'tutorials.html': 'navTutorials',
      'steps.html': 'navSteps', 'tools.html': 'navTools', 'articles.html': 'navArticles',
      'terminal.html': 'navTerminal', 'article-roadmap-cybersecurity-2026.html': 'navArticles',
      'disclaimer-owner.html': 'navDisclaimer'
    };
    Object.keys(navKeys).forEach(function(href) {
      var key = navKeys[href];
      document.querySelectorAll('a[href="' + href + '"]').forEach(function(link) {
        if (link.classList.contains('nav-link') || link.classList.contains('mobile-nav-link')) {
          replaceLinkLabel(link, t(lang, key, link.textContent.trim()));
        }
      });
    });
    var status = document.querySelector('.header-status span');
    if (status) status.textContent = t(lang, 'systemOnline', status.textContent);
  }

  function applyPageSpecificTexts(lang) {
    var page = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    if (page === 'index.html' || page === '') document.title = t(lang, 'indexTitle', document.title);
    if (page === 'tutorials.html') document.title = t(lang, 'tutorialsTitle', document.title);
    if (page === 'commands.html') document.title = t(lang, 'commandsTitle', document.title);
    if (page === 'steps.html') document.title = t(lang, 'stepsTitle', document.title);
    if (page === 'tools.html') document.title = t(lang, 'toolsTitle', document.title);
    if (page === 'articles.html') document.title = t(lang, 'articlesTitle', document.title);
  }

  // Share button: only visible on homepage
  function handleShareButtonVisibility() {
    var page = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    var isHomepage = (page === 'index.html' || page === '');
    document.querySelectorAll('[data-share-button]').forEach(function(btn) {
      var container = btn.closest('li') || btn;
      container.style.display = isHomepage ? '' : 'none';
    });
  }

  function applyLanguage(lang) {
    var applied = setLang(lang);
    applySharedTexts(applied);
    applyPageSpecificTexts(applied);
  }

  function createLanguageToggle() { /* Arabic only */ }

  window.kaliGetCurrentLang = getCurrentLang;
  window.kaliSetLanguage = applyLanguage;

  // Inject critical CSS
  var css = document.createElement('style');
  css.textContent = [
    '.site-header .logo, header .logo { gap: 12px !important; }',
    '.site-header .logo .logo-icon, header .logo .logo-icon, header .logo span.logo-icon { width:56px!important;height:56px!important;min-width:56px!important;background:transparent!important;border:none!important;box-shadow:none!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:0!important; }',
    '.site-header .logo .logo-icon img, header .logo .logo-icon img, header .logo img { width:54px!important;height:54px!important;object-fit:contain!important;border-radius:0!important;filter:drop-shadow(0 0 10px rgba(0,255,65,0.5)) drop-shadow(0 0 20px rgba(0,255,65,0.25))!important;transition:filter 0.3s ease!important; }',
    '.site-header .logo:hover .logo-icon img, header .logo:hover img { filter:drop-shadow(0 0 14px rgba(0,255,65,0.8)) drop-shadow(0 0 28px rgba(0,255,65,0.4))!important; }',
    '.logo-text { font-size:1.15rem!important;letter-spacing:2px!important;font-weight:900!important; }',
    '.logo-sub { font-size:0.65rem!important;letter-spacing:1.5px!important;opacity:0.75!important; }',
    'body { opacity:1!important;transition:none!important; }',
    'body.page-leaving,body.page-entering,body.page-ready { opacity:1!important; }',
    '.nav-link.active,.nav-link:hover { transition:all 0.2s ease!important; }',
    '.site-header { min-height:68px!important; }',
    '@media(max-width:768px){.site-header .logo .logo-icon img,header .logo .logo-icon img,header .logo img{width:46px!important;height:46px!important;}.site-header .logo .logo-icon,header .logo .logo-icon{width:46px!important;height:46px!important;min-width:46px!important;}.logo-text{font-size:1rem!important;}}',
    '#page-loader{position:fixed;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#00ff41,#0cf,#00ff41);background-size:200% 100%;animation:loaderBar 0.45s linear forwards;z-index:999999;transform-origin:left;pointer-events:none;}',
    '@keyframes loaderBar{0%{transform:scaleX(0);opacity:1;}80%{transform:scaleX(0.92);opacity:1;}100%{transform:scaleX(1);opacity:0;}}'
  ].join('\n');
  document.head.appendChild(css);

  function removeRegisterLinks() {
    ['a[href="register.html"]','a[href*="register"]','#navUserLink'].forEach(function(sel) {
      document.querySelectorAll(sel).forEach(function(el) {
        var li = el.closest('li');
        if (li) li.style.display = 'none'; else el.style.display = 'none';
      });
    });
  }

  function fastNav() {
    var preloaded = new Set();
    var sameOrigin = window.location.origin;
    function shouldHandle(a) {
      if (!a) return false;
      var h = a.getAttribute('href');
      if (!h || h.startsWith('#') || h.startsWith('mailto:') || h.startsWith('tel:')) return false;
      if (a.target === '_blank' || a.hasAttribute('download') || a.getAttribute('rel') === 'external') return false;
      return /\.html($|[?#])/.test(h) || h === '/';
    }
    function preload(href) {
      try {
        var abs = new URL(href, window.location.href);
        if (abs.origin !== sameOrigin || preloaded.has(abs.href)) return;
        preloaded.add(abs.href);
        var link = document.createElement('link');
        link.rel = 'prefetch'; link.href = abs.href; link.as = 'document';
        document.head.appendChild(link);
      } catch(_){}
    }
    document.addEventListener('pointerenter', function(e) {
      var a = e.target.closest('a[href]');
      if (shouldHandle(a)) preload(a.getAttribute('href'));
    }, true);
    document.addEventListener('touchstart', function(e) {
      var a = e.target.closest('a[href]');
      if (shouldHandle(a)) preload(a.getAttribute('href'));
    }, { passive: true, capture: true });
  }

  window.addEventListener('pageshow', function() {
    document.body.classList.remove('page-leaving','page-entering');
    document.body.classList.add('page-ready');
    document.body.style.opacity = '1';
    var loader = document.getElementById('page-loader');
    if (loader) loader.remove();
  });

  document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
      document.body.classList.remove('page-leaving','page-entering');
      document.body.style.opacity = '1';
    }
  });

  function ensureBodyVisible() {
    document.body.classList.remove('page-leaving','page-entering');
    document.body.classList.add('page-ready');
    document.body.style.opacity = '1';
    var loader = document.getElementById('page-loader');
    if (loader) loader.remove();
  }

  function init() {
    ensureBodyVisible();
    createLanguageToggle();
    applyLanguage(getCurrentLang());
    removeRegisterLinks();
    handleShareButtonVisibility();
    var lowEnd = (navigator.deviceMemory && navigator.deviceMemory <= 2) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
    if (!lowEnd) fastNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
