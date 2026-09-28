const WA='2347011780057'; // WhatsApp number, country code first
const link=t=>'https://wa.me/'+WA+(t?'?text='+encodeURIComponent(t):'');
document.querySelectorAll('[data-wa]').forEach(a=>a.href=link('Hi KobyCode, I want a website for my business.'));
document.querySelectorAll('[data-tier]').forEach(a=>a.href=link('Hi KobyCode, I want the '+a.dataset.tier+' package.'));
const send=document.getElementById('send');
if(send)send.onclick=()=>{const v=id=>document.getElementById(id).value.trim();
 open(link(`Hi KobyCode, I want a website.\nBusiness: ${v('bn')}\nType: ${v('bt')}\nIdea: ${v('bi')}`),'_blank')};
