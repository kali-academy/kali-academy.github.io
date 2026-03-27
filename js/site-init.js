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
      navSteps: 'Execution Steps',
      navTools: 'Tools',
      navArticles: 'Articles',
      navDisclaimer: 'Disclaimer',
      systemOnline: 'SYSTEM ONLINE',
      indexTitle: 'Kali Academy | Learn Kali Linux and Cybersecurity',
      tutorialsTitle: 'Tutorials - KaliAcademy | Cybersecurity Lessons',
      commandsTitle: 'Commands Database - KaliAcademy | 500+ Kali Linux Commands',
      stepsTitle: 'Execution Steps - KaliAcademy | Practical Pentest Scenarios',
      toolsTitle: 'Tools Directory - KaliAcademy | Cybersecurity Tools',
      articlesTitle: 'Articles - KaliAcademy | Cybersecurity Learning Blog',
      educationalOnly: 'For educational purposes only'
    },
    ar: {
      navHome: 'الرئيسية',
      navCommands: 'الأوامر',
      navTutorials: 'الدروس',
      navSteps: 'خطوات التنفيذ',
      navTools: 'الأدوات',
      navArticles: 'مقالات',
      navDisclaimer: 'إخلاء المسؤولية',
      systemOnline: 'SYSTEM ONLINE',
      indexTitle: 'Kali Academy | تعلم كالي لينكس والأمن السيبراني بالعربي',
      tutorialsTitle: 'الدروس التعليمية - KaliAcademy | تعلم الأمن السيبراني',
      commandsTitle: 'قاعدة الأوامر - KaliAcademy | 500+ أمر Kali Linux',
      stepsTitle: 'خطوات التنفيذ - KaliAcademy | سيناريوهات اختبار الاختراق خطوة بخطوة',
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
    const header = document.querySelector('.site-header');
    if (!header || document.getElementById('langToggleBtn')) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'langToggleBtn';
    btn.className = 'lang-toggle-btn';
    btn.setAttribute('aria-label', 'Language Toggle');
    btn.addEventListener('click', () => {
      const next = getCurrentLang() === 'en' ? 'ar' : 'en';
      applyLanguage(next);
    });

    const status = header.querySelector('.header-status');
    if (status) status.insertAdjacentElement('afterend', btn);
    else header.appendChild(btn);
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
      transition: opacity 0.12s ease !important;
      will-change: opacity;
    }

    body.page-leaving { opacity: 0 !important; }

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

    .kali-skill-overlay {
      position: fixed;
      inset: 0;
      background: rgba(1, 8, 15, 0.88);
      backdrop-filter: blur(8px);
      z-index: 1000000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      animation: fadeIn .25s ease;
    }
    .kali-skill-card {
      width: min(760px, 100%);
      border: 1px solid rgba(0,255,65,.3);
      border-radius: 18px;
      background: linear-gradient(160deg, rgba(3,14,26,.96), rgba(1,8,14,.96));
      box-shadow: 0 0 40px rgba(0,255,65,.16);
      padding: 1.3rem;
      color: #d8f7df;
      animation: slideUp .35s cubic-bezier(.16,1,.3,1);
    }
    .kali-skill-title { font-family: 'Cairo', sans-serif; font-size: 1.25rem; color: #fff; margin: 0 0 .4rem; }
    .kali-skill-sub { color: #8fb0a2; margin: 0 0 .9rem; line-height: 1.7; font-size: .92rem; }
    .kali-skill-options { display: grid; grid-template-columns: repeat(auto-fit,minmax(140px,1fr)); gap: .6rem; }
    .kali-skill-btn {
      border: 1px solid rgba(0,200,255,.35);
      background: rgba(0,200,255,.1);
      color: #ccf7ff;
      border-radius: 11px;
      padding: .75rem .6rem;
      font-family: 'Cairo', sans-serif;
      font-size: .9rem;
      cursor: pointer;
      transition: all .2s ease;
    }
    .kali-skill-btn:hover { transform: translateY(-2px); background: rgba(0,200,255,.2); }
    .kali-skill-beginner { border-color: rgba(0,255,65,.38); background: rgba(0,255,65,.12); }
    .kali-skill-intermediate { border-color: rgba(255,200,0,.38); background: rgba(255,200,0,.12); }
    .kali-skill-advanced { border-color: rgba(255,0,128,.35); background: rgba(255,0,128,.11); }

    .kali-skill-chip {
      border: 1px solid rgba(0,255,65,.3);
      background: rgba(0,255,65,.09);
      color: #9fffbf;
      border-radius: 999px;
      font-family: 'Cairo', sans-serif;
      font-size: .74rem;
      padding: 4px 10px;
      margin-inline-start: .6rem;
      cursor: pointer;
      white-space: nowrap;
    }

    .reveal-on-scroll { opacity: 0; transform: translateY(18px) scale(.99); transition: opacity .55s ease, transform .55s ease; }
    .reveal-on-scroll.in-view { opacity: 1; transform: translateY(0) scale(1); }

    .limited-offer-banner {
      position: sticky;
      top: calc(var(--header-height) + 42px);
      z-index: 950;
      margin: 0 auto 1rem;
      width: min(1200px, calc(100% - 1rem));
      border: 1px solid rgba(255, 200, 0, 0.45);
      border-radius: 12px;
      background: linear-gradient(90deg, rgba(255, 200, 0, 0.16), rgba(255, 85, 0, 0.15));
      color: #ffe8b0;
      box-shadow: 0 6px 24px rgba(255, 120, 0, 0.25);
      padding: .62rem .9rem;
      font-family: 'Cairo', sans-serif;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: .75rem;
      animation: offerPulse 1.8s ease-in-out infinite;
    }
    .limited-offer-banner strong { color: #fff4d6; }
    .limited-offer-banner .offer-text { font-size: .9rem; line-height: 1.6; }
    .limited-offer-banner .offer-close {
      border: 1px solid rgba(255, 255, 255, 0.35);
      background: rgba(255, 255, 255, 0.12);
      color: #fff;
      border-radius: 8px;
      padding: .25rem .55rem;
      cursor: pointer;
      font-size: .8rem;
    }
    .limited-offer-banner .offer-close:hover { background: rgba(255, 255, 255, 0.22); }
    @keyframes offerPulse {
      0%, 100% { box-shadow: 0 6px 24px rgba(255, 120, 0, 0.25); }
      50% { box-shadow: 0 8px 30px rgba(255, 160, 0, 0.42); }
    }

    @media (max-width: 768px) {
      .limited-offer-banner {
        top: calc(var(--header-height) + 38px);
        border-radius: 10px;
        padding: .55rem .65rem;
      }
      .limited-offer-banner .offer-text { font-size: .8rem; }
    }

    @media (prefers-reduced-motion: reduce) {
      .reveal-on-scroll, .kali-skill-overlay, .kali-skill-card, .feature-card, .tool-card, .lesson-card, .scenario-card {
        animation: none !important;
        transition: none !important;
        transform: none !important;
        opacity: 1 !important;
      }
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

      // fetch منخفض الأولوية لرفع فرصة وجود الصفحة في الكاش
      try {
        fetch(abs.href, { mode: 'same-origin', credentials: 'same-origin', cache: 'force-cache' }).catch(() => {});
      } catch (_) { /* ignore */ }
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

      requestAnimationFrame(() => {
        window.location.assign(abs.href);
      });
    }

    // prefetch روابط التنقل الأساسية مباشرة بعد الجاهزية
    document.querySelectorAll('a[href]').forEach((a) => {
      if (shouldHandleLink(a)) preloadPage(a.getAttribute('href'));
    });

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

  const SKILL_LEVEL_KEY = 'kali_user_skill_level';
  const SKILL_LABELS = {
    beginner: '🌱 مبتدئ',
    intermediate: '⚡ متوسط',
    advanced: '💀 متقدم',
    unknown: '🤔 لا أعلم'
  };

  function normalizeSkillLevel(level) {
    if (level === 'beginner' || level === 'intermediate' || level === 'advanced' || level === 'unknown') return level;
    return 'unknown';
  }

  function getSkillLevel() {
    try {
      const saved = localStorage.getItem(SKILL_LEVEL_KEY);
      if (!saved) return null;
      return normalizeSkillLevel(saved);
    } catch (_) {
      return null;
    }
  }

  function setSkillLevel(level) {
    const normalized = normalizeSkillLevel(level);
    try { localStorage.setItem(SKILL_LEVEL_KEY, normalized); } catch (_) {}
    document.body?.setAttribute('data-skill-level', normalized);
    document.dispatchEvent(new CustomEvent('kali:skillChanged', { detail: { level: normalized } }));
    refreshSkillChip();
    return normalized;
  }

  function buildSkillSelectorModal() {
    if (document.getElementById('kaliSkillOverlay')) return;
    const overlay = document.createElement('div');
    overlay.className = 'kali-skill-overlay';
    overlay.id = 'kaliSkillOverlay';
    overlay.innerHTML = `
      <div class="kali-skill-card" role="dialog" aria-modal="true" aria-label="اختر مستواك">
        <h2 class="kali-skill-title">🎯 اختر مستواك لنخصص لك المحتوى</h2>
        <p class="kali-skill-sub">اختر مستوى خبرتك وسيتم ضبط الأوامر والدروس والخطوات والأدوات تلقائياً بما يناسبك.</p>
        <div class="kali-skill-options">
          <button type="button" class="kali-skill-btn kali-skill-beginner" data-skill="beginner">🌱 مبتدئ</button>
          <button type="button" class="kali-skill-btn kali-skill-intermediate" data-skill="intermediate">⚡ متوسط</button>
          <button type="button" class="kali-skill-btn kali-skill-advanced" data-skill="advanced">💀 متقدم</button>
          <button type="button" class="kali-skill-btn" data-skill="unknown">🤔 لا أعلم</button>
        </div>
      </div>
    `;

    overlay.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-skill]');
      if (!btn) return;
      setSkillLevel(btn.getAttribute('data-skill'));
      overlay.remove();
    });

    document.body.appendChild(overlay);
  }

  function refreshSkillChip() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let chip = document.getElementById('kaliSkillChip');
    if (!chip) {
      chip = document.createElement('button');
      chip.type = 'button';
      chip.id = 'kaliSkillChip';
      chip.className = 'kali-skill-chip';
      chip.addEventListener('click', buildSkillSelectorModal);
      const langBtn = document.getElementById('langToggleBtn');
      if (langBtn) langBtn.insertAdjacentElement('afterend', chip);
      else header.appendChild(chip);
    }

    const current = getSkillLevel();
    chip.textContent = current ? `المستوى: ${SKILL_LABELS[current] || current}` : 'اختر مستواك';
  }

  function initSkillSystem() {
    const current = getSkillLevel();
    if (current) {
      document.body?.setAttribute('data-skill-level', current);
    } else {
      setTimeout(buildSkillSelectorModal, 350);
    }
    refreshSkillChip();
  }

  function initLimitedOfferBanner() {
    const OFFER_KEY = 'kali_offer_banner_closed';
    try {
      if (sessionStorage.getItem(OFFER_KEY) === '1') return;
    } catch (_) {}

    if (document.getElementById('limitedOfferBanner')) return;
    const banner = document.createElement('div');
    banner.id = 'limitedOfferBanner';
    banner.className = 'limited-offer-banner';
    banner.innerHTML = `
      <div class="offer-text">🎁 <strong>الموقع مجاني لفترة محدودة</strong> — ابدأ التعلم الآن واستفد من كل الدروس، الأدوات، وخطوات التنفيذ قبل انتهاء العرض.</div>
      <button type="button" class="offer-close" aria-label="إغلاق التنبيه">إغلاق</button>
    `;

    banner.querySelector('.offer-close')?.addEventListener('click', () => {
      banner.remove();
      try { sessionStorage.setItem(OFFER_KEY, '1'); } catch (_) {}
    });

    const host = document.querySelector('.main-wrapper') || document.body;
    host.insertAdjacentElement('afterbegin', banner);
  }

  function initScrollReveal() {
    if ('IntersectionObserver' in window === false) return;
    const selector = '.hero, .section, .stats-section, .feature-card, .stat-card, .lesson-card, .scenario-card, .tool-card, .cmd-card, .articles-spotlight-card, .article-card';
    const observed = new WeakSet();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });

    function collectTargets(root = document) {
      root.querySelectorAll(selector).forEach((el) => {
        if (observed.has(el)) return;
        observed.add(el);
        el.classList.add('reveal-on-scroll');
        observer.observe(el);
      });
    }

    collectTargets();
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches && node.matches(selector)) collectTargets(node.parentElement || document);
          else collectTargets(node);
        });
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }

  function optimizeImages() {
    const images = document.querySelectorAll('img:not([data-no-lazy])');
    images.forEach((img) => {
      if (img.closest('.logo-icon')) return;
      if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
      if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
      if (!img.hasAttribute('fetchpriority')) img.setAttribute('fetchpriority', 'low');
    });
  }

  function injectPerformanceHints() {
    const hints = [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
      { rel: 'preconnect', href: 'https://cdn.jsdelivr.net', crossorigin: 'anonymous' },
    ];

    hints.forEach((hint) => {
      if (document.head.querySelector(`link[rel="${hint.rel}"][href="${hint.href}"]`)) return;
      const link = document.createElement('link');
      link.rel = hint.rel;
      link.href = hint.href;
      if (hint.crossorigin) link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    if (!document.head.querySelector('meta[name="theme-color"]')) {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = '#020b14';
      document.head.appendChild(meta);
    }
  }

  window.kaliGetSkillLevel = getSkillLevel;
  window.kaliSetSkillLevel = setSkillLevel;

  function init() {
    createLanguageToggle();
    applyLanguage(getCurrentLang());
    removeRegisterLinks();
    injectPerformanceHints();
    fastNav();
    initSkillSystem();
    initLimitedOfferBanner();
    optimizeImages();
    initScrollReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
