// ===== SETTINGS: this is the ONLY block you need to edit =====
const CFG={
  // Where every form (pricing, project, query, newsletter) is emailed
  EMAIL:'solutionsregency@gmail.com',

  // Web3Forms access key (get it free at web3forms.com by entering the email above).
  // Paste the key between the quotes. Forms will not send until this is filled in.
  W3F_KEY:'c7e2df2d-b0dd-4d34-8613-6ba4071b600f',

  // Pricing plan link sent automatically to people who request it
  PRICING_LINK:'https://docs.google.com/spreadsheets/d/17-SE8PkBFHeSOMUbBgiDSOhedtjJi9IVKX0sz-ng4Oc/edit?usp=sharing',

  // OPTIONAL but recommended: reliable automatic reply to the visitor (see README, "EmailJS").
  // Leave '' until you have set it up; the site still works without it.
  EMAILJS:{SERVICE_ID:'',TEMPLATE_ID:'',PUBLIC_KEY:''},

  // WhatsApp: country code + number, digits only (0714598269 becomes 254714598269)
  WHATSAPP:'254714598269',
  WHATSAPP_SHOWN:'+254 714 598269',

  // SOCIAL ICONS (top of every page): paste the full web address of each page between the quotes.
  // Leave '' for any you don't have yet; that icon just won't open anything.
  SOCIAL:{
    Facebook:'',
    X:'',
    LinkedIn:'',
    Instagram:'https://www.instagram.com/game_dripper/'   // test account, replace later
  }
};
document.querySelectorAll('[data-wa]').forEach(a=>{a.href='https://wa.me/'+CFG.WHATSAPP;a.textContent=CFG.WHATSAPP_SHOWN;a.target='_blank';a.rel='noopener noreferrer'});
// ===== Social icons =====
document.querySelectorAll('.socials a').forEach(a=>{const u=CFG.SOCIAL[a.getAttribute('aria-label')];
 if(u){a.href=u;a.target='_blank';a.rel='noopener noreferrer'}else a.addEventListener('click',e=>e.preventDefault())});
// ===== Pricing popup =====
const m=document.getElementById('m');
document.addEventListener('click',e=>{const a=e.target.closest('.pl');if(a){e.preventDefault();m.querySelector('[name=service]').value=a.dataset.service;m.classList.add('open')}
if(e.target.matches('.x')||e.target===m)m.classList.remove('open')});
// ===== Forms: send to company email (via Web3Forms) =====
const hasLink=!CFG.PRICING_LINK.startsWith('PASTE'),EJ=CFG.EMAILJS,useEJ=EJ.SERVICE_ID&&EJ.TEMPLATE_ID&&EJ.PUBLIC_KEY;
document.querySelectorAll('.rf').forEach(f=>f.addEventListener('submit',async e=>{e.preventDefault();
 const d=Object.fromEntries(new FormData(f));if(d._honey)return;delete d._honey;
 const k=f.dataset.kind,reply=f.dataset.reply,box=f.querySelector('.msg'),btn=f.querySelector('button.btn');
 const subject=k=='news'?'New newsletter subscriber':reply?`Pricing plan request: ${d.service}`:k=='query'?'New website query':`New project enquiry: ${d.service}`;
 btn.disabled=true;box.textContent='Sending...';let msg='';
 try{
  if(!CFG.W3F_KEY||CFG.W3F_KEY.startsWith('PASTE')){msg='The form is not set up yet (missing access key).';throw 0}
  const r=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},
   body:JSON.stringify({...d,access_key:CFG.W3F_KEY,subject:subject,from_name:'Regency Solutions Website',page:location.href})});
  const j=await r.json().catch(()=>({}));
  if(!r.ok||j.success!==true){msg=j.message||('HTTP '+r.status);throw 0}
  if(reply&&useEJ){try{await fetch('https://api.emailjs.com/api/v1.0/email/send',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({service_id:EJ.SERVICE_ID,template_id:EJ.TEMPLATE_ID,user_id:EJ.PUBLIC_KEY,template_params:{name:d.name,email:d.email,service:d.service,pricing_link:CFG.PRICING_LINK}})})}catch(_){}}
  if(reply){const lk=hasLink?`<a class="btn" style="margin-top:8px" href="${CFG.PRICING_LINK}" target="_blank" rel="noopener">Open the pricing plan &rarr;</a>`:'';
   if(useEJ){box.innerHTML='Thank you! The plan is also on its way to <b></b> (check Spam too).<br>'+lk;box.querySelector('b').textContent=d.email}
   else box.innerHTML='Thank you! Your pricing plan is ready.<br>'+lk}
  else box.textContent=k=='news'?'Subscribed. Thank you!':'Thank you. We will be in touch shortly.';
  f.reset()}
 catch(x){console.error('Form error:',x,msg);if(!msg&&x&&x.message)msg=x.message;
  box.textContent=location.protocol==='file:'?'Forms cannot send when the page is opened as a file on your computer. Open it with Live Server or from the online address.':(msg?'Not sent: '+msg:'Something went wrong. Please try again or email '+CFG.EMAIL)}
 btn.disabled=false}));
// ===== Mobile menu =====
const nv=document.querySelector('.nav'),bg=document.querySelector('.burger'),mob=()=>matchMedia('(max-width:760px)').matches;
bg.addEventListener('click',()=>{const o=nv.classList.toggle('open');bg.setAttribute('aria-expanded',o)});
document.querySelectorAll('.dd>a').forEach(a=>a.addEventListener('click',e=>{if(mob()){e.preventDefault();a.parentElement.classList.toggle('open')}}));
document.querySelectorAll('.dm a,.nav nav>a').forEach(a=>a.addEventListener('click',()=>nv.classList.remove('open')));
