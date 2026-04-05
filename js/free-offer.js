// ============================================================
// FREE NOTICE BAR - شريط تحفيزي أسفل شريط التنقل
// ============================================================

(function () {
  'use strict';

  const STORAGE_KEY = 'kali_free_notice_hidden_v2';
  if (localStorage.getItem(STORAGE_KEY) === '1') return;

  function getDaysLeftInMonth() {
    const now = new Date();
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const diff = Math.max(0, lastDay - now);
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  function closeBanner() {
    const bar = document.getElementById('kali-free-notice');
    if (!bar) return;
    bar.classList.add('is-hidden');
    setTimeout(() => bar.remove(), 260);
    localStorage.setItem(STORAGE_KEY, '1');
  }

  function createBanner() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const daysLeft = getDaysLeftInMonth();

    const bar = document.createElement('div');
    bar.id = 'kali-free-notice';
    bar.className = 'site-free-banner';
    bar.setAttribute('role', 'status');
    bar.innerHTML = `
      <div class="site-free-banner-inner">
        <span class="site-free-pill"><span class="dot"></span>FREE MODE</span>
        <p class="site-free-text">
          🚀 ابدأ اليوم — المنصة <strong>مجانية بالكامل الآن</strong>. تعلّم بسرعة وطبّق عملياً
          <span class="site-free-urgency">قبل التحويل إلى نظام مدفوع خلال ${daysLeft} يوم</span>.
        </p>
        <a class="site-free-cta" href="tutorials.html">ابدأ التعلم الآن</a>
        <button type="button" class="site-free-close" aria-label="إغلاق التنبيه">✕</button>
      </div>
    `;

    header.insertAdjacentElement('afterend', bar);
    const closeBtn = bar.querySelector('.site-free-close');
    if (closeBtn) closeBtn.addEventListener('click', closeBanner);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createBanner, { once: true });
  } else {
    createBanner();
  }
})();
