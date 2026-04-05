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
      navDisclaimer: 'Disclaimer',
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
      navDisclaimer: 'إخلاء المسؤولية',
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
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === 'ar' || saved === 'en') return saved;
    } catch (_) {}
    return document.documentElement.lang === 'ar' ? 'ar' : DEFAULT_LANG;
  }

  function t(lang, key, fallback = '') {
    return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || fallback || key;
  }

  function setLang(lang) {
    const next = lang === 'ar' ? 'ar' : 'en';
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

  function replaceLinkLabel(el, text) {
    if (!el) return;
    const span = el.querySelector('span[data-i18n]');
    if (span) {
      span.textContent = text;
      return;
    }
    const icon = el.querySelector('i');
    if (icon) {
      const textNodes = Array.from(el.childNodes).filter((n) => n.nodeType === Node.TEXT_NODE);
      textNodes.forEach((n) => n.remove());
      el.appendChild(document.createTextNode(' ' + text));
    } else {
      el.textContent = text;
    }
  }

  function applySharedTexts(lang) {
    const navKeys = {
      'index.html': 'navHome',
      'commands.html': 'navCommands',
      'tutorials.html': 'navTutorials',
      'steps.html': 'navSteps',
      'tools.html': 'navTools',
      'articles.html': 'navArticles',
      'article-roadmap-cybersecurity-2026.html': 'navArticles',
      'disclaimer-owner.html': 'navDisclaimer'
    };

    Object.entries(navKeys).forEach(([href, key]) => {
      document.querySelectorAll(`a[href="${href}"]`).forEach((link) => {
        replaceLinkLabel(link, t(lang, key, link.textContent.trim()));
      });
    });

    const status = document.querySelector('.header-status span');
    if (status) status.textContent = t(lang, 'systemOnline', status.textContent);

    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) langBtn.textContent = lang === 'en' ? 'AR' : 'EN';
  }

  function applyPageSpecificTexts(lang) {
    const page = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    if (page === 'index.html' || page === '') document.title = t(lang, 'indexTitle', document.title);
    if (page === 'tutorials.html') document.title = t(lang, 'tutorialsTitle', document.title);
    if (page === 'commands.html') document.title = t(lang, 'commandsTitle', document.title);
    if (page === 'steps.html') document.title = t(lang, 'stepsTitle', document.title);
    if (page === 'tools.html') document.title = t(lang, 'toolsTitle', document.title);
    if (page === 'articles.html') document.title = t(lang, 'articlesTitle', document.title);

    document.querySelectorAll('.footer-bottom').forEach((el) => {
      if (el.textContent.includes('للأغراض التعليمية فقط') || el.textContent.includes('For educational purposes only')) {
        el.textContent = `⚠️ ${t(lang, 'educationalOnly')} | © 2026 Kali Academy`;
      }
    });
  }

  function applyLanguage(lang) {
    const applied = setLang(lang);
    applySharedTexts(applied);
    applyPageSpecificTexts(applied);
  }

  function createLanguageToggle() {
    // Language toggle removed - site is Arabic only
  }

  window.kaliGetCurrentLang = getCurrentLang;
  window.kaliSetLanguage = applyLanguage;

