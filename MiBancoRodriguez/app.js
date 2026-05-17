/* ═══════════════════════════════════════════════════════════
   DATA (mock / demo)
═══════════════════════════════════════════════════════════ */
const USER = { name: 'María', full: 'María Rosario Quispe', initials: 'MR', dni: '45678901', card: '4334 •••• •••• 4821', pw: '123456' };

const TRANSACTIONS = [
  { type:'in',  icon:'💰', desc:'Depósito en efectivo',         date:'15 may 2026', amount:'+S/ 500.00' },
  { type:'out', icon:'🛒', desc:'Compra – Plaza Vea',           date:'14 may 2026', amount:'-S/ 135.40' },
  { type:'pay', icon:'💡', desc:'Pago Luz del Sur',             date:'13 may 2026', amount:'-S/ 89.60' },
  { type:'in',  icon:'📲', desc:'Transferencia recibida',        date:'12 may 2026', amount:'+S/ 1,200.00' },
  { type:'out', icon:'🍔', desc:'Compra – KFC Jr. Puno',         date:'11 may 2026', amount:'-S/ 42.00' },
  { type:'pay', icon:'📱', desc:'Pago Movistar móvil',           date:'10 may 2026', amount:'-S/ 65.00' },
  { type:'out', icon:'⛽', desc:'GLP Estación Sol',              date:'09 may 2026', amount:'-S/ 180.00' },
  { type:'in',  icon:'💼', desc:'Abono sueldo mayo',             date:'08 may 2026', amount:'+S/ 2,500.00' },
];

const ESTADO_ROWS = [
  { fecha:'15/05/2026', desc:'Depósito efectivo',    cargo:'—',        abono:'S/ 500.00',  saldo:'S/ 3,240.50', tipo:'green' },
  { fecha:'14/05/2026', desc:'Compra Plaza Vea',     cargo:'S/ 135.40',abono:'—',          saldo:'S/ 2,740.50', tipo:'red'   },
  { fecha:'13/05/2026', desc:'Pago Luz del Sur',     cargo:'S/ 89.60', abono:'—',          saldo:'S/ 2,875.90', tipo:'red'   },
  { fecha:'12/05/2026', desc:'Transferencia recibida',cargo:'—',       abono:'S/ 1,200.00',saldo:'S/ 2,965.50', tipo:'green' },
  { fecha:'11/05/2026', desc:'Compra KFC',           cargo:'S/ 42.00', abono:'—',          saldo:'S/ 1,765.50', tipo:'red'   },
  { fecha:'10/05/2026', desc:'Pago Movistar',        cargo:'S/ 65.00', abono:'—',          saldo:'S/ 1,807.50', tipo:'red'   },
  { fecha:'09/05/2026', desc:'GLP Estación Sol',     cargo:'S/ 180.00',abono:'—',          saldo:'S/ 1,872.50', tipo:'red'   },
  { fecha:'08/05/2026', desc:'Abono sueldo mayo',    cargo:'—',        abono:'S/ 2,500.00',saldo:'S/ 2,052.50', tipo:'green' },
];

const LOANS = [
  { id:'MB-2024-0091', type:'Préstamo Personal', total:6000, paid:3800, cuota:380, rate:18.5, vence:'20 may 2026', cuotas:24, pagadas:10 },
];

const CRONOGRAMA = Array.from({length:24}, (_,i) => ({
  n: i+1,
  fecha: `${String((20+(i*1))%28||20).padStart(2,'0')}/${String(((5+i)%12)||12).padStart(2,'0')}/202${5+Math.floor(i/12)}`,
  capital: 'S/ 186.25',
  interes: 'S/ 87.50',
  seguro:  'S/ 12.80',
  cuota:   'S/ 286.55',
  estado:  i<10 ? 'paid' : i===10 ? 'current' : 'pending',
}));

