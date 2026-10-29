const SB_URL='https://oxszyzakrwnjcfmodpze.supabase.co',SB_KEY='sb_publishable_uGos98sQOnJWEzcd_EAzAQ_gOGcTOs9';
const sb=window.supabase.createClient(SB_URL,SB_KEY);
const html=document.documentElement,$=id=>document.getElementById(id);
/* theme */
function setTheme(t){html.dataset.theme=t;try{localStorage.setItem('kc-theme',t)}catch(e){}const b=$('th');if(b)b.textContent=t==='dark'?'☀️':'🌙'}
setTheme(html.dataset.theme||'light');
if($('th'))$('th').onclick=()=>setTheme(html.dataset.theme==='dark'?'light':'dark');
/* tracking */
const page=location.pathname.split('/').pop()||'index.html';
const log=(type,detail)=>{try{sb.from('site_events').insert({type,path:page,detail:detail||null}).then(()=>{})}catch(e){}};
if(page!=='admin.html')log('page_view');
document.addEventListener('click',e=>{const a=e.target.closest('[data-wa],[data-tier],[data-care],#send');if(!a)return;log(a.dataset.care?'care_click':a.dataset.tier?'plan_click':a.id==='send'?'form_send':'whatsapp_click',a.dataset.care||a.dataset.tier||null)});
/* intro: wordmark types in, then fades into the homepage (once per visit) */
const rm=()=>html.classList.remove('kc-pre');setTimeout(rm,3500);
(function(){
 const isHome=/(^|\/)(index\.html)?$/.test(location.pathname);
 const back=/access_token|[?&]code=/.test(location.hash+location.search);
 try{if(!isHome||back||sessionStorage.getItem('kc-intro'))return rm()}catch(e){}
 try{sessionStorage.setItem('kc-intro','1')}catch(e){}
 const o=document.createElement('div');o.className='kc-ov';
 o.innerHTML=`<div class="kc-tw"><img class="wm-dark" src="kobycode-wordmark-dark.png" alt="KobyCode"><img class="wm-white" src="kobycode-wordmark-white.png" alt="KobyCode"></div>`;
 document.body.appendChild(o);rm();
 const close=()=>{o.classList.add('out');setTimeout(()=>o.remove(),600)};
 setTimeout(()=>o.classList.add('done'),1900);setTimeout(close,2700);o.onclick=close;
})();
/* sign up: header button + popup before choosing a plan */
if(page!=='admin.html'){
 let user=null;
 const getPend=()=>{try{const p=JSON.parse(localStorage.getItem('kc-pending'));return p&&typeof p.href==='string'&&p.href.startsWith('https://wa.me/')?p:null}catch(e){return null}};
 const setPend=p=>{try{p?localStorage.setItem('kc-pending',JSON.stringify(p)):localStorage.removeItem('kc-pending')}catch(e){}};
 const syncBtn=()=>{const b=$('su');if(!b)return;b.textContent=user?'Sign out':'Sign up';b.classList.toggle('out',!!user)};
 const closeModal=()=>{const m=$('kcm');if(m)m.remove()};
 function showBanner(){
  const p=getPend();if(!user||!p||$('kcb'))return;
  const b=document.createElement('div');b.id='kcb';b.className='kc-bn';
  b.innerHTML=`<span>You're signed in. Continue with <b></b>.</span><a class="btn" target="_blank" rel="noopener">Continue to WhatsApp</a><button class="kc-x" aria-label="Dismiss">✕</button>`;
  b.querySelector('b').textContent=p.label||'your plan';
  const a=b.querySelector('a');a.href=p.href;
  a.onclick=()=>{setPend(null);setTimeout(()=>b.remove(),300)};
  b.querySelector('.kc-x').onclick=()=>{setPend(null);b.remove()};
  document.body.appendChild(b);
 }
 function openModal(p){
  if($('kcm'))return;
  const m=document.createElement('div');m.id='kcm';m.className='kc-md';
  m.innerHTML=`<div class="kc-mc"><button class="kc-x" id="kx" aria-label="Close">✕</button>
  <h2>${p?'Sign up to choose your plan':'Sign up'}</h2>
  <p class="mut">Enter your email and we'll send you a login link. No password needed.</p>
  <input id="me" type="email" placeholder="Enter your email" autocomplete="email">
  <button class="kc-em" id="mb">Email me a login link</button>
  <p class="kc-note" id="mn"></p>${p?'<a class="kc-sk" id="ms" target="_blank" rel="noopener">Not now, chat on WhatsApp instead</a>':''}</div>`;
  document.body.appendChild(m);
  m.onclick=e=>{if(e.target===m)closeModal()};
  $('kx').onclick=closeModal;
  if(p){const s=$('ms');s.href=p.href;s.onclick=closeModal}
  $('mb').onclick=async()=>{
   const v=$('me').value.trim();
   if(!/\S+@\S+\.\S+/.test(v))return $('mn').textContent='Enter a valid email.';
   if(p)setPend(p);
   $('mn').textContent='Sending...';
   const{error}=await sb.auth.signInWithOtp({email:v,options:{emailRedirectTo:location.origin+location.pathname}});
   if(error)return $('mn').textContent='Could not send. Try again.';
   log('signup_email');
   $('mn').textContent='Check your inbox and tap the link. You will come back here.';
  };
 }
 sb.auth.getSession().then(({data})=>{user=data.session?data.session.user:null;syncBtn();showBanner()});
 sb.auth.onAuthStateChange((_e,s)=>{user=s?s.user:null;syncBtn();if(user){closeModal();showBanner()}});
 if($('su'))$('su').onclick=async()=>{if(user)await sb.auth.signOut();else openModal(null)};
 document.addEventListener('click',e=>{
  const a=e.target.closest('[data-tier],[data-care]');if(!a||user)return;
  e.preventDefault();e.stopPropagation();
  const label=a.dataset.care||a.dataset.tier;log('signup_prompt',label);openModal({href:a.href,label});
 },true);
}
