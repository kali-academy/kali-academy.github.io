// ============================================================
// SITE INIT - تحسينات الموقع الأساسية
// - تحسين الشعار
// - تنقل سريع بين الصفحات
// - إخفاء رابط التسجيل من القائمة
// - تثبيت اللغة العربية وإزالة أي تبديل لغة
// ============================================================

(function () {
  'use strict';

  // تثبيت اللغة العربية فقط
  function applyArabicOnly() {
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
    document.body.setAttribute('dir', 'rtl');
    document.body.classList.remove('lang-en');
    try {
      localStorage.setItem('kali_lang', 'ar');
    } catch (_) { /* ignore */ }
  }

  // توافق مع أي سكربتات تعتمد على هذه الدوال
  window.kaliGetCurrentLang = function () {
    return 'ar';
  };

  window.kaliSetLanguage = function () {
    applyArabicOnly();
  };

  // تحسينات CSS عامة
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

    .nav-link.active, .nav-link:hover {
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
      animation: loaderBar 0.6s linear forwards;
      z-index: 999999;
      transform-origin: left;
    }

    @keyframes loaderBar {
      0%   { transform: scaleX(0); opacity: 1; }
      80%  { transform: scaleX(0.9); opacity: 1; }
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
        setTimeout(() => { window.location.href = href; }, 170);
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
    applyArabicOnly();
    removeRegisterLinks();
    fastNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