const PAGOS_HIST = [
  { fecha:'10/05/2026', empresa:'Movistar',    servicio:'Internet 100Mb', monto:'S/ 65.00',  est:'green' },
  { fecha:'08/05/2026', empresa:'Luz del Sur', servicio:'Suministro 123', monto:'S/ 89.60',  est:'green' },
  { fecha:'02/05/2026', empresa:'AFP Integra', servicio:'Aporte mensual', monto:'S/ 120.00', est:'green' },
  { fecha:'28/04/2026', empresa:'Sedapal',     servicio:'Agua y alcant.', monto:'S/ 48.00',  est:'green' },
];

/* ═══════════════════════════════════════════════════════════
   ROUTING
═══════════════════════════════════════════════════════════ */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
function showModule(name, clickedNav) {
  document.querySelectorAll('.module').forEach(m => m.classList.remove('active'));
  document.getElementById('mod-' + name).classList.add('active');
  if (clickedNav) {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    clickedNav.classList.add('active');
  } else {
    const nav = document.querySelector(`.nav-item[onclick*="${name}"]`);
    if (nav) { document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active')); nav.classList.add('active'); }
  }
}

/* ═══════════════════════════════════════════════════════════
   AUTH
═══════════════════════════════════════════════════════════ */
function switchTab(tab) {
  const isLogin = tab === 'login';
  document.getElementById('tab-login').classList.toggle('hidden', !isLogin);
  document.getElementById('tab-register').classList.toggle('hidden', isLogin);
  document.querySelectorAll('.login-tab').forEach((t,i) => t.classList.toggle('active', isLogin ? i===0 : i===1));
}

function doLogin() {
  const dni  = document.getElementById('login-dni').value.trim();
  const card = document.getElementById('login-card').value.trim();
  const pw   = document.getElementById('login-pw').value.trim();
  if (!dni || !card || !pw) { showToast('Completa todos los campos','error'); return; }
  if (pw.length < 4) { showToast('Clave incorrecta','error'); return; }
  // Demo: accept any input
  loadApp();
}

function doRegister() {
  const name  = document.getElementById('reg-name').value.trim();
  const dni   = document.getElementById('reg-dni').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const card  = document.getElementById('reg-card').value.trim();
  const pw    = document.getElementById('reg-pw').value.trim();
  if (!name || !dni || !email || !card || !pw) { showToast('Completa todos los campos','error'); return; }
  showToast('Cuenta registrada. Ahora puedes ingresar ✅');
  setTimeout(() => switchTab('login'), 1800);
}

function loadApp() {
  document.getElementById('top-name').textContent = USER.name + ' R.';
  document.getElementById('dash-name').textContent = USER.name;
  renderTxList();
  renderEstado();
  renderLoans();
  renderCronograma();
  renderPagosHistorial();
  showPage('page-app');
}

function doLogout() {
  showPage('page-login');
  showToast('Sesión cerrada correctamente');
}

/* ═══════════════════════════════════════════════════════════
   RENDERS
═══════════════════════════════════════════════════════════ */
function renderTxList() {
  const el = document.getElementById('tx-list');
  el.innerHTML = TRANSACTIONS.map(t => `
    <div class="tx-item">
      <div class="tx-ico ${t.type}">${t.icon}</div>
      <div class="tx-info"><strong>${t.desc}</strong><span>${t.date}</span></div>
      <div class="tx-amount ${t.type}">${t.amount}</div>
    </div>`).join('');
}

function renderEstado() {
  const thead = `<thead><tr><th>Fecha</th><th>Descripción</th><th>Cargo</th><th>Abono</th><th>Saldo</th><th>Estado</th></tr></thead>`;
  const tbody = ESTADO_ROWS.map(r => `
    <tr>
      <td>${r.fecha}</td>
      <td>${r.desc}</td>
      <td class="${r.cargo!=='—'?'text-red':''}">${r.cargo}</td>
      <td class="${r.abono!=='—'?'text-green':''}">${r.abono}</td>
      <td class="fw-800">${r.saldo}</td>
      <td><span class="chip ${r.tipo}">${r.tipo==='green'?'Abono':'Cargo'}</span></td>
    </tr>`).join('');
  const html = thead + '<tbody>' + tbody + '</tbody>';
  document.getElementById('estado-table-mini').innerHTML = thead + '<tbody>' + tbody.split('</tr>').slice(0,4).join('</tr>') + '</tbody>';
  document.getElementById('estado-table-full').innerHTML = html;
}

function renderLoans() {
  const c = document.getElementById('loan-cards-container');
  c.innerHTML = LOANS.map(l => {
    const pct = Math.round((l.paid / l.total)*100);
    return `
    <div class="loan-card selected">
      <div class="loan-header">
        <div>
          <div class="loan-type">${l.type}</div>
          <div class="fs-sm" style="color:var(--gray-400)">N° ${l.id} · TEA ${l.rate}%</div>
        </div>
        <span class="chip green">Activo</span>
      </div>
      <div class="loan-meta">
        <div><strong>S/ ${l.total.toLocaleString()}</strong>Monto original</div>
        <div><strong>S/ ${(l.total-l.paid).toLocaleString()}</strong>Saldo por pagar</div>
        <div><strong>S/ ${l.cuota}</strong>Cuota mensual</div>
        <div><strong>${l.pagadas}/${l.cuotas}</strong>Cuotas pagadas</div>
        <div><strong>${l.vence}</strong>Próximo vencimiento</div>
      </div>
      <div class="loan-progress mt-1">
        <div class="loan-progress-bar" style="width:${pct}%"></div>
      </div>
      <div class="fs-sm" style="color:var(--gray-400);margin-top:.3rem">${pct}% pagado</div>
    </div>`;
  }).join('');
}

function renderCronograma() {
  const headers = ['N°','Fecha','Capital','Interés','Seguro','Cuota Total','Estado'];
  const thead = '<thead><tr>' + headers.map(h=>`<th>${h}</th>`).join('') + '</tr></thead>';
  const tbody = CRONOGRAMA.map(r => {
    const estMap = { paid:`<span class="chip green">Pagado</span>`, current:`<span class="chip yellow">Pendiente</span>`, pending:`<span class="chip blue">Por pagar</span>` };
    return `<tr class="${r.estado}"><td>${r.n}</td><td>${r.fecha}</td><td>${r.capital}</td><td>${r.interes}</td><td>${r.seguro}</td><td class="fw-800">${r.cuota}</td><td>${estMap[r.estado]}</td></tr>`;
  }).join('');
  document.getElementById('cronograma-table').innerHTML = thead + '<tbody>' + tbody + '</tbody>';
}

function renderPagosHistorial() {
  const thead = `<thead><tr><th>Fecha</th><th>Empresa</th><th>Servicio</th><th>Monto</th><th>Estado</th></tr></thead>`;
  const tbody = PAGOS_HIST.map(r => `
    <tr>
      <td>${r.fecha}</td><td>${r.empresa}</td><td>${r.servicio}</td>
      <td class="fw-800">${r.monto}</td>
      <td><span class="chip ${r.est}">Pagado</span></td>
    </tr>`).join('');
  document.getElementById('pagos-historial').innerHTML = thead + '<tbody>' + tbody + '</tbody>';
}

/* ═══════════════════════════════════════════════════════════
   OPERATIONS
═══════════════════════════════════════════════════════════ */
function doDeposit() {
  const amt = parseFloat(document.getElementById('deposit-amount').value);
  if (!amt || amt <= 0) { showToast('Ingresa un monto válido','error'); return; }
  showToast(`Depósito de S/ ${amt.toFixed(2)} realizado ✅`);
  document.getElementById('deposit-amount').value = '';
}

function doPago() {
  const cod   = document.getElementById('pago-cod').value.trim();
  const monto = parseFloat(document.getElementById('pago-monto').value);
  if (!cod)         { showToast('Ingresa el número de cliente','error'); return; }
  if (!monto||monto<=0) { showToast('Ingresa un monto válido','error'); return; }
  const emp = document.getElementById('pago-empresa').value;
  showToast(`Pago a ${emp} de S/ ${monto.toFixed(2)} realizado ✅`);
  const now = new Date();
  const fd = `${String(now.getDate()).padStart(2,'0')}/${String(now.getMonth()+1).padStart(2,'0')}/${now.getFullYear()}`;
  PAGOS_HIST.unshift({ fecha:fd, empresa:emp, servicio:`Cod. ${cod}`, monto:`S/ ${monto.toFixed(2)}`, est:'green' });
  renderPagosHistorial();
  document.getElementById('pago-cod').value = '';
  document.getElementById('pago-monto').value = '';
}

let tCurrentStep = 1;
function tStep(n) {
  if (n === 3) {
    const acc  = document.getElementById('t-dest-acc').value.trim();
    const name = document.getElementById('t-dest-name').value.trim();
    const amt  = document.getElementById('t-amount').value.trim();
    if (!acc||!name) { showToast('Completa los datos del destinatario','error'); return; }
    if (!amt||parseFloat(amt)<=0) { showToast('Ingresa un monto válido','error'); return; }
    document.getElementById('t-summary').innerHTML = `
      <div class="transfer-summary-row"><span>Destinatario</span><strong>${name}</strong></div>
      <div class="transfer-summary-row"><span>Cuenta destino</span><strong>${acc}</strong></div>
      <div class="transfer-summary-row"><span>Monto</span><strong>S/ ${parseFloat(amt).toFixed(2)}</strong></div>
      <div class="transfer-summary-row"><span>Concepto</span><strong>${document.getElementById('t-concept').value||'—'}</strong></div>
      <div class="transfer-summary-row"><span>Comisión</span><strong>S/ 0.00</strong></div>
    `;
  }
  if (n === 4) {
    const pw = document.getElementById('t-confirm-pw').value.trim();
    if (!pw||pw.length<4) { showToast('Ingresa tu clave para confirmar','error'); return; }
    document.getElementById('t-opnum').textContent = 'MB' + Date.now().toString().slice(-8);
    showToast('Transferencia completada ✅');
  }
  for (let i=1;i<=4;i++) {
    const el = document.getElementById('t-step-'+i);
    if (el) el.classList.toggle('hidden', i!==n);
  }
  const steps = document.querySelectorAll('#stepper .step');
  steps.forEach((s,i) => {
    s.classList.remove('active','done');
    if (i < n-1) s.classList.add('done');
    if (i === n-1) s.classList.add('active');
  });
  tCurrentStep = n;
}

function tReset() {
  ['t-dest-acc','t-dest-name','t-amount','t-concept','t-confirm-pw'].forEach(id=>{
    const el=document.getElementById(id); if(el) el.value='';
  });
  tStep(1);
}

function selectPagoCat(el, title) {
  document.querySelectorAll('.pago-cat').forEach(c=>c.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('pago-cat-title').textContent = title;
}

/* ═══════════════════════════════════════════════════════════
   UI HELPERS
═══════════════════════════════════════════════════════════ */
function togglePw(id, btn) {
  const inp = document.getElementById(id);
  const show = inp.type === 'password';
  inp.type = show ? 'text' : 'password';
  btn.textContent = show ? '🙈' : '👁';
}

function formatCard(inp) {
  let v = inp.value.replace(/\D/g,'').substring(0,16);
  inp.value = v.replace(/(.{4})/g,'$1 ').trim();
}

let toastTimer;
function showToast(msg, type='') {
  const t = document.getElementById('toast');
  const ico = document.getElementById('toast-ico');
  const msgEl = document.getElementById('toast-msg');
  t.classList.remove('error');
  ico.textContent = type==='error' ? '❌' : type==='info' ? 'ℹ️' : '✅';
  if (type==='error') t.classList.add('error');
  msgEl.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}

/* ═══════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════ */
// Pre-fill demo hint
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('login-dni').placeholder = 'Demo: cualquier valor';
  document.getElementById('login-card').placeholder = 'Demo: cualquier valor';
  document.getElementById('login-pw').placeholder   = 'Demo: cualquier valor';
});

