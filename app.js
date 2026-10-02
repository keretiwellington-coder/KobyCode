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
/* intro + login (home page, once per visit, skippable) */
const rm=()=>html.classList.remove('kc-pre');setTimeout(rm,3500);
(async()=>{
 if(page!=='index.html')return rm();
 try{if(sessionStorage.getItem('kc-intro'))return rm();const s=(await sb.auth.getSession()).data.session;if(s)return rm()}catch(e){}
 const back=location.origin+location.pathname,seen=()=>{try{sessionStorage.setItem('kc-intro','1')}catch(e){}};
 const o=document.createElement('div');o.className='kc-ov';
 o.innerHTML=`<div class="kc-tw"><img class="wm-dark" src="kobycode-wordmark-dark.png" alt="KobyCode"><img class="wm-white" src="kobycode-wordmark-white.png" alt="KobyCode"></div>
 <div class="kc-box"><button class="kc-g" id="kg">Continue with Google</button><div class="kc-or">or</div>
 <input id="ke" type="email" placeholder="Enter your email" autocomplete="email"><button class="kc-em" id="kb">Email me a login link</button>
 <p class="kc-note" id="kn"></p><button class="kc-skip" id="ks">Continue as guest</button></div>`;
 document.body.appendChild(o);rm();
 setTimeout(()=>o.classList.add('done'),1900);setTimeout(()=>o.classList.add('up'),2200);
 const close=()=>{seen();o.classList.add('out');setTimeout(()=>o.remove(),600)};
 $('ks').onclick=close;
 $('kg').onclick=()=>{seen();sb.auth.signInWithOAuth({provider:'google',options:{redirectTo:back}})};
 $('kb').onclick=async()=>{const v=$('ke').value.trim();if(!/\S+@\S+\.\S+/.test(v))return $('kn').textContent='Enter a valid email.';
  $('kn').textContent='Sending...';const{error}=await sb.auth.signInWithOtp({email:v,options:{emailRedirectTo:back}});
  $('kn').textContent=error?'Could not send. Try again.':'Check your inbox for the login link.';if(!error)seen()};
})();
