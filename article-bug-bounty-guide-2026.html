/* ============================================================
   TUTORIALS PAGE LOGIC - KaliAcademy
   ============================================================ */

let activeFilter = 'all';
let searchQ = '';

function renderLessons() {
  const grid = document.getElementById('lessonsGrid');
  const noRes = document.getElementById('noResults');
  const q = searchQ.toLowerCase();
  let filtered = TUTORIALS.filter(t => {
    const matchFilter = activeFilter === 'all' || t.level === activeFilter || t.cat === activeFilter;
    const matchSearch = !q || t.title.toLowerCase().includes(q) ||
      t.desc.toLowerCase().includes(q) ||
      t.tags.some(tag => tag.toLowerCase().includes(q));
    return matchFilter && matchSearch;
  });
  document.getElementById('total-badge').textContent = filtered.length;
  if(filtered.length === 0) {
    grid.innerHTML = '';
    noRes.style.display = 'block';
    return;
  }
  noRes.style.display = 'none';
  grid.innerHTML = filtered.map(t => `
    <div class="lesson-card" onclick="openLesson(${t.id})">
      <div class="lesson-card-top">
        <div class="lesson-icon" style="background:rgba(0,255,65,0.08);border-color:rgba(0,255,65,0.2);">${t.icon}</div>
        <div class="lesson-meta">
          <h3>${t.title}</h3>
          <p>${t.desc}</p>
        </div>
      </div>
      <div class="lesson-tags">
        <span class="lesson-tag ${t.level==='beginner'?'tag-beg':t.level==='intermediate'?'tag-int':'tag-adv'}">${t.level==='beginner'?'مبتدئ':t.level==='intermediate'?'متوسط':'متقدم'}</span>
        ${t.tags.slice(0,2).map(tag=>`<span class="lesson-tag tag-cat">${tag}</span>`).join('')}
      </div>
      <div class="lesson-footer">
        <span class="lesson-steps"><i class="fas fa-list-ol" style="margin-left:4px;color:var(--primary);"></i>${t.steps.length} خطوات</span>
        <span class="lesson-arrow"><i class="fas fa-arrow-left"></i></span>
      </div>
    </div>
  `).join('');
}

function openLesson(id) {
  const t = TUTORIALS.find(x => x.id === id);
  if(!t) return;
  document.getElementById('modalTitle').textContent = t.icon + ' ' + t.title;
  document.getElementById('modalBody').innerHTML = `
    <p style="color:var(--text-secondary);font-family:'Cairo',sans-serif;font-size:0.9rem;margin-bottom:1.5rem;line-height:1.7;">${t.desc}</p>
    ${t.steps.map((s,i)=>`
      <div class="tut-step">
        <div class="tut-step-num">${i+1}</div>
        <div class="tut-step-content">
          <h4>${s.title}</h4>
          <p>${s.text}</p>
          <div class="tut-step-cmd">
            <pre style="margin:0;font-family:'Share Tech Mono',monospace;overflow-x:auto;">${s.cmd.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</pre>
            <button class="tut-copy" onclick="tutCopy(this,'${encodeURIComponent(s.cmd)}')">📋</button>
          </div>
          <div style="color:var(--text-muted);font-size:0.78rem;margin-top:4px;font-family:'Cairo',sans-serif;">⟵ ${s.cmdDesc}</div>
          ${s.note ? '<div class="tut-note">💡 ' + s.note + '</div>' : ''}
        </div>
      </div>
    `).join('')}
  `;
  document.getElementById('tutModal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeTutModal(e) {
  if(e.target === document.getElementById('tutModal')) closeTutModalDirect();
}
function closeTutModalDirect() {
  document.getElementById('tutModal').style.display = 'none';
  document.body.style.overflow = '';
}

function tutCopy(btn, encodedCmd) {
  const cmd = decodeURIComponent(encodedCmd);
  if(navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(cmd).then(()=>{ btn.textContent='✅'; setTimeout(()=>btn.textContent='📋',1500); });
  } else {
    const ta = document.createElement('textarea');
    ta.value = cmd;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    btn.textContent='✅';
    setTimeout(()=>btn.textContent='📋',1500);
  }
}

function setFilter(filter, el) {
  activeFilter = filter;
  document.querySelectorAll('.tut-tab').forEach(b=>b.classList.remove('active'));
  if(el) el.classList.add('active');
  renderLessons();
}

function filterTutorials() {
  searchQ = document.getElementById('tutSearch').value;
  renderLessons();
}

// INIT
document.addEventListener('DOMContentLoaded', function() {
  renderLessons();
  document.querySelector('.hamburger')?.addEventListener('click',()=>{
    document.querySelector('.mobile-menu')?.classList.toggle('open');
  });
});