/* ═══════════════════════════════════════════════════════════
   ENHANCED JS — ANIMACIONES Y DINAMISMO
═══════════════════════════════════════════════════════════ */

/* ── 1. Loading screen ─────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const ls = document.getElementById('loading-screen');
    if (ls) ls.classList.add('fade-out');
    setTimeout(() => ls && ls.remove(), 550);
  }, 1700);
});

/* ── 2. Ripple effect on interactive elements ─────────────*/
function addRipple(e) {
  const el = e.currentTarget;
  const r  = el.getBoundingClientRect();
  const size = Math.max(r.width, r.height);
  const x = e.clientX - r.left - size / 2;
  const y = e.clientY - r.top  - size / 2;
  const rip = document.createElement('span');
  rip.className = 'ripple';
  Object.assign(rip.style, {
    width: size + 'px', height: size + 'px',
    left: x + 'px', top: y + 'px'
  });
  el.appendChild(rip);
  setTimeout(() => rip.remove(), 600);
}
document.addEventListener('DOMContentLoaded', () => {
  const targets = '.btn-primary, .btn-secondary, .btn-hero, .quick-btn, .pago-cat, .login-tab';
  document.querySelectorAll(targets).forEach(el => el.addEventListener('click', addRipple));
  // Delegate for dynamically-added elements
  document.body.addEventListener('click', e => {
    const t = e.target.closest('.btn-primary, .btn-secondary');
    if (t && !t._rippleSet) {
      addRipple({ currentTarget: t, clientX: e.clientX, clientY: e.clientY });
    }
  });
});

