// ===== KALI LINUX LEARNING PLATFORM - MAIN JS =====

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
    showNotification('✅ تم نسخ الأمر!');
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showNotification('✅ تم نسخ الأمر!');
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

// ===== SHARE =====
async function kaliShare({ title, text, url }) {
  const shareData = {
    title: title || document.title,
    text: text || 'تعرف على Kali Academy لتعلم الأمن السيبراني',
    url: url || window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      showNotification('✅ تمت المشاركة بنجاح');
      return true;
    }
  } catch (err) {
    if (err && err.name === 'AbortError') {
      return false;
    }
  }

  try {
    await navigator.clipboard.writeText(shareData.url);
    showNotification('✅ تم نسخ الرابط للمشاركة');
    return true;
  } catch (_) {
    const ta = document.createElement('textarea');
    ta.value = shareData.url;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showNotification('✅ تم نسخ الرابط للمشاركة');
    return true;
  }
}

function bindShareButtons() {
  document.addEventListener('click', async (event) => {
    const btn = event.target.closest('[data-share-button]');
    if (!btn) return;

    event.preventDefault();

    const title = btn.getAttribute('data-share-title') || document.title;
    const text = btn.getAttribute('data-share-text') || 'تعرف على Kali Academy لتعلم الأمن السيبراني';
    const url = btn.getAttribute('data-share-url') || window.location.href;

    await kaliShare({ title, text, url });
  });
}

window.kaliShare = kaliShare;

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
      el.textContent = Math.floor(current).toLocaleString() + suffix;
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
  bindShareButtons();

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
