// ============================================================
// SITE INIT
// - Header/logo polish
// - Fast page transitions
// - Global language handling (EN default)
// ============================================================

(function () {
  'use strict';

  const LANG_STORAGE_KEY = 'kali_lang';
  const DEFAULT_LANG = 'en';

  const TRANSLATIONS = {
    en: {
      navHome: 'Home',
      navCommands: 'Commands',
      navTutorials: 'Tutorials',
      navSteps: 'Execution Steps',
      navTools: 'Tools',
      navDisclaimer: 'Disclaimer',
      systemOnline: 'SYSTEM ONLINE',
      indexTitle: 'Kali Academy | Learn Kali Linux and Cybersecurity',
      tutorialsTitle: 'Tutorials - KaliAcademy | Cybersecurity Lessons',
      commandsTitle: 'Commands Database - KaliAcademy | 500+ Kali Linux Commands',
      stepsTitle: 'Execution Steps - KaliAcademy | Practical Pentest Scenarios',
      toolsTitle: 'Tools Directory - KaliAcademy | Cybersecurity Tools',
      homeHeroLine1: 'Learn Cybersecurity',
      homeHeroLine3: 'From Zero to Professional',
      homeBtnCommands: 'Explore Commands',
      homeBtnStart: 'Start Learning',
      homeBtnSteps: 'Execution Steps',
      shareSite: 'Share Site',
      tutorialCountLabel: 'Tutorials',
      tutorialDesc: 'Comprehensive step-by-step lessons for Kali Linux and cybersecurity tools.',
      tutorialSearch: 'Search tutorials...',
      commandsHeroTitle: 'Commands Database',
      commandsHeroDesc: 'A practical command reference for Kali Linux and penetration testing.',
      commandsSearch: 'Search command, tool, or description... e.g. nmap scan',
      commandsSearchCount: 'commands available for search',
      stepsHeroTitle: 'Execution Steps',
      stepsHeroDesc: 'Full penetration testing scenarios from reconnaissance to reporting.',
      stepsCountLabel: 'practical scenarios',
      stepsDifficultyAll: 'All',
      stepsDifficultyEasy: 'Easy',
      stepsDifficultyMedium: 'Medium',
      stepsDifficultyHard: 'Hard',
      stepsTypeRecon: 'Recon',
      stepsTypeWeb: 'Web',
      stepsTypeNetwork: 'Network',
      stepsTypeExploit: 'Exploitation',
      stepsTypeForensics: 'Forensics',
      stepsTypePassword: 'Passwords',
      stepsTypeLinux: 'Linux',
      stepsTypeCtf: 'CTF',
      stepsTypeDefense: 'Defense',
      toolsHeroTitle: 'Tools Directory',
      toolsHeroDesc: 'A curated list of cybersecurity tools with practical usage examples.',
      toolsCountLabel: 'documented tools',
      toolsSearch: 'Search tools... e.g. nmap, burp, wireshark',
      educationalOnly: 'For educational purposes only'
    },
    ar: {
      navHome: 'الرئيسية',
      navCommands: 'الأوامر',
      navTutorials: 'الدروس',
      navSteps: 'خطوات التنفيذ',
      navTools: 'الأدوات',
      navDisclaimer: 'إخلاء المسؤولية',
      systemOnline: 'SYSTEM ONLINE',
      indexTitle: 'Kali Academy | تعلم كالي لينكس والأمن السيبراني بالعربي',
      tutorialsTitle: 'الدروس التعليمية - KaliAcademy | تعلم الأمن السيبراني',
      commandsTitle: 'قاعدة الأوامر - KaliAcademy | 500+ أمر Kali Linux',
      stepsTitle: 'خطوات التنفيذ - KaliAcademy | سيناريوهات اختبار الاختراق خطوة بخطوة',
      toolsTitle: 'دليل الأدوات - KaliAcademy | 100 أداة أمن سيبراني',
      homeHeroLine1: 'تعلّم الأمن السيبراني',
      homeHeroLine3: 'من الصفر إلى الاحتراف',
      homeBtnCommands: 'استكشف الأوامر',
      homeBtnStart: 'ابدأ التعلم',
      homeBtnSteps: 'خطوات التنفيذ',
      shareSite: 'مشاركة الموقع',
      tutorialCountLabel: 'درس تعليمي',
      tutorialDesc: 'دروس شاملة خطوة بخطوة لتعلم أدوات Kali Linux والأمن السيبراني — من المبتدئ حتى الاحتراف',
      tutorialSearch: 'ابحث في الدروس...',
      commandsHeroTitle: 'قاعدة بيانات الأوامر',
      commandsHeroDesc: 'أكبر مرجع عربي لأوامر كالي لينكس — كل أمر بشرح تفصيلي كامل، خيارات، أمثلة تطبيقية ونصائح احترافية',
      commandsSearch: '🔍  ابحث عن أمر، أداة، أو وصف... مثال: nmap scan',
      commandsSearchCount: 'أمر متاح للبحث',
      stepsHeroTitle: 'خطوات التنفيذ',
      stepsHeroDesc: 'سيناريوهات اختبار اختراق كاملة خطوة بخطوة — من الاستطلاع حتى التقرير. تتبع تقدمك وانسخ الأوامر مباشرة.',
      stepsCountLabel: 'سيناريو تطبيقي',
      stepsDifficultyAll: 'الكل',
      stepsDifficultyEasy: 'سهل',
      stepsDifficultyMedium: 'متوسط',
      stepsDifficultyHard: 'صعب',
      stepsTypeRecon: 'استطلاع',
      stepsTypeWeb: 'ويب',
      stepsTypeNetwork: 'شبكات',
      stepsTypeExploit: 'استغلال',
      stepsTypeForensics: 'جنائي',
      stepsTypePassword: 'كلمات مرور',
      stepsTypeLinux: 'Linux',
      stepsTypeCtf: 'CTF',
      stepsTypeDefense: 'دفاع',
      toolsHeroTitle: 'دليل الأدوات',
      toolsHeroDesc: 'دليل شامل لأدوات Kali Linux والأمن السيبراني مع الاستخدامات العملية.',
      toolsCountLabel: 'أداة موثقة',
      toolsSearch: 'ابحث في الأدوات... مثال: nmap',
      educationalOnly: 'للأغراض التعليمية فقط'
    }
  };

  function getCurrentLang() {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    if (stored === 'ar' || stored === 'en') return stored;
    return DEFAULT_LANG;
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
    localStorage.setItem(LANG_STORAGE_KEY, next);
    document.dispatchEvent(new CustomEvent('kali:langChanged', { detail: { lang: next } }));
    return next;
  }

  function replaceLinkLabel(el, text) {
    if (!el) return;
    const icon = el.querySelector('i');
    if (icon) {
      const textNodes = Array.from(el.childNodes).filter((node) => node.nodeType === Node.TEXT_NODE);
      textNodes.forEach((node) => node.remove());
      el.querySelectorAll('span').forEach((sp) => {
        if (!sp.hasAttribute('data-i18n')) sp.remove();
      });
      const targetSpan = el.querySelector('span[data-i18n]');
      if (targetSpan) {
        targetSpan.textContent = text;
      } else {
        el.appendChild(document.createTextNode(' ' + text));
      }
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

    document.querySelectorAll('[data-i18n-placeholder="tutorialSearch"]').forEach((el) => {
      el.setAttribute('placeholder', t(lang, 'tutorialSearch', el.getAttribute('placeholder') || ''));
    });
  }

  function applyPageSpecificTexts(lang) {
    const page = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();

    if (page === 'index.html' || page === '') {
      document.title = t(lang, 'indexTitle', document.title);
    } else if (page === 'tutorials.html') {
      document.title = t(lang, 'tutorialsTitle', document.title);
      const heading = document.getElementById('tutorialTitleHeading');
      if (heading) {
        heading.innerHTML = lang === 'en' ? 'Cybersecurity <span>Tutorials</span>' : 'الدروس <span>التعليمية</span>';
      }
      const desc = document.querySelector('[data-i18n="tutorialDesc"]');
      if (desc) desc.textContent = t(lang, 'tutorialDesc', desc.textContent);
      const badge = document.querySelector('[data-i18n="tutorialCountLabel"]');
      if (badge) badge.textContent = t(lang, 'tutorialCountLabel', badge.textContent);
    } else if (page === 'commands.html') {
      document.title = t(lang, 'commandsTitle', document.title);
      const h1 = document.querySelector('.cmd-hero .page-title');
      if (h1) h1.textContent = t(lang, 'commandsHeroTitle', h1.textContent);
      const desc = document.querySelector('.cmd-hero p');
      if (desc) desc.textContent = t(lang, 'commandsHeroDesc', desc.textContent);
      const searchInput = document.getElementById('searchInput');
      if (searchInput) searchInput.placeholder = t(lang, 'commandsSearch', searchInput.placeholder);
      const badge = document.getElementById('totalBadge');
      if (badge && badge.parentElement) {
        const value = badge.textContent.trim();
        badge.parentElement.innerHTML = `<i class="fas fa-bolt"></i> <span id="totalBadge">${value}</span> ${t(lang, 'commandsSearchCount')}`;
      }
    } else if (page === 'steps.html') {
      document.title = t(lang, 'stepsTitle', document.title);
      const h1 = document.querySelector('.steps-hero h1');
      if (h1) h1.innerHTML = lang === 'en' ? 'Execution <span>Steps</span>' : 'خطوات <span>التنفيذ</span>';
      const p = document.querySelector('.steps-hero p');
      if (p) p.textContent = t(lang, 'stepsHeroDesc', p.textContent);

      const countBadge = document.querySelector('.steps-hero .search-count-badge');
      const countEl = document.getElementById('scenarios-count');
      if (countBadge && countEl) {
        countBadge.innerHTML = `<i class="fas fa-list-ol"></i> <span id="scenarios-count">${countEl.textContent.trim()}</span> ${t(lang, 'stepsCountLabel')}`;
      }

      document.querySelector('.scenario-filter-btn[data-diff="all"]')?.replaceChildren(document.createTextNode(`🌐 ${t(lang, 'stepsDifficultyAll')}`));
      document.querySelector('.scenario-filter-btn[data-diff="easy"]')?.replaceChildren(document.createTextNode(`🟢 ${t(lang, 'stepsDifficultyEasy')}`));
      document.querySelector('.scenario-filter-btn[data-diff="medium"]')?.replaceChildren(document.createTextNode(`🟡 ${t(lang, 'stepsDifficultyMedium')}`));
      document.querySelector('.scenario-filter-btn[data-diff="hard"]')?.replaceChildren(document.createTextNode(`🔴 ${t(lang, 'stepsDifficultyHard')}`));

      const typeButtons = [
        ['all', 'stepsDifficultyAll', '📋'],
        ['Recon', 'stepsTypeRecon', '🔍'],
        ['Web App', 'stepsTypeWeb', '🌐'],
        ['Network', 'stepsTypeNetwork', '📡'],
        ['Exploitation', 'stepsTypeExploit', '💥'],
        ['Forensics', 'stepsTypeForensics', '🔬'],
        ['Password', 'stepsTypePassword', '🔑'],
        ['Linux', 'stepsTypeLinux', '🐧'],
        ['CTF', 'stepsTypeCtf', '🏆'],
        ['Defense', 'stepsTypeDefense', '🛡️']
      ];

      typeButtons.forEach(([type, key, icon]) => {
        const btn = document.querySelector(`.type-filter-btn[onclick*="'${type}'"]`);
        if (btn) btn.replaceChildren(document.createTextNode(`${icon} ${t(lang, key)}`));
      });
    } else if (page === 'tools.html') {
      document.title = t(lang, 'toolsTitle', document.title);
      const h1 = document.querySelector('.tools-hero h1');
      if (h1) h1.innerHTML = lang === 'en' ? 'Tools <span>Directory</span>' : 'دليل <span>الأدوات</span>';
      const p = document.querySelector('.tools-hero p');
      if (p) p.textContent = t(lang, 'toolsHeroDesc', p.textContent);
      const input = document.getElementById('toolSearch');
      if (input) input.placeholder = t(lang, 'toolsSearch', input.placeholder);

      const toolsBadge = document.querySelector('.tools-hero .search-count-badge');
      const toolsCount = document.getElementById('tools-total-badge');
      if (toolsBadge && toolsCount) {
        toolsBadge.innerHTML = `<i class="fas fa-tools"></i> <span id="tools-total-badge">${toolsCount.textContent.trim()}</span> ${t(lang, 'toolsCountLabel')}`;
      }
    }

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

  /* ── 1. CSS for logo / transition / header polish ── */
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

    body { transition: opacity 0.18s ease !important; }
    body.page-leaving { opacity: 0 !important; }

    .nav-link.active, .nav-link:hover { transition: all 0.2s ease !important; }

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
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, #00ff41, #0cf, #00ff41);
      background-size: 200% 100%;
      animation: loaderBar 0.6s linear forwards;
      z-index: 999999;
      transform-origin: left;
    }

    @keyframes loaderBar {
      0% { transform: scaleX(0); opacity: 1; }
      80% { transform: scaleX(0.9); opacity: 1; }
      100% { transform: scaleX(1); opacity: 0; }
    }
  `;
  document.head.appendChild(css);

  function removeRegisterLinks() {
    const selectors = ['a[href="register.html"]', 'a[href*="register"]', '#navUserLink'];
    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        const li = el.closest('li');
        if (li) li.style.display = 'none';
        else el.style.display = 'none';
      });
    });
  }

  function fastNav() {
    const preloaded = new Set();

    function preloadPage(href) {
      if (!href || preloaded.has(href) || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
      preloaded.add(href);
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      document.head.appendChild(link);
    }

    document.addEventListener('click', function (e) {
      const a = e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || a.target === '_blank') return;
      if (href.endsWith('.html') || href === '/') {
        e.preventDefault();
        const loader = document.createElement('div');
        loader.id = 'page-loader';
        document.body.appendChild(loader);
        document.body.classList.add('page-leaving');
        setTimeout(() => {
          window.location.href = href;
        }, 170);
      }
    }, true);

    document.addEventListener('mouseover', function (e) {
      const a = e.target.closest('a');
      if (!a) return;
      const href = a.getAttribute('href');
      if (href && href.endsWith('.html')) preloadPage(href);
    });
  }

  function init() {
    removeRegisterLinks();
    fastNav();
    createLanguageToggle();

    document.addEventListener('kali:langChanged', (event) => {
      const lang = (event && event.detail && event.detail.lang) || getCurrentLang();
      applySharedTexts(lang);
      applyPageSpecificTexts(lang);
    });

    applyLanguage(getCurrentLang());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