/* ── 3. Live clock in topbar ───────────────────────────── */
function updateClock() {
  const el = document.getElementById('topbar-clock');
  if (!el) return;
  const now = new Date();
  const hh  = String(now.getHours()).padStart(2,'0');
  const mm  = String(now.getMinutes()).padStart(2,'0');
  const ss  = String(now.getSeconds()).padStart(2,'0');
  el.textContent = `${hh}:${mm}:${ss}`;
}
setInterval(updateClock, 1000);
document.addEventListener('DOMContentLoaded', updateClock);

/* ── 4. Balance counter animation ──────────────────────── */
function animateCounter(el, target, duration = 1200) {
  const start = performance.now();
  const from  = 0;
  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // cubic ease-out
    const val  = from + (target - from) * ease;
    el.textContent = val.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ── 5. Toggle balance visibility ──────────────────────── */
let balanceHidden = false;
function toggleBalance() {
  balanceHidden = !balanceHidden;
  const numEl = document.getElementById('hero-balance-num');
  const btn   = document.getElementById('eye-btn');
  if (balanceHidden) {
    numEl.style.filter = 'blur(8px)';
    numEl.style.userSelect = 'none';
    btn.textContent = '🙈 Mostrar';
  } else {
    numEl.style.filter = '';
    numEl.style.userSelect = '';
    btn.textContent = '👁 Ocultar';
  }
}

/* ── 6. Animate balance on dashboard entry ─────────────── */
const _origShowModule = window.showModule;
window.showModule = function(mod, el) {
  _origShowModule && _origShowModule(mod, el);
  if (mod === 'dashboard') {
    const numEl = document.getElementById('hero-balance-num');
    if (numEl) animateCounter(numEl, 4850.72);
  }
  // Update mobile nav active state
  document.querySelectorAll('.mob-nav-btn').forEach(b => b.classList.remove('active'));
  const mods = ['dashboard','ahorros','creditos','transferencias','pagos','perfil'];
  const idx  = mods.indexOf(mod);
  const mBtns = document.querySelectorAll('.mob-nav-btn');
  const map   = { dashboard:0, ahorros:1, creditos:2, transferencias:3, perfil:4 };
  if (map[mod] !== undefined && mBtns[map[mod]]) mBtns[map[mod]].classList.add('active');
};

/* ── 7. Mobile nav helper ──────────────────────────────── */
function mobileNav(btn) {
  document.querySelectorAll('.mob-nav-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

/* ── 8. Show mobile nav on app login ───────────────────── */
const _origDoLogin = window.doLogin;
window.doLogin = function() {
  _origDoLogin && _origDoLogin();
  // After login, show mobile nav and animate balance
  setTimeout(() => {
    document.getElementById('mobile-nav')?.classList.remove('hidden');
    const numEl = document.getElementById('hero-balance-num');
    if (numEl) animateCounter(numEl, 4850.72);
  }, 100);
};
const _origDoLogout = window.doLogout;
window.doLogout = function() {
  document.getElementById('mobile-nav')?.classList.add('hidden');
  _origDoLogout && _origDoLogout();
};

/* ── 9. Input focus glow effect ────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.input-wrap input, .input-plain, select.inp').forEach(inp => {
    inp.addEventListener('focus', () => {
      inp.closest('.form-group')?.classList.add('focused');
    });
    inp.addEventListener('blur', () => {
      inp.closest('.form-group')?.classList.remove('focused');
    });
  });
});

/* ── 10. Loan progress bars animate on view ─────────────── */
const _origShowModuleOld = window.showModule;
// Animate loan bars when credits module opens
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.loan-progress-bar').forEach(bar => {
          const w = bar.style.width;
          bar.style.width = '0';
          setTimeout(() => bar.style.width = w, 100);
        });
      }
    });
  }, { threshold: 0.3 });
  const credMod = document.getElementById('mod-creditos');
  if (credMod) observer.observe(credMod);
});

