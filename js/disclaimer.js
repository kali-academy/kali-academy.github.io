/* =====================================================
   KaliAcademy - Disclaimer Popup
   يظهر عند كل دخول للموقع (إجباري)
   ===================================================== */
(function () {
  'use strict';

  const STORAGE_KEY = 'kali_disc_accepted';

  /* -------- Styles -------- */
  const style = document.createElement('style');
  style.textContent = `
    #kali-disc-overlay {
      position: fixed; inset: 0; z-index: 99999;
      background: rgba(0,0,0,.92);
      display: flex; align-items: center; justify-content: center;
      padding: 1rem; font-family: 'Cairo', 'Segoe UI', sans-serif;
      backdrop-filter: blur(6px);
      animation: disc-fadein .4s ease;
    }
    @keyframes disc-fadein { from{opacity:0} to{opacity:1} }
    #kali-disc-box {
      background: linear-gradient(145deg,#0d0d0d,#111);
      border: 1px solid rgba(255,50,50,.35);
      border-radius: 20px; max-width: 660px; width: 100%;
      max-height: 92vh; overflow-y: auto;
      box-shadow: 0 0 60px rgba(255,50,50,.15), 0 0 120px rgba(0,0,0,.8);
      animation: disc-slidein .45s cubic-bezier(.22,.68,0,1.2);
      position: relative;
    }
    #kali-disc-box::-webkit-scrollbar{width:4px}
    #kali-disc-box::-webkit-scrollbar-thumb{background:rgba(255,80,80,.3);border-radius:2px}
    @keyframes disc-slidein { from{transform:translateY(40px) scale(.95);opacity:0} to{transform:none;opacity:1} }

    /* TOP BAR */
    #kali-disc-topbar {
      background: linear-gradient(90deg,rgba(255,50,50,.15),rgba(255,140,0,.1),rgba(255,50,50,.15));
      border-bottom: 1px solid rgba(255,50,50,.2);
      padding: .6rem 1.4rem; font-size: .72rem;
      color: rgba(255,80,80,.8); font-family: 'Share Tech Mono',monospace;
      letter-spacing: .08em; border-radius: 20px 20px 0 0;
      display: flex; align-items: center; gap: 8px;
    }
    #kali-disc-topbar::before { content:'⬤'; color:#ff4d4d; font-size:.6rem; animation:blink 1s infinite; }
    @keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}

    /* BODY */
    #kali-disc-body { padding: 2rem 2rem 1.5rem; }
    #kali-disc-icon { text-align:center; margin-bottom:1.2rem; }
    #kali-disc-icon span { font-size:4.5rem; display:block; animation:pulse-disc 2s infinite; }
    @keyframes pulse-disc{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
    #kali-disc-title {
      text-align: center; font-family: 'Orbitron','Cairo',sans-serif;
      font-size: clamp(1.1rem,3vw,1.5rem); font-weight: 900;
      color: #ff4d4d; margin-bottom: .5rem; letter-spacing: .03em;
    }
    #kali-disc-subtitle {
      text-align:center; color:rgba(255,255,255,.5); font-size:.82rem; margin-bottom:1.5rem;
    }

    /* SECTIONS */
    .disc-section {
      background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.07);
      border-radius: 12px; padding: 1rem 1.2rem; margin-bottom: 1rem;
    }
    .disc-section.red { border-color:rgba(255,50,50,.25); background:rgba(255,50,50,.04); }
    .disc-section.green { border-color:rgba(0,255,65,.2); background:rgba(0,255,65,.03); }
    .disc-section h3 {
      font-family:'Orbitron','Cairo',sans-serif; font-size:.82rem;
      font-weight:700; margin:0 0 .7rem; display:flex; align-items:center; gap:8px;
    }
    .disc-section h3.red-h{ color:#ff4d4d; }
    .disc-section h3.grn-h{ color:#00ff41; }
    .disc-section h3.org-h{ color:#ff8c00; }
    .disc-section ul { list-style:none; padding:0; margin:0; }
    .disc-section ul li {
      font-size:.83rem; color:rgba(255,255,255,.65); padding:5px 0;
      display:flex; align-items:flex-start; gap:8px; line-height:1.6;
      border-bottom:1px solid rgba(255,255,255,.04);
    }
    .disc-section ul li:last-child{border:none}
    .disc-section ul li .ic-ok  { color:#00ff41; flex-shrink:0; margin-top:2px; }
    .disc-section ul li .ic-bad { color:#ff4d4d; flex-shrink:0; margin-top:2px; }
    .disc-section ul li .ic-wrn { color:#ff8c00; flex-shrink:0; margin-top:2px; }

    /* LAW TAGS */
    .disc-laws { display:flex; flex-wrap:wrap; gap:6px; margin-top:.5rem; }
    .disc-law-tag {
      background:rgba(0,255,65,.07); border:1px solid rgba(0,255,65,.15);
      border-radius:20px; padding:4px 12px; font-size:.72rem; color:rgba(255,255,255,.65);
    }

    /* CHECKBOX */
    #disc-check-row {
      display:flex; align-items:flex-start; gap:10px; margin:1.2rem 0 .8rem;
      cursor:pointer; user-select:none;
    }
    #disc-check-row input[type=checkbox] { width:18px; height:18px; margin-top:2px; accent-color:#00ff41; cursor:pointer; flex-shrink:0; }
    #disc-check-label { font-size:.83rem; color:rgba(255,255,255,.7); line-height:1.6; }
    #disc-check-label strong { color:#00ff41; }

    /* BUTTONS */
    #kali-disc-btns { display:flex; gap:10px; margin-top:1rem; }
    #disc-accept-btn {
      flex:1; padding:13px; border:none; border-radius:12px;
      background:linear-gradient(135deg,#00ff41,#00cc33);
      color:#000; font-family:'Cairo',sans-serif; font-weight:800; font-size:.95rem;
      cursor:pointer; transition:all .3s; opacity:.4; pointer-events:none;
    }
    #disc-accept-btn.ready { opacity:1; pointer-events:all; }
    #disc-accept-btn.ready:hover { transform:translateY(-2px); box-shadow:0 8px 25px rgba(0,255,65,.35); }
    #disc-decline-btn {
      padding:13px 20px; border:1px solid rgba(255,255,255,.15); border-radius:12px;
      background:transparent; color:rgba(255,255,255,.5);
      font-family:'Cairo',sans-serif; font-size:.88rem; cursor:pointer; transition:all .3s;
    }
    #disc-decline-btn:hover { background:rgba(255,50,50,.1); border-color:rgba(255,50,50,.4); color:#ff6b6b; }

    /* FOOTER NOTE */
    #disc-footer-note {
      text-align:center; font-size:.72rem; color:rgba(255,255,255,.3);
      margin-top:1rem; line-height:1.6;
    }
    #disc-footer-note a { color:rgba(0,255,65,.6); text-decoration:none; }
    #disc-footer-note a:hover { color:#00ff41; text-decoration:underline; }

    /* Counter */
    #disc-timer {
      display:inline-block; background:rgba(255,50,50,.12);
      border:1px solid rgba(255,50,50,.2); border-radius:8px;
      padding:2px 10px; font-family:'Share Tech Mono',monospace;
      font-size:.72rem; color:#ff8080; margin-bottom:.3rem;
    }
  `;
  document.head.appendChild(style);

  /* -------- HTML -------- */
  const overlay = document.createElement('div');
  overlay.id = 'kali-disc-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'kali-disc-title');
  overlay.innerHTML = `
    <div id="kali-disc-box">
      <div id="kali-disc-topbar">⚠ DISCLAIMER — يجب القراءة والموافقة قبل الدخول</div>
      <div id="kali-disc-body">

        <div id="kali-disc-icon"><span>⚠️</span></div>
        <div id="kali-disc-title">إخلاء المسؤولية القانوني</div>
        <div id="kali-disc-subtitle">KaliAcademy — منصة تعليمية للأمن السيبراني</div>

        <!-- ALLOWED -->
        <div class="disc-section green">
          <h3 class="grn-h">✅ الاستخدام المسموح به</h3>
          <ul>
            <li><span class="ic-ok">✓</span><span>التعلم الأكاديمي واكتساب مهارات الأمن السيبراني</span></li>
            <li><span class="ic-ok">✓</span><span>اختبار الاختراق في بيئات معزولة ومختبرات افتراضية</span></li>
            <li><span class="ic-ok">✓</span><span>اختبار أنظمتك الخاصة أو بإذن كتابي صريح</span></li>
            <li><span class="ic-ok">✓</span><span>التحضير لشهادات CEH وOSCP وCompTIA Security+</span></li>
          </ul>
        </div>

        <!-- FORBIDDEN -->
        <div class="disc-section red">
          <h3 class="red-h">🚫 ما هو محظور تماماً</h3>
          <ul>
            <li><span class="ic-bad">✗</span><span>اختراق أي نظام أو شبكة دون إذن مسبق</span></li>
            <li><span class="ic-bad">✗</span><span>التجسس على الاتصالات أو سرقة البيانات</span></li>
            <li><span class="ic-bad">✗</span><span>إنشاء أو توزيع برمجيات خبيثة بنية إجرامية</span></li>
            <li><span class="ic-bad">✗</span><span>تعطيل الخدمات الإلكترونية (DDoS) أو الابتزاز</span></li>
          </ul>
        </div>

        <!-- LAWS -->
        <div class="disc-section">
          <h3 class="org-h">⚖️ قوانين سارية على المخالفين</h3>
          <div class="disc-laws">
            <span class="disc-law-tag">🇸🇦 نظام الجرائم المعلوماتية 1428هـ</span>
            <span class="disc-law-tag">🇦🇪 المرسوم 34 لسنة 2021</span>
            <span class="disc-law-tag">🇪🇬 قانون 175 لسنة 2018</span>
            <span class="disc-law-tag">🇺🇸 CFAA 18 U.S.C §1030</span>
            <span class="disc-law-tag">🇬🇧 Computer Misuse Act 1990</span>
          </div>
          <p style="font-size:.78rem;color:rgba(255,140,0,.8);margin-top:.8rem;line-height:1.6;">
            ⚠ العقوبات تشمل: السجن حتى 10 سنوات، الغرامات المالية الضخمة، الحظر المهني الدائم.
          </p>
        </div>

        <!-- CHECKBOX -->
        <label id="disc-check-row">
          <input type="checkbox" id="disc-checkbox" onchange="discCheckChange()">
          <span id="disc-check-label">أقر بأنني قرأت وفهمت هذا الإخلاء كاملاً، وأتعهد <strong>باستخدام المنصة لأغراض تعليمية مشروعة فقط</strong>، وأتحمل المسؤولية الكاملة عن أي استخدام مخالف للقانون.</span>
        </label>

        <!-- BUTTONS -->
        <div id="kali-disc-btns">
          <button id="disc-accept-btn" onclick="discAccept()" disabled>
            ✅ أوافق وأدخل المنصة
          </button>
          <button id="disc-decline-btn" onclick="discDecline()">
            ❌ لا أوافق
          </button>
        </div>

        <div id="disc-footer-note">
          يمكنك قراءة الإخلاء الكامل في صفحة
          <a href="disclaimer.html" target="_blank">إخلاء المسؤولية</a>
          &nbsp;|&nbsp; © 2026 KaliAcademy — للأغراض التعليمية فقط
        </div>

      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  /* -------- Functions -------- */
  window.discCheckChange = function () {
    const cb = document.getElementById('disc-checkbox');
    const btn = document.getElementById('disc-accept-btn');
    if (cb.checked) {
      btn.disabled = false;
      btn.classList.add('ready');
    } else {
      btn.disabled = true;
      btn.classList.remove('ready');
    }
  };

  window.discAccept = function () {
    const cb = document.getElementById('disc-checkbox');
    if (!cb.checked) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ts: Date.now(), accepted: true }));
    } catch (e) { /* ignore */ }
    const overlay = document.getElementById('kali-disc-overlay');
    overlay.style.animation = 'disc-fadein .3s ease reverse forwards';
    setTimeout(() => {
      overlay.remove();
      document.body.style.overflow = '';
    }, 280);
  };

  window.discDecline = function () {
    // Redirect away
    try {
      window.location.replace('https://google.com');
    } catch {
      window.close();
    }
  };

})();
