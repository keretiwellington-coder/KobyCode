/* KobyCode site script. Prices and details live in kc-config.js */
(function(){
(function(){var d=document.documentElement;if(!d.classList.contains('intro'))return;var o=document.getElementById('intro');
function end(){try{sessionStorage.setItem('kc-intro','1')}catch(e){}o.classList.add('out');setTimeout(function(){d.classList.remove('intro')},480)}
setTimeout(end,2700);o.addEventListener('click',end)})();
})();

(function () {
  'use strict';
  var C = CONFIG;
  var $ = function (s, r) { return (r || document).querySelector(s) || document.createElement('div'); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var ic = function (n, cls) { return '<svg class="ic ' + (cls || '') + '" aria-hidden="true"><use href="#i-' + n + '"/></svg>'; };
  var html = document.documentElement;

  /* ---------- Supabase (optional: site still works if unavailable) ---------- */
  var SB_URL = 'https://oxszyzakrwnjcfmodpze.supabase.co', SB_KEY = 'sb_publishable_uGos98sQOnJWEzcd_EAzAQ_gOGcTOs9';
  var sb = null, user = null;
  try { sb = window.supabase.createClient(SB_URL, SB_KEY); } catch (e) { sb = null; }
  var noTrack = function () { try { return localStorage.getItem('kc-notrack') === '1'; } catch (e) { return false; } };
  function track(type, detail) {
    if (!sb || noTrack()) return;
    try { sb.from('site_events').insert({ type: type, path: (location.pathname.split('/').pop() || 'index.html'), detail: detail ? String(detail).slice(0, 100) : null }).then(function () {}, function () {}); } catch (e) {}
  }

  /* ---------- Theme ---------- */
  var themeBtn = $('#themeBtn');
  function applyTheme(t, save) {
    html.dataset.theme = t;
    themeBtn.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    var m = $('meta[name=theme-color]'); if (m) m.content = t === 'dark' ? '#000000' : '#ffffff';
    if (save) { try { localStorage.setItem('kc-theme', t); } catch (e) {} }
  }
  applyTheme(html.dataset.theme === 'dark' ? 'dark' : 'light', false);
  themeBtn.addEventListener('click', function () { applyTheme(html.dataset.theme === 'dark' ? 'light' : 'dark', true); });

  /* ---------- Currency ---------- */
  var cur = 'USD';
  try { var sc = localStorage.getItem('kc-currency'); if (sc && C.currencies[sc]) cur = sc; } catch (e) {}
  var fmt = function (n) { return new Intl.NumberFormat(C.currencies[cur].locale, { style: 'currency', currency: cur, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n); };
  var allPlans = function () { return C.packages.concat(C.care); };
  var priceOf = function (id) { if (id === 'ai') return fmt(C.addon.price[cur]); if (id === 'ai-monthly') return fmt(C.addon.monthly[cur]); var p = allPlans().filter(function (x) { return x.id === id; })[0]; return p && p.price ? fmt(p.price[cur]) : ''; };
  var codes = Object.keys(C.currencies);

  function renderPlans() {
    $('#plans').innerHTML = C.packages.map(function (p) {
      return '<article class="card plan' + (p.popular ? ' pop' : '') + '">' + (p.popular ? '<span class="badge">Most Popular</span>' : '') +
        '<div><h3>' + esc(p.name) + '</h3><p class="mut sm" style="margin-top:6px">' + esc(p.tagline) + '</p></div>' +
        '<div class="amt">' + (p.price ? esc(fmt(p.price[cur])) : 'Custom Quote') + '</div>' +
        '<p class="per2">' + (p.price ? 'Starting price, one-time' : 'Priced by scope and complexity') + '</p>' +
        '<p class="deliv">' + ic('clock', 's') + esc(p.delivery) + '</p>' +
        '<ul class="feat">' + p.features.map(function (f) { return '<li>' + ic('check', 's') + '<span>' + esc(f) + '</span></li>'; }).join('') + '</ul>' +
        '<button class="btn' + (p.popular ? '' : ' ghost') + ' block" type="button" data-pkg="' + p.id + '">' + esc(p.cta) + '</button></article>';
    }).join('');
    $('#care').innerHTML = C.care.map(function (p) {
      return '<article class="card plan"><h3>' + esc(p.name) + '</h3>' +
        '<div class="amt">' + esc(fmt(p.price[cur])) + '<span class="per">/month</span></div>' +
        '<ul class="feat">' + p.features.map(function (f) { return '<li>' + ic('check', 's') + '<span>' + esc(f) + '</span></li>'; }).join('') + '</ul>' +
        '<button class="btn ghost block" type="button" data-care="' + p.id + '">Choose ' + esc(p.name) + '</button></article>';
    }).join('');
    var a = C.addon;
    $('#addon').innerHTML = '<article class="card" style="margin-top:28px;display:grid;gap:22px;align-items:center;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))"><div><p class="eyebrow">Add-on</p><h3 style="font-size:24px">' + esc(a.name) + '</h3><p class="mut" style="margin-top:8px">A chat assistant on your website that answers customer questions from the information you give it.</p>' +
      '<div class="amt" style="margin-top:16px">' + esc(fmt(a.price[cur])) + '<span class="per"> one-time setup</span></div><p class="per2" style="margin-top:6px">+ ' + esc(fmt(a.monthly[cur])) + ' per month maintenance</p></div>' +
      '<div><ul class="feat">' + a.features.map(function (f) { return '<li>' + ic('check', 's') + '<span>' + esc(f) + '</span></li>'; }).join('') + '</ul>' +
      '<div class="cta-row" style="margin:20px 0 0"><button class="btn" type="button" data-addon="1">Add the AI Assistant</button><a class="btn ghost" href="' + esc(a.demo) + '" target="_blank" rel="noopener" data-demo="1">See a live demo</a><a class="btn ghost" href="ai-assistant.html">How it works</a></div><p class="note">The demo is a sample real estate site with fictional listings.</p></div></article>';
    $$('[data-price]').forEach(function (el) { el.textContent = priceOf(el.getAttribute('data-price')); });
  }
  function renderCurrencyControls() {
    $('#seg').innerHTML = codes.map(function (c) { return '<button type="button" data-cur="' + c + '" aria-pressed="' + (c === cur) + '">' + c + '</button>'; }).join('');
    $('#curNav').innerHTML = codes.map(function (c) { return '<option value="' + c + '"' + (c === cur ? ' selected' : '') + '>' + c + '</option>'; }).join('');
    $('#curName').textContent = 'Showing prices in ' + C.currencies[cur].name;
    $('#f-currency').innerHTML = codes.map(function (c) { return '<option value="' + c + '"' + (c === cur ? ' selected' : '') + '>' + c + ' – ' + C.currencies[c].name + '</option>'; }).join('');
  }
  function renderBudget() {
    var s = C.packages[0].price[cur], b = C.packages[1].price[cur], p = C.packages[2].price[cur];
    var opts = ['', 'Under ' + fmt(s), fmt(s) + ' – ' + fmt(b), fmt(b) + ' – ' + fmt(p), fmt(p) + '+', 'Not sure yet'];
    var sel = $('#f-budget'), prev = sel.value;
    sel.innerHTML = opts.map(function (o, i) { return '<option value="' + esc(o) + '">' + (i ? esc(o) : 'Select a range') + '</option>'; }).join('');
    sel.value = '';
  }
  function setCurrency(c, fromUser) {
    if (!C.currencies[c]) return;
    cur = c;
    try { localStorage.setItem('kc-currency', c); } catch (e) {}
    renderCurrencyControls(); renderPlans(); renderBudget();
    if (fromUser) track('currency_change', c);
  }
  $('#seg').addEventListener('click', function (e) { var b = e.target.closest('[data-cur]'); if (b) setCurrency(b.getAttribute('data-cur'), true); });
  $('#curNav').addEventListener('change', function (e) { setCurrency(e.target.value, true); });
  $('#f-currency').addEventListener('change', function (e) { setCurrency(e.target.value, true); });

  /* ---------- Static selects ---------- */
  var SERVICES = ['Business Website Development', 'Landing Page Development', 'Website Redesign', 'Website Maintenance', 'AI Chat Assistant', 'Not sure yet'];
  var TYPES = ['Restaurant or food', 'Salon, barber or beauty', 'Real estate', 'Fitness or sports', 'Events or hospitality', 'Professional services', 'Retail', 'Health or wellness', 'Education', 'Non-profit', 'Other'];
  var DEADLINES = ['As soon as possible', 'Within 2 weeks', 'Within a month', 'In 1–3 months', 'Flexible'];
  function fillSelect(id, list, placeholder) { $(id).innerHTML = '<option value="">' + placeholder + '</option>' + list.map(function (x) { return '<option>' + esc(x) + '</option>'; }).join(''); }
  fillSelect('#f-service', SERVICES, 'Select a service');
  fillSelect('#f-type', TYPES, 'Select a type');
  fillSelect('#f-deadline', DEADLINES, 'Select a timeframe');
  $('#f-package').innerHTML = '<option value="">Not sure yet</option>' +
    C.packages.map(function (p) { return '<option>' + esc(p.name) + '</option>'; }).join('') +
    C.care.map(function (p) { return '<option>' + esc(p.name) + ' (monthly)</option>'; }).join('') + '<option>' + esc(C.addon.name) + ' add-on</option>';

  /* ---------- Portfolio ---------- */
  function renderProjects() {
    if (!C.projects.length) { $('#projects').innerHTML = '<div class="card" style="grid-column:1/-1;text-align:center;padding:40px 24px"><h3>Client projects are coming soon</h3><p class="mut" style="max-width:520px;margin:10px auto 22px">We would rather show real work than mock-ups. Launched client websites will appear here with what we built and the results.</p><a class="btn" href="contact.html#inquiry">Be one of our first projects</a></div>'; return; }
    $('#projects').innerHTML = C.projects.map(function (p) {
      var pv = '<img src="' + esc(p.image) + '" alt="' + esc(p.title) + ' website preview" loading="lazy">';
      return '<article class="card pcard"><div class="pv" role="img" aria-label="' + esc(p.title) + ' website preview">' + (p.image ? '' : '<span class="concept">Concept project</span>') + pv + '</div>' +
        '<div class="pbody"><span class="cat">' + esc(p.category) + '</span><h3>' + esc(p.title) + '</h3><p>' + esc(p.desc) + '</p>' +
        '<div class="tags">' + (p.tech || []).map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>' +
        '<button class="btn ghost sm" type="button" data-project="' + p.id + '">View Project</button></div></article>';
    }).join('');
  }
  function projectDialog(id) {
    var p = C.projects.filter(function (x) { return x.id === id; })[0]; if (!p) return;
    openDlg(p.title,
      '<p>' + (p.image ? '' : '<b style="color:var(--ink)">Concept project.</b> ') + esc(p.desc) + '</p>' +
      '<h4>The problem</h4><p>' + esc(p.problem) + '</p><h4>The solution</h4><p>' + esc(p.solution) + '</p>' +
      '<h4>Design decisions</h4><ul>' + p.design.map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('') + '</ul>' +
      '<h4>Functionality</h4><ul>' + p.features.map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('') + '</ul>' +
      '<h4>Results</h4><p>' + esc(p.results || 'This is a concept project, so there are no client results to report. Verified results will be shown here for real client projects.') + '</p>' +
      (p.url ? '<p style="margin-top:16px"><a class="btn sm" href="' + esc(p.url) + '" target="_blank" rel="noopener">Visit live site</a></p>' : '<p style="margin-top:16px"><button class="btn sm" type="button" data-start-from="Business Website Development">Start a similar project</button></p>'));
  }

  /* ---------- Testimonials, contact ---------- */
  if (C.testimonials && C.testimonials.length) {
    $('#reviews').hidden = false;
    $('#quotes').innerHTML = C.testimonials.map(function (t) { return '<figure class="card quote" style="margin:0"><p>&ldquo;' + esc(t.quote) + '&rdquo;</p><b>' + esc(t.name) + '</b><span>' + esc(t.role) + '</span></figure>'; }).join('');
  }
  var waLink = function (text) { return 'https://wa.me/' + C.whatsapp + (text ? '?text=' + encodeURIComponent(text) : ''); };
  (function renderContact() {
    var boxes = [];
    if (C.email) boxes.push('<div class="card cbox"><div class="iconbox">' + ic('mail') + '</div><div><b>Email</b><a href="mailto:' + esc(C.email) + '">' + esc(C.email) + '</a></div></div>');
    boxes.push('<div class="card cbox"><div class="iconbox">' + ic('chat') + '</div><div><b>WhatsApp</b><a href="' + waLink('Hi KobyCode, I would like to talk about a website.') + '" target="_blank" rel="noopener" data-wa>Message on WhatsApp</a></div></div>');
    boxes.push('<div class="card cbox"><div class="iconbox">' + ic('pin') + '</div><div><b>Location</b><span>' + esc(C.location) + '</span></div></div>');
    var so = Object.keys(C.socials || {});
    if (so.length) boxes.push('<div class="card cbox"><div class="iconbox">' + ic('globe') + '</div><div><b>Social</b>' + so.map(function (k) { return '<a href="' + esc(C.socials[k]) + '" target="_blank" rel="noopener" style="display:block">' + esc(k) + '</a>'; }).join('') + '</div></div>');
    $('#contactGrid').innerHTML = boxes.join('');
    var f = [];
    if (C.email) f.push('<li><a href="mailto:' + esc(C.email) + '">' + esc(C.email) + '</a></li>');
    f.push('<li><a href="' + waLink('Hi KobyCode, I would like to talk about a website.') + '" target="_blank" rel="noopener" data-wa>WhatsApp</a></li>');
    f.push('<li><span class="mut" style="font-size:15px">' + esc(C.location) + '</span></li>');
    so.forEach(function (k) { f.push('<li><a href="' + esc(C.socials[k]) + '" target="_blank" rel="noopener">' + esc(k) + '</a></li>'); });
    $('#footContact').innerHTML = f.join('');
  })();
  $('#yr').textContent = new Date().getFullYear();

  /* ---------- Dialog ---------- */
  var dlg = $('#dlg');
  function openDlg(title, body) {
    $('#dlgTitle').textContent = title; $('#dlgBody').innerHTML = body;
    if (typeof dlg.showModal === 'function') { if (!dlg.open) dlg.showModal(); } else { dlg.setAttribute('open', ''); }
    dlg.scrollTop = 0;
  }
  function closeDlg() { if (dlg.open) { if (typeof dlg.close === 'function') dlg.close(); else dlg.removeAttribute('open'); } }
  $('#dlgClose').addEventListener('click', closeDlg);
  dlg.addEventListener('click', function (e) { if (e.target === dlg) closeDlg(); });

  var PRIVACY = '<p>This page explains what information KobyCode collects and why.</p>' +
    '<h4>What we collect</h4><ul><li><b>Inquiry form:</b> your name, email, business details and project description, so we can reply to you.</li><li><b>Sign-up:</b> your email address, used only to send you a login link.</li><li><b>Visit activity:</b> anonymous page views and button clicks (for example which plan was clicked), to understand how the site is used.</li></ul>' +
    '<h4>What we do not do</h4><ul><li>We do not sell your information.</li><li>We do not use advertising trackers.</li></ul>' +
    '<h4>Storage on your device</h4><p>Your browser stores your theme, currency and sign-in session so the site remembers your choices.</p>' +
    '<h4>Your choices</h4><p>You can ask us to delete your inquiry or account details at any time by contacting us. You can also stop visit tracking on this device:</p>' +
    '<p><label class="consent" style="margin-top:10px"><input type="checkbox" id="optOut"><span>Do not record my visits on this device</span></label></p>';
  var TERMS = '<p>These terms are a general summary. The written proposal for your project sets the exact details and takes priority if they differ.</p>' +
    '<h4>Scope and prices</h4><p>Prices on this website are starting prices. Your final quote depends on the agreed scope and is confirmed in your proposal.</p>' +
    '<h4>When work begins</h4><p>Work begins after the scope, price and payment terms have been agreed.</p>' +
    '<h4>Revisions and support</h4><p>Each package includes a defined number of revision rounds and a period of post-launch support. Work outside the agreed scope is quoted separately.</p>' +
    '<h4>Third-party costs</h4><p>Hosting, domain names, premium software licences and other third-party costs are not included unless your proposal says so.</p>' +
    '<h4>Ownership</h4><p>Once the final payment is made, you own your content and the finished design and code delivered to you. Third-party tools and licences keep their own terms.</p>' +
    '<h4>Care Plans</h4><p>Care Plans are optional monthly services with a defined allowance of changes. New features and substantial redesigns are not included unless your agreement says so.</p>';
  function openPrivacy() {
    openDlg('Privacy Policy', PRIVACY);
    var o = $('#optOut'); o.checked = noTrack();
    o.addEventListener('change', function () { try { if (o.checked) localStorage.setItem('kc-notrack', '1'); else localStorage.removeItem('kc-notrack'); } catch (e) {} });
  }

  /* ---------- Sign up (optional email login link) ---------- */
  function syncSign() { $$('.js-sign').forEach(function (b) { b.textContent = user ? 'Account' : 'Sign up'; }); if (user && !$('#f-email').value) $('#f-email').value = user.email || ''; }
  function openSign() {
    if (!sb) { openDlg('Sign up', '<p>Sign-up is not available right now. You can still send a project inquiry or message us on WhatsApp.</p>'); return; }
    if (user) {
      openDlg('Your account', '<p>Signed in as ' + esc(user.email) + '.</p><p style="margin-top:16px"><button class="btn ghost" type="button" id="soBtn">Sign out</button></p>');
      $('#soBtn').addEventListener('click', function () { sb.auth.signOut().then(closeDlg); });
      return;
    }
    openDlg('Sign up', '<p>Enter your email and we will send you a login link. No password needed.</p>' +
      '<div style="margin-top:14px"><label class="sr" for="suEmail">Email address</label><input id="suEmail" type="email" placeholder="you@example.com" autocomplete="email"></div>' +
      '<p style="margin-top:12px"><button class="btn block" type="button" id="suGo">Email me a login link</button></p><p class="note" id="suNote" role="status" aria-live="polite"></p>');
    $('#suGo').addEventListener('click', function () {
      var v = $('#suEmail').value.trim(), n = $('#suNote');
      if (!/^\S+@\S+\.\S+$/.test(v)) { n.textContent = 'Please enter a valid email address.'; return; }
      n.textContent = 'Sending...';
      sb.auth.signInWithOtp({ email: v, options: { emailRedirectTo: location.origin + location.pathname } }).then(function (r) {
        n.textContent = r.error ? 'Could not send the link. Please try again later.' : 'Check your inbox and tap the link to finish.';
        if (!r.error) track('signup_email');
      }, function () { n.textContent = 'Could not send the link. Please try again later.'; });
    });
  }
  $$('.js-sign').forEach(function (b) { b.addEventListener('click', function () { closeMenu(); openSign(); }); });
  if (sb) {
    try {
      sb.auth.getSession().then(function (r) { user = r.data && r.data.session ? r.data.session.user : null; syncSign(); }, function () {});
      sb.auth.onAuthStateChange(function (_e, s) { user = s ? s.user : null; syncSign(); });
    } catch (e) {}
  }

  /* ---------- Menu ---------- */
  var menuBtn = $('#menuBtn'), menu = $('#menu');
  function closeMenu() { menu.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.setAttribute('aria-label', 'Open menu'); }
  menuBtn.addEventListener('click', function () {
    var o = !menu.classList.contains('open');
    menu.classList.toggle('open', o); menuBtn.setAttribute('aria-expanded', String(o)); menuBtn.setAttribute('aria-label', o ? 'Close menu' : 'Open menu');
  });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', function () { if (window.innerWidth >= 1120) closeMenu(); });

  /* ---------- Inquiry form ---------- */
  var form = $('#inqForm');
  function openInquiry(o) {
    o = o || {};
    if (!document.getElementById('inquiry')) { location.href = 'contact.html?' + (o.service ? 'service=' + encodeURIComponent(o.service) : '') + (o.pkg ? '&pkg=' + encodeURIComponent(o.pkg) : '') + '#inquiry'; return; }
    if (o.service) $('#f-service').value = o.service;
    if (o.pkg) $('#f-package').value = o.pkg;
    $('#inquiry').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion:reduce)').matches ? 'auto' : 'smooth' });
    setTimeout(function () { var first = !$('#f-name').value ? $('#f-name') : $('#f-message'); try { first.focus({ preventScroll: true }); } catch (e) { first.focus(); } }, 450);
  }
  function packageNameFor(id) { var p = C.packages.filter(function (x) { return x.id === id; })[0]; return p ? p.name : ''; }
  function careNameFor(id) { var p = C.care.filter(function (x) { return x.id === id; })[0]; return p ? p.name + ' (monthly)' : ''; }
  function clearErrors() { $$('.err', form).forEach(function (e) { e.textContent = ''; }); $$('[aria-invalid]', form).forEach(function (e) { e.removeAttribute('aria-invalid'); }); $('#formMsg').textContent = ''; $('#formMsg').className = 'form-msg'; }
  function showErrors(errs) {
    var first = null;
    Object.keys(errs).forEach(function (k) {
      var id = k === 'consent' ? 'f-consent' : 'f-' + k, el = $('#' + id);
      $('#e-' + k).textContent = errs[k]; el.setAttribute('aria-invalid', 'true'); if (!first) first = el;
    });
    if (first) first.focus();
  }
  function fv(n) { return form.elements[n].value.trim(); }
  function waSummary() {
    var lines = ['Hi KobyCode, I want to start a project.'];
    if (fv('name')) lines.push('Name: ' + fv('name'));
    if (fv('business')) lines.push('Business: ' + fv('business'));
    if (fv('service')) lines.push('Service: ' + fv('service'));
    if (fv('package')) lines.push('Package: ' + fv('package'));
    if (fv('budget')) lines.push('Budget: ' + fv('budget') + ' (' + fv('currency') + ')');
    if (fv('deadline')) lines.push('Timeline: ' + fv('deadline'));
    if (fv('message')) lines.push('Details: ' + fv('message'));
    return lines.join('\n');
  }
  $('#waForm').addEventListener('click', function () { track('whatsapp_click', 'form'); window.open(waLink(waSummary()), '_blank', 'noopener'); });
  function showSuccess(row) {
    var name = row ? row.name : fv('name');
    $('#formcard').innerHTML = '<div class="success"><div class="tick">' + ic('check') + '</div><h3>Thank you, <span id="okName"></span>.</h3><p>Your inquiry has been saved. I will review it and reply to <b id="okMail"></b> with questions or a proposal. No work starts until we have agreed the scope, price and payment terms.</p><p style="margin-top:20px"><button class="btn ghost" type="button" id="again">Send another inquiry</button></p></div>';
    $('#okName').textContent = name.split(' ')[0]; $('#okMail').textContent = row ? row.email : fv('email');
    $('#again').addEventListener('click', function () { location.hash = ''; location.reload(); });
    $('#formcard').scrollIntoView({ block: 'center' });
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault(); clearErrors();
    var errs = {};
    if (fv('name').length < 2) errs.name = 'Please enter your full name.';
    if (!/^\S+@\S+\.\S+$/.test(fv('email'))) errs.email = 'Please enter a valid email address, for example name@example.com.';
    if (!fv('service')) errs.service = 'Please choose the service you need.';
    if (fv('message').length < 10) errs.message = 'Please describe your project in at least 10 characters.';
    if (!form.elements.consent.checked) errs.consent = 'Please tick this box so we can store your details and reply.';
    if (Object.keys(errs).length) { showErrors(errs); return; }
    if (form.elements.website.value) { showSuccess(null); return; }
    var btn = $('#sendBtn'); btn.disabled = true; btn.textContent = 'Sending...';
    var row = { name: fv('name'), email: fv('email'), business: fv('business') || null, business_type: fv('type') || null, service: fv('service'), package: fv('package') || null, currency: fv('currency'), budget: fv('budget') || null, deadline: fv('deadline') || null, message: fv('message'), consent: true };
    function fail() {
      btn.disabled = false; btn.textContent = 'Send inquiry';
      var m = $('#formMsg'); m.className = 'form-msg bad';
      m.textContent = 'Sorry, your inquiry could not be sent. Please try again in a moment, or use the WhatsApp button to reach us directly.';
    }
    if (!sb) { fail(); return; }
    var req;
    try { req = sb.from('inquiries').insert(row); } catch (err) { fail(); return; }
    req.then(function (r) { if (r && r.error) { fail(); } else { track('inquiry_sent', row.package || row.service); showSuccess(row); } }, fail);
  });

  /* ---------- Global click handling ---------- */
  document.addEventListener('click', function (e) {
    var t;
    if ((t = e.target.closest('[data-pkg]'))) { var id = t.getAttribute('data-pkg'); track('plan_click', id); openInquiry({ pkg: id === 'custom' ? '' : packageNameFor(id), service: 'Business Website Development' }); return; }
    if ((t = e.target.closest('[data-care]'))) { var cid = t.getAttribute('data-care'); track('care_click', cid); openInquiry({ pkg: careNameFor(cid), service: 'Website Maintenance' }); return; }
    if ((t = e.target.closest('[data-addon]'))) { track('addon_click', 'ai'); openInquiry({ pkg: C.addon.name + ' add-on', service: 'AI Chat Assistant' }); return; }
    if ((t = e.target.closest('[data-demo]'))) { track('addon_demo', 'ai'); return; }
    if ((t = e.target.closest('[data-service]'))) { track('service_click', t.getAttribute('data-service')); openInquiry({ service: t.getAttribute('data-service') }); return; }
    if ((t = e.target.closest('[data-start-from]'))) { closeDlg(); openInquiry({ service: t.getAttribute('data-start-from') }); return; }
    if ((t = e.target.closest('[data-project]'))) { track('project_view', t.getAttribute('data-project')); projectDialog(t.getAttribute('data-project')); return; }
    if ((t = e.target.closest('[data-open]'))) { var w = t.getAttribute('data-open'); if (w === 'privacy') openPrivacy(); else openDlg('Terms of Service', TERMS); return; }
    if ((t = e.target.closest('[data-wa]'))) { track('whatsapp_click', 'contact'); }
  });

  /* ---------- Init ---------- */
  (function () { var q = new URLSearchParams(location.search); if (document.getElementById('inquiry') && (q.get('service') || q.get('pkg'))) { if (q.get('service')) $('#f-service').value = q.get('service'); if (q.get('pkg')) $('#f-package').value = q.get('pkg'); } })();
  renderCurrencyControls(); renderPlans(); renderBudget(); renderProjects();
  document.addEventListener('visibilitychange', function () { html.classList.toggle('paused', document.hidden); });
  track('page_view');
})();
