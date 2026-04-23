// ===== KALI LINUX LEARNING PLATFORM - MAIN JS =====
// Refactored with clean code practices

(function() {
  'use strict';

  // ===== CONFIG =====
  var LANG_STORAGE_KEY = 'kali_lang';
  var currentLang = 'ar';

  var I18N_STRINGS = {
    ar: {
      navHome: 'الرئيسية',
      navCommands: 'الأوامر',
      navTutorials: 'الدروس',
      navSteps: 'السيناريوهات التطبيقية',
      navTools: 'الأدوات',
      navArticles: 'المقالات',
      languageBtn: 'EN',
      shareSite: 'مشاركة الموقع',
      shareSuccess: '✅ تمت مشاركة الرابط بنجاح',
      shareFallback: '✅ تم نسخ الرابط للحافظة',
      copyCommandSuccess: '✅ تم نسخ الأمر!',
      systemOnline: 'SYSTEM ONLINE'
    },
    en: {
      navHome: 'Home',
      navCommands: 'Commands',
      navTutorials: 'Tutorials',
      navSteps: 'Applied Scenarios',
      navTools: 'Tools',
      navArticles: 'Articles',
      languageBtn: 'AR',
      shareSite: 'Share Site',
      shareSuccess: '✅ Link shared successfully',
      shareFallback: '✅ Link copied to clipboard',
      copyCommandSuccess: '✅ Command copied!',
      systemOnline: 'SYSTEM ONLINE'
    }
  };

  // ===== I18N =====
  function t(key, fallback) {
    fallback = fallback || '';
    return (I18N_STRINGS[currentLang] && I18N_STRINGS[currentLang][key]) || fallback;
  }

  function applyI18n(lang) {
    currentLang = lang === 'ar' ? 'ar' : 'en';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.body.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    document.body.classList.toggle('lang-en', currentLang === 'en');

    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var key = el.getAttribute('data-i18n');
      if (key) el.textContent = t(key, el.textContent);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (key) el.setAttribute('placeholder', t(key, el.getAttribute('placeholder') || ''));
    });

    document.querySelectorAll('[data-i18n-title]').forEach(function(el) {
      var key = el.getAttribute('data-i18n-title');
      if (key) el.setAttribute('title', t(key, el.getAttribute('title') || ''));
    });

    localStorage.setItem(LANG_STORAGE_KEY, currentLang);
    document.dispatchEvent(new CustomEvent('kali:langChanged', { detail: { lang: currentLang } }));
  }

  // ===== CLIPPBOARD =====
  var NotificationManager = (function() {
    var notif = null;

    function show(message, type, duration) {
      type = type || 'success';
      duration = duration || 2500;

      if (!notif) {
        notif = document.createElement('div');
        notif.className = 'notification';
        document.body.appendChild(notif);
      }
      notif.textContent = message;
      notif.classList.add('show');
      setTimeout(function() { notif.classList.remove('show'); }, duration);
    }

    function copyWithNotification(text, message) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function() {
          show(message || t('copyCommandSuccess', '✅ تم نسخ الأمر!'));
        }).catch(function() {
          fallbackCopy(text, message);
        });
      } else {
        fallbackCopy(text, message);
      }
    }

    function fallbackCopy(text, message) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        show(message || t('copyCommandSuccess', '✅ تم نسخ الأمر!'));
      } catch (e) {
        show('❌ فشل النسخ', 'error');
      }
      document.body.removeChild(ta);
    }

    return { show: show, copyWithNotification: copyWithNotification };
  })();

  window.copyToClipboard = NotificationManager.copyWithNotification;

  // ===== SHARE =====
  function doShare(data) {
    return navigator.share ? navigator.share(data).then(function() {
      NotificationManager.show(t('shareSuccess', '✅ تمت المشاركة بنجاح'));
      return true;
    }).catch(function(e) {
      if (e.name === 'AbortError') return false;
      return fallbackShare(data.url);
    }) : fallbackShare(data.url);
  }

  function fallbackShare(url) {
    return navigator.clipboard.writeText(url).then(function() {
      NotificationManager.show(t('shareFallback', '✅ تم نسخ الرابط للمشاركة'));
      return true;
    }).catch(function() {
      var ta = document.createElement('textarea');
      ta.value = url;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      NotificationManager.show(t('shareFallback', '✅ تم نسخ الرابط للمشاركة'));
      return true;
    });
  }

  function getPageName() {
    var path = window.location.pathname;
    var page = path.split('/').pop() || 'index.html';
    var pageNames = {
      'index.html': 'مشاركة الموقع',
      'commands.html': 'مشاركة الأوامر',
      'tutorials.html': 'مشاركة الدروس',
      'steps.html': 'مشاركة السيناريوهات التطبيقية',
      'tools.html': 'مشاركة الأدوات',
      'articles.html': 'مشاركة المقالات',
      'terminal.html': 'مشاركة الطرفية',
      'register.html': 'مشاركة التسجيل'
    };
    return pageNames[page] || 'مشاركة';
  }

  function getShareText() {
    var pageName = getPageName();
    return 'شاهد ' + pageName.replace('مشاركة ', '') + ' في Kali Academy';
  }

  function setupShareButtons() {
    // Update share button text dynamically
    document.querySelectorAll('[data-share-button]').forEach(function(btn) {
      var pageName = getPageName();
      // Check if there's a span inside
      var span = btn.querySelector('span');
      if (span) {
        span.textContent = pageName;
      } else {
        // Create span with page name if no span exists
        var textSpan = document.createElement('span');
        textSpan.textContent = pageName;
        btn.appendChild(textSpan);
      }
    });

    document.addEventListener('click', function(e) {
      var btn = e.target.closest('[data-share-button]');
      if (!btn) return;
      e.preventDefault();
      var pageName = getPageName();
      var title = pageName + ' - Kali Academy';
      var text = getShareText();
      var url = window.location.href;
      doShare({ title: title, text: text, url: url });
    });
  }

  window.kaliShare = doShare;

  // ===== NAV =====
  function setActiveNav() {
    var path = window.location.pathname;
    var currentPage = path.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(function(link) {
      var href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // ===== HAMBURGER =====
  function setupHamburger() {
    var hamburger = document.querySelector('.hamburger');
    var mobileMenu = document.querySelector('.mobile-menu');
    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', function() {
        mobileMenu.classList.toggle('open');
        var spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = mobileMenu.classList.contains('open') ? 'rotate(45deg) translate(5px, 5px)' : '';
        spans[1].style.opacity = mobileMenu.classList.contains('open') ? '0' : '1';
        spans[2].style.transform = mobileMenu.classList.contains('open') ? 'rotate(-45deg) translate(5px, -5px)' : '';
      });
    }
  }

  // ===== SCROLL EFFECTS =====
  function setupScrollEffects() {
    var header = document.querySelector('.site-header');
    if (header) {
      window.addEventListener('scroll', function() {
        header.style.background = window.scrollY > 50 ? 'rgba(2, 11, 20, 0.98)' : 'rgba(2, 11, 20, 0.95)';
      });
    }
  }

  // ===== INTERSECTION OBSERVER =====
  function setupIntersectionObserver() {
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.feature-card, .tutorial-card').forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
      });
    }
  }

  // ===== SMOOTH SCROLL =====
  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(a) {
      a.addEventListener('click', function(e) {
        e.preventDefault();
        var target = document.querySelector(a.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  // ===== INIT =====
  document.addEventListener('DOMContentLoaded', function() {
    applyI18n(currentLang);
    setActiveNav();
    setupHamburger();
    setupScrollEffects();
    setupIntersectionObserver();
    setupSmoothScroll();
    setupShareButtons();

    document.body.style.opacity = '1';
    document.body.classList.remove('page-leaving', 'page-entering');
  });

  // Expose utilities
  window.kaliGetCurrentLang = function() { return currentLang; };
  window.kaliT = t;

})();