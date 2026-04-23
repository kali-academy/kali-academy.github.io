// ============================================================
// SOCIAL BAR - شريط التواصل الاجتماعي
// ============================================================

(function() {
  // إنشاء CSS
  const style = document.createElement('style');
  style.textContent = `
    /* ====== TOP SOCIAL BANNER ====== */
    #kali-social-banner {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 99999;
      background: linear-gradient(90deg, #020b14 0%, #041628 30%, #0a1e36 50%, #041628 70%, #020b14 100%);
      border-bottom: 1px solid rgba(0,255,65,0.25);
      padding: 0 1.5rem;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: 'Cairo', sans-serif;
      box-shadow: 0 2px 24px rgba(0,255,65,0.1);
      transition: transform 0.3s ease;
    }
    #kali-social-banner.hidden {
      transform: translateY(-100%);
    }

    /* شريط الألوان العلوي */
    #kali-social-banner::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, #1877f2, #e1306c, #fcaf45, #00ff41, transparent);
      animation: socialBannerLine 4s linear infinite;
      background-size: 200% 100%;
    }
    @keyframes socialBannerLine {
      0% { background-position: 0% 0; }
      100% { background-position: 200% 0; }
    }

    .social-banner-left {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.78rem;
      color: rgba(255,255,255,0.7);
      font-weight: 600;
    }
    .social-banner-left .pulse-dot {
      width: 7px;
      height: 7px;
      background: #00ff41;
      border-radius: 50%;
      animation: pulseDot 1.5s ease-in-out infinite;
      flex-shrink: 0;
      box-shadow: 0 0 6px rgba(0,255,65,0.6);
    }
    @keyframes pulseDot {
      0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 6px rgba(0,255,65,0.6); }
      50% { opacity: 0.5; transform: scale(0.7); box-shadow: 0 0 2px rgba(0,255,65,0.3); }
    }

    .social-banner-center {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .social-btn {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 6px 16px;
      border-radius: 22px;
      font-size: 0.78rem;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
      font-family: 'Cairo', sans-serif;
      letter-spacing: 0.3px;
      border: 1.5px solid transparent;
      white-space: nowrap;
      position: relative;
      overflow: hidden;
    }
    .social-btn::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      opacity: 0;
      transition: opacity 0.3s;
    }
    .social-btn:hover::after {
      opacity: 1;
    }

    .social-btn-fb {
      background: linear-gradient(135deg, rgba(24,119,242,0.2), rgba(24,119,242,0.1));
      border-color: rgba(24,119,242,0.45);
      color: #7ab8ff;
    }
    .social-btn-fb::after {
      background: linear-gradient(135deg, rgba(24,119,242,0.12), transparent);
    }
.social-btn-fb:hover {
      background: linear-gradient(135deg, #1877f2, #0d5dbf);
      border-color: #1877f2;
      color: #fff;
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 6px 20px rgba(24,119,242,0.4), 0 0 0 3px rgba(24,119,242,0.1);
    }

    .social-btn-ig {
      background: linear-gradient(135deg, rgba(225,48,108,0.15), rgba(252,175,69,0.1));
      border-color: rgba(225,48,108,0.4);
      color: #ff9ec7;
    }
    .social-btn-ig::after {
      background: linear-gradient(135deg, rgba(225,48,108,0.1), rgba(252,175,69,0.05));
    }
    .social-btn-ig:hover {
      background: linear-gradient(135deg, #e1306c, #f56040, #fcaf45);
      border-color: #e1306c;
      color: #fff;
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 6px 20px rgba(225,48,108,0.35), 0 0 0 3px rgba(225,48,108,0.1);
    }

    body.has-social-banner .site-header {
      top: 44px;
    }

    /* ====== FLOATING SIDE BUTTONS ====== */
    #kali-social-float {
      position: fixed;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      z-index: 9000;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .float-social-btn {
      display: flex;
      align-items: center;
      gap: 0;
      text-decoration: none;
      overflow: hidden;
      border-radius: 0 12px 12px 0;
      transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
      width: 46px;
      position: relative;
    }
    .float-social-btn:hover {
      width: 155px;
    }
    .float-social-btn::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1));
      opacity: 0;
      transition: opacity 0.3s;
    }
    .float-social-btn:hover::before {
      opacity: 1;
    }

    .float-icon {
      width: 46px;
      height: 46px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .float-icon svg {
      width: 22px;
      height: 22px;
      filter: drop-shadow(0 0 4px rgba(255,255,255,0.3));
    }

    .float-label {
      font-family: 'Cairo', sans-serif;
      font-size: 0.82rem;
      font-weight: 700;
      color: #fff;
      white-space: nowrap;
      opacity: 0;
      transform: translateX(-10px);
      transition: all 0.25s ease 0.05s;
      padding-left: 6px;
      text-shadow: 0 1px 3px rgba(0,0,0,0.3);
    }
    .float-social-btn:hover .float-label {
      opacity: 1;
      transform: translateX(0);
    }

    .float-fb {
      background: linear-gradient(135deg, #1877f2, #0d5dbf);
      box-shadow: 3px 0 18px rgba(24,119,242,0.45);
    }
    .float-fb:hover {
      box-shadow: 5px 0 25px rgba(24,119,242,0.6);
    }
    .float-ig {
      background: linear-gradient(135deg, #833ab4, #e1306c, #f56040, #fcaf45);
      box-shadow: 3px 0 18px rgba(225,48,108,0.45);
    }
    .float-ig:hover {
      box-shadow: 5px 0 25px rgba(225,48,108,0.6);
    }

    /* ====== RESPONSIVE ====== */
    @media (max-width: 640px) {
      .social-banner-left span {
        display: none;
      }
      .social-btn {
        padding: 5px 12px;
        font-size: 0.72rem;
      }
      .social-btn .follower-hint {
        display: none;
      }
      #kali-social-banner {
        height: 40px;
      }
      body.has-social-banner .site-header {
        top: 40px !important;
      }
    }
    @media (max-width: 400px) {
      .social-banner-center {
        gap: 8px;
      }
    }
  `;
  document.head.appendChild(style);

  // إنشاء الشريط العلوي
  const banner = document.createElement('div');
  banner.id = 'kali-social-banner';
  banner.innerHTML = `
    <div class="social-banner-left">
      <div class="pulse-dot"></div>
      <span>تابعنا على مواقع التواصل</span>
    </div>
    <div class="social-banner-center">
      <a href="https://www.facebook.com/share/1B9g74v2xQ/" target="_blank" rel="noopener" class="social-btn social-btn-fb" data-no-fast-nav="true">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
        <span>صفحتنا على فيسبوك</span>
        <span class="follower-hint">| تابعنا الآن</span>
      </a>
      <a href="https://www.instagram.com/kali_academy1?igsh=MTV5cnR6bHJ5bmpjdw==" target="_blank" rel="noopener" class="social-btn social-btn-ig" data-no-fast-nav="true">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
        <span>تابعنا على إنستغرام</span>
        <span class="follower-hint">| محتوى حصري</span>
      </a>
    </div>
    <div class="social-banner-right">
    </div>
  `;

  // إضافة الشريط في بداية الـ body
  document.body.insertBefore(banner, document.body.firstChild);
  
  // فقط أضف padding للمحتوى وليس للجسم
  document.body.classList.add('has-social-banner');

  // أزرار جانبية عائمة
  const floatBtns = document.createElement('div');
  floatBtns.id = 'kali-social-float';
  floatBtns.innerHTML = `
    <a href="https://www.facebook.com/share/1B9g74v2xQ/" target="_blank" rel="noopener" class="float-social-btn float-fb" title="فيسبوك" data-no-fast-nav="true">
      <div class="float-icon">
        <svg viewBox="0 0 24 24" fill="white">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </div>
      <span class="float-label">صفحتنا فيسبوك</span>
    </a>
    <a href="https://www.instagram.com/kali_academy1?igsh=MTV5cnR6bHJ5bmpjdw==" target="_blank" rel="noopener" class="float-social-btn float-ig" title="إنستغرام" data-no-fast-nav="true">
      <div class="float-icon">
        <svg viewBox="0 0 24 24" fill="white">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      </div>
      <span class="float-label">تابعنا إنستغرام</span>
    </a>
  `;
  document.body.appendChild(floatBtns);

  // وظيفة الإغلاق
  window.closeSocialBanner = function() {
    banner.classList.add('hidden');
    document.body.classList.remove('has-social-banner');
    // حفظ الإغلاق لهذه الجلسة فقط
    sessionStorage.setItem('socialBannerClosed', '1');
  };

  // إذا تم الإغلاق سابقاً في نفس الجلسة، لا تُظهره
  if (sessionStorage.getItem('socialBannerClosed')) {
    banner.style.display = 'none';
    document.body.classList.remove('has-social-banner');
  }

})();