/* ── 11. Keyboard shortcut hints ────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const toast = document.getElementById('toast');
    if (toast?.classList.contains('show')) toast.classList.remove('show');
  }
  // Alt+1..5 for module switching (only in app)
  if (e.altKey && document.getElementById('page-app')?.classList.contains('active')) {
    const moduleMap = { '1':'dashboard', '2':'ahorros', '3':'creditos', '4':'transferencias', '5':'perfil' };
    if (moduleMap[e.key]) { e.preventDefault(); showModule(moduleMap[e.key], null); }
  }
});

/* ── 12. Animate stat card values ────────────────────────── */
function animateStatCards() {
  const stats = [
    { el: document.querySelector('.stat-card:nth-child(1) .stat-card-value'), val: 3240 },
    { el: document.querySelector('.stat-card:nth-child(2) .stat-card-value'), val: 1610 },
    { el: document.querySelector('.stat-card:nth-child(3) .stat-card-value'), val: 380 },
    { el: document.querySelector('.stat-card:nth-child(4) .stat-card-value'), val: 1250 },
  ];
  stats.forEach(({ el, val }) => {
    if (!el) return;
    const start = performance.now();
    (function step(now) {
      const p = Math.min((now - start) / 1000, 1);
      const e = 1 - Math.pow(1-p, 3);
      el.textContent = 'S/ ' + Math.round(val * e).toLocaleString('es-PE');
      if (p < 1) requestAnimationFrame(step);
    })(start);
  });
}
document.addEventListener('DOMContentLoaded', () => setTimeout(animateStatCards, 500));

/* ── 13. Notification badge shake ────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const bell = document.querySelector('.topbar-notif');
  if (bell) {
    setInterval(() => {
      bell.style.animation = 'bellRing .4s ease';
      setTimeout(() => bell.style.animation = '', 450);
    }, 8000);
  }
});

