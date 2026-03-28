// ============================================================
// FREE OFFER BANNER - تنبيه أن الموقع مجاني لفترة محدودة
// يظهر بعد قبول إخلاء المسؤولية
// ============================================================

(function() {
  'use strict';

  const SESSION_KEY = 'kali_free_banner_closed';

  // لا تُظهره إذا أغلقه المستخدم في نفس الجلسة
  if (sessionStorage.getItem(SESSION_KEY)) return;

  const style = document.createElement('style');
  style.textContent = `
    /* ====== FREE OFFER FLOATING BANNER ====== */
    #kali-free-offer {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9998;
      max-width: 380px;
      width: calc(100% - 48px);
      border-radius: 18px;
      overflow: hidden;
      font-family: 'Cairo', sans-serif;
      animation: freeOfferSlideIn 0.6s cubic-bezier(0.16,1,0.3,1) 2s both;
      box-shadow: 0 10px 50px rgba(0,255,65,0.2), 0 0 0 1px rgba(0,255,65,0.15);
    }
    @keyframes freeOfferSlideIn {
      from { opacity: 0; transform: translateY(30px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes freeOfferSlideOut {
      from { opacity: 1; transform: translateY(0) scale(1); }
      to { opacity: 0; transform: translateY(30px) scale(0.9); }
    }

    #kali-free-offer .fo-glow {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(0,255,65,0.08), rgba(0,200,255,0.05), rgba(255,200,0,0.03));
      pointer-events: none;
    }

    #kali-free-offer .fo-border-anim {
      position: absolute;
      inset: -1px;
      border-radius: 18px;
      background: linear-gradient(90deg, #00ff41, #0cf, #ffcc00, #00ff41);
      background-size: 300% 100%;
      animation: freeBorderShift 4s linear infinite;
      z-index: -1;
    }
    @keyframes freeBorderShift {
      0% { background-position: 0% 0; }
      100% { background-position: 300% 0; }
    }

    #kali-free-offer .fo-inner {
      position: relative;
      background: linear-gradient(145deg, #0a1a2e, #041628, #020b14);
      border-radius: 17px;
      padding: 20px;
      margin: 1.5px;
    }

    #kali-free-offer .fo-close {
      position: absolute;
      top: 10px;
      left: 10px;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      border: 1px solid rgba(255,255,255,0.1);
      background: rgba(255,50,50,0.08);
      color: rgba(255,255,255,0.4);
      font-size: 0.72rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      z-index: 2;
    }
    #kali-free-offer .fo-close:hover {
      background: rgba(255,50,50,0.2);
      color: #ff6666;
      border-color: rgba(255,50,50,0.3);
    }

    #kali-free-offer .fo-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: linear-gradient(135deg, rgba(255,200,0,0.15), rgba(255,150,0,0.08));
      border: 1px solid rgba(255,200,0,0.3);
      border-radius: 20px;
      padding: 4px 14px;
      font-size: 0.72rem;
      font-weight: 700;
      color: #ffcc00;
      font-family: 'Share Tech Mono', monospace;
      letter-spacing: 1px;
      margin-bottom: 12px;
      animation: tagPulse 2s ease-in-out infinite;
    }
    @keyframes tagPulse {
      0%, 100% { box-shadow: 0 0 8px rgba(255,200,0,0.15); }
      50% { box-shadow: 0 0 18px rgba(255,200,0,0.3); }
    }

    #kali-free-offer .fo-title {
      font-size: 1.1rem;
      font-weight: 800;
      color: #fff;
      margin: 0 0 8px;
      line-height: 1.6;
    }
    #kali-free-offer .fo-title .fo-highlight {
      background: linear-gradient(135deg, #00ff41, #0cf);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    #kali-free-offer .fo-desc {
      font-size: 0.85rem;
      color: rgba(255,255,255,0.6);
      line-height: 1.7;
      margin: 0 0 16px;
    }

    #kali-free-offer .fo-features {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 16px;
    }
    #kali-free-offer .fo-feat {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: rgba(0,255,65,0.06);
      border: 1px solid rgba(0,255,65,0.15);
      border-radius: 20px;
      padding: 3px 10px;
      font-size: 0.7rem;
      color: rgba(0,255,65,0.8);
    }

    #kali-free-offer .fo-cta {
      display: block;
      width: 100%;
      padding: 12px;
      border: none;
      border-radius: 12px;
      background: linear-gradient(135deg, #00ff41, #00cc33);
      color: #000;
      font-family: 'Cairo', sans-serif;
      font-size: 0.95rem;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.3s;
      text-align: center;
      text-decoration: none;
    }
    #kali-free-offer .fo-cta:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0,255,65,0.35);
    }

    #kali-free-offer .fo-timer {
      text-align: center;
      margin-top: 10px;
      font-size: 0.72rem;
      color: rgba(255,200,0,0.7);
      font-family: 'Share Tech Mono', monospace;
    }

    @media (max-width: 480px) {
      #kali-free-offer {
        bottom: 12px;
        right: 12px;
        max-width: calc(100% - 24px);
        width: calc(100% - 24px);
      }
      #kali-free-offer .fo-inner {
        padding: 16px;
      }
    }
  `;
  document.head.appendChild(style);

  function showBanner() {
    const banner = document.createElement('div');
    banner.id = 'kali-free-offer';
    banner.innerHTML = `
      <div class="fo-border-anim"></div>
      <div class="fo-inner">
        <div class="fo-glow"></div>
        <button class="fo-close" onclick="closeFreeBanner()" title="إغلاق">&#10005;</button>

        <div class="fo-tag">&#9889; LIMITED FREE ACCESS</div>

        <h3 class="fo-title">
          المنصة <span class="fo-highlight">مجانية بالكامل</span> لفترة محدودة!
        </h3>

        <p class="fo-desc">
          استغل الفرصة الآن واستفد من جميع المحتويات والدروس والأدوات مجاناً قبل إطلاق الاشتراكات المدفوعة.
        </p>

        <div class="fo-features">
          <span class="fo-feat">&#10003; 500+ أمر</span>
          <span class="fo-feat">&#10003; 100 درس</span>
          <span class="fo-feat">&#10003; 100 أداة</span>
          <span class="fo-feat">&#10003; خطوات تنفيذ</span>
          <span class="fo-feat">&#10003; بدون تسجيل</span>
        </div>

        <a href="tutorials.html" class="fo-cta">
          &#128640; ابدأ التعلم مجاناً الآن
        </a>

        <div class="fo-timer" id="free-offer-timer"></div>
      </div>
    `;
    document.body.appendChild(banner);

    // عدّاد تنازلي وهمي ينتهي بنهاية الشهر الحالي
    function updateTimer() {
      const now = new Date();
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
      const diff = endOfMonth - now;
      if (diff <= 0) return;

      const days = Math.floor(diff / (1000*60*60*24));
      const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
      const mins = Math.floor((diff % (1000*60*60)) / (1000*60));

      const el = document.getElementById('free-offer-timer');
      if (el) {
        el.textContent = '\u23F3 ينتهي العرض خلال: ' + days + ' يوم ' + hours + ' ساعة ' + mins + ' دقيقة';
      }
    }
    updateTimer();
    setInterval(updateTimer, 60000);
  }

  window.closeFreeBanner = function() {
    const el = document.getElementById('kali-free-offer');
    if (el) {
      el.style.animation = 'freeOfferSlideOut 0.3s ease forwards';
      setTimeout(() => el.remove(), 300);
    }
    sessionStorage.setItem(SESSION_KEY, '1');
  };

  // تأخير الظهور حتى يقبل المستخدم إخلاء المسؤولية
  function waitAndShow() {
    const check = setInterval(() => {
      if (!document.getElementById('kali-disc-overlay')) {
        clearInterval(check);
        setTimeout(showBanner, 1500);
      }
    }, 500);
    // fallback: show after 30s regardless
    setTimeout(() => {
      clearInterval(check);
      if (!document.getElementById('kali-free-offer')) {
        showBanner();
      }
    }, 30000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitAndShow);
  } else {
    waitAndShow();
  }
})();
