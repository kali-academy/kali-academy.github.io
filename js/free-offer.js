// ============================================================
// FREE OFFER BADGE - تنبيه أن الموقع مجاني لفترة محدودة
// شارة صغيرة أنيقة في الأسفل لا تزعج الزوار
// ============================================================

(function() {
  'use strict';

  const SESSION_KEY = 'kali_free_banner_closed';

  // لا تُظهره إذا أغلقه المستخدم في نفس الجلسة
  if (sessionStorage.getItem(SESSION_KEY)) return;

  const style = document.createElement('style');
  style.textContent = `
    /* ====== FREE OFFER FLOATING BADGE ====== */
    #kali-free-badge {
      position: fixed;
      bottom: 20px;
      left: 20px;
      z-index: 9500;
      max-width: 300px;
      background: linear-gradient(135deg, #020b14 0%, #0a1e36 100%);
      border: 1px solid rgba(0,255,65,0.3);
      border-radius: 16px;
      padding: 14px 16px;
      font-family: 'Cairo', sans-serif;
      box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(0,255,65,0.08);
      animation: freeBadgeIn 0.6s cubic-bezier(0.34,1.56,0.64,1);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }
    @keyframes freeBadgeIn {
      from { opacity: 0; transform: translateY(20px) scale(0.9); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes freeBadgeOut {
      from { opacity: 1; transform: translateY(0) scale(1); }
      to { opacity: 0; transform: translateY(20px) scale(0.85); }
    }

    /* خط متوهج علوي */
    #kali-free-badge::before {
      content: '';
      position: absolute;
      top: 0; left: 20px; right: 20px;
      height: 2px;
      border-radius: 2px;
      background: linear-gradient(90deg, transparent, #00ff41, #ffc800, #00ff41, transparent);
      animation: badgeGlow 3s linear infinite;
      background-size: 200% 100%;
    }
    @keyframes badgeGlow {
      0% { background-position: 0% 0; }
      100% { background-position: 200% 0; }
    }

    #kali-free-badge .fb-close {
      position: absolute;
      top: 6px;
      left: 8px;
      background: none;
      border: none;
      color: rgba(255,255,255,0.25);
      cursor: pointer;
      font-size: 0.7rem;
      padding: 3px 6px;
      border-radius: 4px;
      transition: all 0.2s;
      line-height: 1;
    }
    #kali-free-badge .fb-close:hover {
      color: rgba(255,255,255,0.7);
      background: rgba(255,50,50,0.15);
    }

    #kali-free-badge .fb-tag {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.6rem;
      color: rgba(0,255,65,0.7);
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    #kali-free-badge .fb-tag .fb-dot {
      width: 6px;
      height: 6px;
      background: #00ff41;
      border-radius: 50%;
      animation: fbDotPulse 2s ease-in-out infinite;
      box-shadow: 0 0 6px rgba(0,255,65,0.6);
    }
    @keyframes fbDotPulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }

    #kali-free-badge .fb-title {
      font-size: 0.88rem;
      font-weight: 800;
      color: #fff;
      line-height: 1.5;
      margin-bottom: 4px;
    }
    #kali-free-badge .fb-title .fb-green {
      color: #00ff41;
    }

    #kali-free-badge .fb-timer {
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.65rem;
      color: rgba(255,200,0,0.75);
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    #kali-free-badge .fb-cta {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      width: 100%;
      padding: 8px 14px;
      border-radius: 10px;
      background: linear-gradient(135deg, #00ff41, #00cc33);
      color: #000;
      font-size: 0.8rem;
      font-weight: 800;
      text-decoration: none;
      font-family: 'Cairo', sans-serif;
      transition: all 0.25s;
      border: none;
      cursor: pointer;
    }
    #kali-free-badge .fb-cta:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 18px rgba(0,255,65,0.4);
      background: linear-gradient(135deg, #33ff66, #00ff41);
    }

    @media (max-width: 480px) {
      #kali-free-badge {
        bottom: 12px;
        left: 12px;
        right: 12px;
        max-width: none;
      }
    }
  `;
  document.head.appendChild(style);

  function showBadge() {
    const badge = document.createElement('div');
    badge.id = 'kali-free-badge';
    badge.innerHTML = `
      <button class="fb-close" onclick="closeFreeBadge()" title="\u0625\u063a\u0644\u0627\u0642">&#10005;</button>
      <div class="fb-tag"><span class="fb-dot"></span> FREE ACCESS</div>
      <div class="fb-title">\u0627\u0644\u0645\u0646\u0635\u0629 <span class="fb-green">\u0645\u062c\u0627\u0646\u064a\u0629</span> \u0644\u0641\u062a\u0631\u0629 \u0645\u062d\u062f\u0648\u062f\u0629!</div>
      <div class="fb-timer" id="free-badge-timer"></div>
      <a href="tutorials.html" class="fb-cta"><i class="fas fa-rocket" style="font-size:0.75rem;"></i> \u0627\u0628\u062f\u0623 \u0627\u0644\u0622\u0646 \u0645\u062c\u0627\u0646\u0627\u064b</a>
    `;
    document.body.appendChild(badge);

    // عدّاد تنازلي
    function updateTimer() {
      var now = new Date();
      var endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
      var diff = endOfMonth - now;
      if (diff <= 0) return;

      var days = Math.floor(diff / (1000*60*60*24));
      var hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));

      var el = document.getElementById('free-badge-timer');
      if (el) {
        el.textContent = '\u23F3 \u064A\u0646\u062A\u0647\u064A \u062E\u0644\u0627\u0644 ' + days + ' \u064A\u0648\u0645 \u0648 ' + hours + ' \u0633\u0627\u0639\u0629';
      }
    }
    updateTimer();
    setInterval(updateTimer, 60000);
  }

  window.closeFreeBadge = function() {
    var el = document.getElementById('kali-free-badge');
    if (el) {
      el.style.animation = 'freeBadgeOut 0.3s ease forwards';
      setTimeout(function() { el.remove(); }, 300);
    }
    sessionStorage.setItem(SESSION_KEY, '1');
  };

  // تأخير الظهور حتى يقبل المستخدم إخلاء المسؤولية
  function waitAndShow() {
    var check = setInterval(function() {
      if (!document.getElementById('kali-disc-overlay')) {
        clearInterval(check);
        setTimeout(showBadge, 1500);
      }
    }, 500);
    // fallback بعد 30 ثانية
    setTimeout(function() {
      clearInterval(check);
      if (!document.getElementById('kali-free-badge')) {
        showBadge();
      }
    }, 30000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitAndShow);
  } else {
    waitAndShow();
  }
})();
