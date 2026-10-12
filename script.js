// ===== SETTINGS: edit this block only =====
const CFG={
  EMAIL:'solutionsregency@gmail.com',
  PRICING_LINK:'PASTE_PRICING_PDF_LINK_HERE',   // link to your pricing plan (PDF or page)
  SOCIAL:{Facebook:'',X:'',LinkedIn:'',Instagram:''}  // paste your page links, e.g. 'https://www.linkedin.com/company/...'
};
// ===== Social icons =====
document.querySelectorAll('.socials a').forEach(a=>{const u=CFG.SOCIAL[a.getAttribute('aria-label')];
 if(u){a.href=u;a.target='_blank';a.rel='noopener noreferrer'}else a.addEventListener('click',e=>e.preventDefault())});
// ===== Pricing popup =====
const m=document.getElementById('m');
document.addEventListener('click',e=>{const a=e.target.closest('.pl');if(a){e.preventDefault();m.querySelector('[name=service]').value=a.dataset.service;m.classList.add('open')}
if(e.target.matches('.x')||e.target===m)m.classList.remove('open')});
// ===== Forms: send to company email =====
const hasLink=!CFG.PRICING_LINK.startsWith('PASTE');
document.querySelectorAll('.rf').forEach(f=>f.addEventListener('submit',async e=>{e.preventDefault();
 const d=Object.fromEntries(new FormData(f));if(d._honey)return;delete d._honey;
 const k=f.dataset.kind,reply=f.dataset.reply,box=f.querySelector('.msg'),btn=f.querySelector('button.btn');
 const subject=k=='news'?'New newsletter subscriber':reply?`Pricing plan request: ${d.service}`:k=='query'?'New website query':`New project enquiry: ${d.service}`;
 const hi=`Hi${d.name?' '+d.name:''}, `;
 const auto=reply?hi+`thank you for your interest in ${d.service}. `+(hasLink?`Here is our pricing plan: ${CFG.PRICING_LINK}`:'Our team will send you the pricing plan shortly.')+'\n\nRegency Solutions':k=='news'?hi+'thank you for subscribing to the Regency Solutions newsletter.\n\nRegency Solutions':hi+'thank you for contacting Regency Solutions. We have received your message and will reply shortly.\n\nRegency Solutions';
 const body={...d,page:location.href,_subject:subject,_template:'table',_captcha:'false',_autoresponse:auto};
 btn.disabled=true;box.textContent='Sending...';
 try{const r=await fetch('https://formsubmit.co/ajax/'+CFG.EMAIL,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(body)});
  const j=await r.json();if(!r.ok||j.success===false||j.success==='false')throw 0;
  box.textContent=reply?'Done. Check your inbox for the pricing plan.':k=='news'?'Subscribed. Thank you!':'Thank you. We will be in touch shortly.';f.reset();
  if(reply)setTimeout(()=>m.classList.remove('open'),2500)}
 catch(x){box.textContent='Something went wrong. Please try again or email '+CFG.EMAIL}
 btn.disabled=false}));

// ===== Mobile menu =====
const nv=document.querySelector('.nav'),bg=document.querySelector('.burger'),mob=()=>matchMedia('(max-width:760px)').matches;
bg.addEventListener('click',()=>{const o=nv.classList.toggle('open');bg.setAttribute('aria-expanded',o)});
document.querySelectorAll('.dd>a').forEach(a=>a.addEventListener('click',e=>{if(mob()){e.preventDefault();a.parentElement.classList.toggle('open')}}));
document.querySelectorAll('.dm a,.nav nav>a').forEach(a=>a.addEventListener('click',()=>nv.classList.remove('open')));
