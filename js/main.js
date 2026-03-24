// ===== KALI LINUX LEARNING PLATFORM - MAIN JS =====

const LANG_STORAGE_KEY = 'kali_lang';
let currentLang = localStorage.getItem(LANG_STORAGE_KEY) || document.documentElement.lang || 'en';

const I18N_STRINGS = {
  ar: {
    navHome: 'الرئيسية',
    navCommands: 'الأوامر',
    navTutorials: 'الدروس',
    navSteps: 'خطوات التنفيذ',
    navTools: 'الأدوات',
    languageBtn: 'EN',
    shareSite: 'مشاركة الموقع',
    shareSuccess: '✅ تمت مشاركة الرابط بنجاح',
    shareFallback: '✅ تم نسخ الرابط للحافظة',
    copyCommandSuccess: '✅ تم نسخ الأمر!',
    systemOnline: 'SYSTEM ONLINE',
    tutorialCountLabel: 'درس تعليمي',
    tutorialDesc: 'دروس شاملة خطوة بخطوة لتعلم أدوات Kali Linux والأمن السيبراني — من المبتدئ حتى الاحتراف',
    tutorialSearch: 'ابحث في الدروس...',
    tabAll: 'الكل',
    tabBeginner: 'مبتدئ',
    tabIntermediate: 'متوسط',
    tabAdvanced: 'متقدم',
    tabScanning: 'المسح',
    tabExploitation: 'الاستغلال',
    tabWireless: 'WiFi',
    tabWeb: 'ويب',
    tabForensics: 'جنائي',
    tabPrivEsc: 'صلاحيات',
    noLessons: 'لا توجد دروس مطابقة',
    tryDifferentSearch: 'جرّب كلمات بحث مختلفة أو غيّر الفلتر'
  },
  en: {
    navHome: 'Home',
    navCommands: 'Commands',
    navTutorials: 'Tutorials',
    navSteps: 'Execution Steps',
    navTools: 'Tools',
    languageBtn: 'AR',
    shareSite: 'Share Site',
    shareSuccess: '✅ Link shared successfully',
    shareFallback: '✅ Link copied to clipboard',
    copyCommandSuccess: '✅ Command copied!',
    systemOnline: 'SYSTEM ONLINE',
    tutorialCountLabel: 'Tutorials',
    tutorialDesc: 'Comprehensive step-by-step tutorials for Kali Linux and cybersecurity tools from beginner to advanced.',
    tutorialSearch: 'Search tutorials...',
    tabAll: 'All',
    tabBeginner: 'Beginner',
    tabIntermediate: 'Intermediate',
    tabAdvanced: 'Advanced',
    tabScanning: 'Scanning',
    tabExploitation: 'Exploitation',
    tabWireless: 'Wireless',
    tabWeb: 'Web',
    tabForensics: 'Forensics',
    tabPrivEsc: 'Privilege Escalation',
    noLessons: 'No matching lessons',
    tryDifferentSearch: 'Try a different keyword or filter'
  }
};

function t(key, fallback = '') {
  return (I18N_STRINGS[currentLang] && I18N_STRINGS[currentLang][key]) || fallback || key;
}

function applyI18n(lang) {
  currentLang = lang === 'ar' ? 'ar' : 'en';
  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  document.body.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
  document.body.classList.toggle('lang-en', currentLang === 'en');

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;
    const text = t(key, el.textContent);
    el.textContent = text;
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (!key) return;
    el.setAttribute('placeholder', t(key, el.getAttribute('placeholder') || ''));
  });

  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (!key) return;
    el.setAttribute('title', t(key, el.getAttribute('title') || ''));
  });

  const langBtn = document.getElementById('langToggleBtn');
  if (langBtn) langBtn.textContent = t('languageBtn', 'EN');

  localStorage.setItem(LANG_STORAGE_KEY, currentLang);
  document.dispatchEvent(new CustomEvent('kali:langChanged', { detail: { lang: currentLang } }));
}

function toggleLanguage() {
  applyI18n(currentLang === 'ar' ? 'en' : 'ar');
}

function createLanguageToggle() {
  const header = document.querySelector('.site-header');
  if (!header || document.getElementById('langToggleBtn')) return;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.id = 'langToggleBtn';
  btn.className = 'lang-toggle-btn';
  btn.setAttribute('aria-label', 'Language Toggle');
  btn.textContent = t('languageBtn', 'EN');
  btn.addEventListener('click', toggleLanguage);

  const status = header.querySelector('.header-status');
  if (status) status.insertAdjacentElement('afterend', btn);
  else header.appendChild(btn);
}

window.kaliGetCurrentLang = function () {
  return currentLang;
};

window.kaliT = function (key, fallback = '') {
  return t(key, fallback);
};

window.kaliShare = async function ({ title = 'Kali Academy', text = 'Kali Academy', url = window.location.href } = {}) {
  try {
    if (navigator.share) {
      await navigator.share({ title, text, url });
      showNotification(t('shareSuccess', '✅ تمت مشاركة الرابط بنجاح'));
      return true;
    }
    await navigator.clipboard.writeText(url);
    showNotification(t('shareFallback', '✅ تم نسخ الرابط للحافظة'));
    return true;
  } catch {
    return false;
  }
};

// ===== HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = mobileMenu.classList.contains('open') ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity = mobileMenu.classList.contains('open') ? '0' : '1';
    spans[2].style.transform = mobileMenu.classList.contains('open') ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });
}

// ===== ACTIVE NAV LINK =====
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
setActiveNav();

// ===== COPY TO CLIPBOARD =====
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showNotification(t('copyCommandSuccess', '✅ تم نسخ الأمر!'));
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showNotification(t('copyCommandSuccess', '✅ تم نسخ الأمر!'));
  });
}

// ===== NOTIFICATION =====
function showNotification(message, type = 'success') {
  let notif = document.querySelector('.notification');
  if (!notif) {
    notif = document.createElement('div');
    notif.className = 'notification';
    document.body.appendChild(notif);
  }
  notif.textContent = message;
  notif.classList.add('show');
  setTimeout(() => notif.classList.remove('show'), 2500);
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      const locale = currentLang === 'ar' ? 'ar-EG' : 'en-US';
      el.textContent = Math.floor(current).toLocaleString(locale) + suffix;
    }, 16);
  });
}

// ===== INTERSECTION OBSERVER =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      entry.target.classList.add('visible');
      if (entry.target.hasAttribute('data-count')) {
        animateCounters();
      }
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.stat-card, .feature-card, .tutorial-card').forEach(el => {
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});

// ===== HEADER SCROLL EFFECT =====
window.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header');
  if (!header) return;
  if (window.scrollY > 50) {
    header.style.background = 'rgba(2, 11, 20, 0.98)';
  } else {
    header.style.background = 'rgba(2, 11, 20, 0.95)';
  }
});

// ===== TYPING EFFECT =====
function typeText(element, text, speed = 50) {
  if (!element) return;
  let i = 0;
  element.textContent = '';
  const timer = setInterval(() => {
    if (i < text.length) {
      element.textContent += text[i];
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
  createLanguageToggle();
  applyI18n(currentLang);

  // Start counter animation if stats are in view
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
        statsObserver.disconnect();
      }
    });
    statsObserver.observe(statsSection);
  }

  // Add fade-in animation to cards
  document.querySelectorAll('.feature-card, .category-card').forEach((card, i) => {
    card.style.animationDelay = `${i * 0.1}s`;
    card.classList.add('fade-in-up');
  });
});