const css = document.createElement('style');
  css.textContent = `
    .site-header .logo,
    header .logo { gap: 12px !important; }

    .site-header .logo .logo-icon,
    header .logo .logo-icon,
    header .logo span.logo-icon {
      width: 56px !important;
      height: 56px !important;
      min-width: 56px !important;
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      padding: 0 !important;
    }

    .site-header .logo .logo-icon img,
    header .logo .logo-icon img,
    header .logo img {
      width: 54px !important;
      height: 54px !important;
      object-fit: contain !important;
      border-radius: 0 !important;
      filter: drop-shadow(0 0 10px rgba(0,255,65,0.5)) drop-shadow(0 0 20px rgba(0,255,65,0.25)) !important;
      transition: filter 0.3s ease !important;
    }

    .site-header .logo:hover .logo-icon img,
    header .logo:hover img {
      filter: drop-shadow(0 0 14px rgba(0,255,65,0.8)) drop-shadow(0 0 28px rgba(0,255,65,0.4)) !important;
    }

    .logo-text {
      font-size: 1.15rem !important;
      letter-spacing: 2px !important;
      font-weight: 900 !important;
    }

    .logo-sub {
      font-size: 0.65rem !important;
      letter-spacing: 1.5px !important;
      opacity: 0.75 !important;
    }

    body {
      transition: opacity 0.15s ease !important;
    }

    body.page-leaving { opacity: 0 !important; }
    body.page-entering { opacity: 0; }
    body.page-ready { opacity: 1; transition: opacity 0.15s ease; }

    .nav-link.active,
    .nav-link:hover {
      transition: all 0.2s ease !important;
    }

    .site-header { min-height: 68px !important; }

    @media (max-width: 768px) {
      .site-header .logo .logo-icon img,
      header .logo .logo-icon img,
      header .logo img {
        width: 46px !important;
        height: 46px !important;
      }
      .site-header .logo .logo-icon,
      header .logo .logo-icon {
        width: 46px !important;
        height: 46px !important;
        min-width: 46px !important;
      }
      .logo-text { font-size: 1rem !important; }
    }

    #page-loader {
      position: fixed;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: linear-gradient(90deg, #00ff41, #0cf, #00ff41);
      background-size: 200% 100%;
      animation: loaderBar 0.45s linear forwards;
      z-index: 999999;
      transform-origin: left;
      pointer-events: none;
    }

    @keyframes loaderBar {
      0%   { transform: scaleX(0); opacity: 1; }
      80%  { transform: scaleX(0.92); opacity: 1; }
      100% { transform: scaleX(1); opacity: 0; }
    }
  `;
  document.head.appendChild(css);

  // إخفاء روابط التسجيل
  function removeRegisterLinks() {
    const selectors = [
      'a[href="register.html"]',
      'a[href*="register"]',
      '#navUserLink'
    ];

    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        const li = el.closest('li');
        if (li) li.style.display = 'none';
        else el.style.display = 'none';
      });
    });
  }

  // التنقل السريع
  function fastNav() {
    const preloaded = new Set();
    const sameOrigin = window.location.origin;

    function shouldHandleLink(a) {
      if (!a) return false;
      const href = a.getAttribute('href');
      if (!href) return false;
      if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
      if (a.target === '_blank' || a.hasAttribute('download')) return false;
      if (a.getAttribute('rel') === 'external') return false;
      if (a.dataset.noFastNav === 'true') return false;
      return /\.html($|[?#])/.test(href) || href === '/';
    }

    function toAbsolute(href) {
      try {
        return new URL(href, window.location.href);
      } catch (_) {
        return null;
      }
    }

    function preloadPage(href) {
      const abs = toAbsolute(href);
      if (!abs || abs.origin !== sameOrigin) return;

      const cacheKey = abs.href;
      if (preloaded.has(cacheKey)) return;
      preloaded.add(cacheKey);

      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = abs.href;
      link.as = 'document';
      document.head.appendChild(link);
    }

    function navigateFast(href) {
      const abs = toAbsolute(href);
      if (!abs) return;

      if (abs.href === window.location.href) return;

      if (!document.getElementById('page-loader')) {
        const loader = document.createElement('div');
        loader.id = 'page-loader';
        document.body.appendChild(loader);
      }

      document.body.classList.add('page-leaving');

      // Navigate after lightweight transition
      setTimeout(function () {
        window.location.assign(abs.href);
      }, 70);
    }

    // prefetch فقط عند نية المستخدم (hover/touch) لتقليل الحمل
    document.addEventListener('pointerenter', function (e) {
      const a = e.target.closest('a[href]');
      if (!shouldHandleLink(a)) return;
      preloadPage(a.getAttribute('href'));
    }, true);

    document.addEventListener('touchstart', function (e) {
      const a = e.target.closest('a[href]');
      if (!shouldHandleLink(a)) return;
      preloadPage(a.getAttribute('href'));
    }, { passive: true, capture: true });

    document.addEventListener('click', function (e) {
      const a = e.target.closest('a[href]');
      if (!shouldHandleLink(a)) return;

      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
        return;
      }

      e.preventDefault();
      navigateFast(a.getAttribute('href'));
    }, true);
  }

  // Fix: Remove page-leaving class on page show (handles bfcache restoration)
  window.addEventListener('pageshow', function (e) {
    document.body.classList.remove('page-leaving');
    // Remove the loader if it exists from a previous navigation
    var loader = document.getElementById('page-loader');
    if (loader) loader.remove();
  });

  // Fix: Ensure body is always visible when the page first becomes interactive
  function ensureBodyVisible() {
    document.body.classList.remove('page-leaving');
    var loader = document.getElementById('page-loader');
    if (loader) loader.remove();
  }

  function init() {
    ensureBodyVisible();
    createLanguageToggle();
    applyLanguage(getCurrentLang());
    removeRegisterLinks();

    const lowEnd = (navigator.deviceMemory && navigator.deviceMemory <= 2) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
    if (!lowEnd) {
      fastNav();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
