/* =====================================================
   KaliAcademy - Disclaimer Popup
   Show once at site entry per browser session
   ===================================================== */
(function () {
  'use strict';

  const STORAGE_KEY = 'kali_disc_accepted';
  const SESSION_KEY = 'kali_disc_seen_session';
  const SKIP_PAGES = new Set(['disclaimer.html', 'disclaimer-owner.html', 'legal.html']);

  const currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (SKIP_PAGES.has(currentPage)) return;

  function isAccepted() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return false;
      const parsed = JSON.parse(raw);
      return !!(parsed && parsed.accepted);
    } catch {
      return false;
    }
  }

  function markSessionSeen() {
    try { sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* ignore */ }
  }

  function shouldShowDisclaimer() {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === '1') return false;
    } catch { /* ignore */ }

    if (isAccepted()) {
      markSessionSeen();
      return false;
    }

    return true;
  }

  if (!shouldShowDisclaimer()) return;

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
      border-radius: 20px; max-width: 680px; width: 100%;
      max-height: 92vh; overflow-y: auto;
      box-shadow: 0 0 60px rgba(255,50,50,.15), 0 0 120px rgba(0,0,0,.8);
      animation: disc-slidein .45s cubic-bezier(.22,.68,0,1.2);
    }

    @keyframes disc-slidein {
      from { transform: translateY(40px) scale(.95); opacity: 0; }
      to { transform: none; opacity: 1; }
    }

    #kali-disc-topbar {
      background: linear-gradient(90deg,rgba(255,50,50,.15),rgba(255,140,0,.1),rgba(255,50,50,.15));
      border-bottom: 1px solid rgba(255,50,50,.2);
      padding: .6rem 1.4rem; font-size: .72rem;
      color: rgba(255,80,80,.8); font-family: 'Share Tech Mono', monospace;
      letter-spacing: .08em; border-radius: 20px 20px 0 0;
      display: flex; align-items: center; gap: 8px;
    }

    #kali-disc-body { padding: 2rem 2rem 1.5rem; }
    #kali-disc-icon { text-align: center; margin-bottom: 1.2rem; }
    #kali-disc-icon span { font-size: 4.2rem; display: block; }

    #kali-disc-title {
      text-align: center; font-family: 'Orbitron', sans-serif;
      font-size: clamp(1.1rem,3vw,1.5rem); font-weight: 900;
      color: #ff4d4d; margin-bottom: .5rem;
    }

    #kali-disc-subtitle {
      text-align: center; color: rgba(255,255,255,.6);
      font-size: .85rem; margin-bottom: 1.2rem;
    }

    .disc-section {
      background: rgba(255,255,255,.03);
      border: 1px solid rgba(255,255,255,.07);
      border-radius: 12px;
      padding: 1rem 1.2rem;
      margin-bottom: 1rem;
    }

    .disc-section.green { border-color: rgba(0,255,65,.2); background: rgba(0,255,65,.03); }
    .disc-section.red { border-color: rgba(255,50,50,.25); background: rgba(255,50,50,.04); }

    .disc-section h3 { margin: 0 0 .7rem; font-size: .86rem; }
    .disc-section ul { list-style: none; padding: 0; margin: 0; }
    .disc-section li { font-size: .84rem; color: rgba(255,255,255,.72); line-height: 1.65; margin-bottom: .4rem; }

    #disc-check-row {
      display: flex; align-items: flex-start; gap: 10px;
      margin: 1.2rem 0 .8rem;
      cursor: pointer; user-select: none;
    }

    #disc-check-row input[type=checkbox] {
      width: 18px; height: 18px; margin-top: 2px; accent-color: #00ff41;
    }

    #disc-check-label {
      font-size: .84rem; color: rgba(255,255,255,.72); line-height: 1.6;
    }

    #kali-disc-btns { display: flex; gap: 10px; margin-top: 1rem; }

    #disc-accept-btn {
      flex: 1; padding: 13px; border: none; border-radius: 12px;
      background: linear-gradient(135deg,#00ff41,#00cc33); color: #000;
      font-weight: 800; font-size: .95rem;
      cursor: pointer; transition: all .3s;
      opacity: .4; pointer-events: none;
    }

    #disc-accept-btn.ready { opacity: 1; pointer-events: all; }

    #disc-decline-btn {
      padding: 13px 20px; border: 1px solid rgba(255,255,255,.15);
      border-radius: 12px; background: transparent; color: rgba(255,255,255,.5);
      font-size: .88rem; cursor: pointer;
    }

    #disc-footer-note {
      text-align: center; font-size: .72rem;
      color: rgba(255,255,255,.35); margin-top: 1rem; line-height: 1.6;
    }

    #disc-footer-note a { color: rgba(0,255,65,.7); text-decoration: none; }
  `;
  document.head.appendChild(style);

  const overlay = document.createElement('div');
  overlay.id = 'kali-disc-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'kali-disc-title');
  overlay.innerHTML = `
    <div id="kali-disc-box">
      <div id="kali-disc-topbar">⚠ DISCLAIMER — Read and accept before entering</div>
      <div id="kali-disc-body">
        <div id="kali-disc-icon"><span>⚠️</span></div>
        <div id="kali-disc-title">Legal Disclaimer</div>
        <div id="kali-disc-subtitle">KaliAcademy — Educational Cybersecurity Platform</div>

        <div class="disc-section green">
          <h3>✅ Allowed use</h3>
          <ul>
            <li>• Academic learning and cybersecurity skill development</li>
            <li>• Penetration testing in isolated labs and authorized environments</li>
            <li>• Testing systems you own or have written permission to assess</li>
          </ul>
        </div>

        <div class="disc-section red">
          <h3>🚫 Strictly prohibited</h3>
          <ul>
            <li>• Unauthorized access to systems or networks</li>
            <li>• Data theft, surveillance, or service disruption (DDoS)</li>
            <li>• Malicious use, malware distribution, or criminal abuse</li>
          </ul>
        </div>

        <label id="disc-check-row">
          <input type="checkbox" id="disc-checkbox" onchange="discCheckChange()">
          <span id="disc-check-label">I confirm that I read and understood this disclaimer and will use this platform for legal educational purposes only.</span>
        </label>

        <div id="kali-disc-btns">
          <button id="disc-accept-btn" onclick="discAccept()" disabled>✅ Accept and enter</button>
          <button id="disc-decline-btn" onclick="discDecline()">❌ Decline</button>
        </div>

        <div id="disc-footer-note">
          You can review the full policy in
          <a href="disclaimer.html" target="_blank" rel="noopener">Disclaimer page</a>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  window.discCheckChange = function () {
    const cb = document.getElementById('disc-checkbox');
    const btn = document.getElementById('disc-accept-btn');
    const ready = !!(cb && cb.checked);
    if (btn) {
      btn.disabled = !ready;
      btn.classList.toggle('ready', ready);
    }
  };

  window.discAccept = function () {
    const cb = document.getElementById('disc-checkbox');
    if (!cb || !cb.checked) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ accepted: true, ts: Date.now() }));
      markSessionSeen();
    } catch { /* ignore */ }

    const el = document.getElementById('kali-disc-overlay');
    if (el) {
      el.style.animation = 'disc-fadein .3s ease reverse forwards';
      setTimeout(() => {
        el.remove();
        document.body.style.overflow = '';
      }, 260);
    }
  };

  window.discDecline = function () {
    try {
      window.location.replace('https://google.com');
    } catch {
      window.close();
    }
  };
})();
