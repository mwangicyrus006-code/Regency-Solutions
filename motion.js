(()=>{const rm=matchMedia('(prefers-reduced-motion:reduce)').matches,hd=document.querySelector('header'),de=document.documentElement;
const pb=document.createElement('div');pb.id='pb';document.body.appendChild(pb);
const on=()=>{const y=scrollY,h=de.scrollHeight-innerHeight;pb.style.width=(h>0?y/h*100:0)+'%';if(hd)hd.classList.toggle('sc',y>20);if(!rm)de.style.setProperty('--py',(50+Math.min(y,700)/700*15)+'%')};
addEventListener('scroll',on,{passive:true});on();
if(rm||!('IntersectionObserver' in window))return;
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.sp h2,.sp .lead,.two>div>p,.two>img,.card,.tile,details,.cd li,.cta,.steps').forEach(el=>{
 const sib=[...el.parentElement.children].filter(c=>c.matches('.card,.tile,details,li')),i=sib.indexOf(el);
 if(i>0)el.style.setProperty('--d',Math.min(i,6)*80+'ms');
 el.classList.add('rv');io.observe(el);
 if(el.matches('.card,.tile,details,.cd li'))el.addEventListener('transitionend',()=>{el.classList.remove('rv','in');el.style.removeProperty('--d')},{once:true})});
})();

// ===== v5 extras =====
(()=>{const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
// rotating hero word
const rot=document.getElementById('rot');
if(rot&&!rm){const w=['Careers','Research','Grants','Speeches'];let i=0;setInterval(()=>{rot.classList.add('out');setTimeout(()=>{i=(i+1)%w.length;rot.textContent=w[i];rot.classList.remove('out')},350)},2400)}
// process timeline fills on scroll
const tl=document.getElementById('tl');
if(tl){const li=[...tl.children],upd=()=>{const r=tl.getBoundingClientRect(),p=rm?1:Math.max(0,Math.min(1,(innerHeight*.85-r.top)/(innerHeight*(innerWidth<760?.75:.5))));tl.style.setProperty('--p',p);li.forEach((el,n)=>el.classList.toggle('on',p>=(n+.3)/li.length))};addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);upd()}
// floating WhatsApp + back to top
const num=(typeof CFG!=='undefined'&&CFG.WHATSAPP)||'254714598269';
const wa=document.createElement('a');wa.className='wa';wa.href='https://wa.me/'+num;wa.target='_blank';wa.rel='noopener noreferrer';wa.setAttribute('aria-label','Chat with us on WhatsApp');
wa.innerHTML='<svg viewBox="0 0 24 24"><path fill="#fff" d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2z"/><g transform="translate(6.2 6.2) scale(.5)"><path fill="#25d366" d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11 11 0 0 0 3.6.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.2 2.4.6 3.6a1 1 0 0 1-.25 1z"/></g></svg><span>Chat on WhatsApp</span>';
document.body.appendChild(wa);
const tt=document.createElement('button');tt.className='tt';tt.setAttribute('aria-label','Back to top');tt.innerHTML='&uarr;';
tt.onclick=()=>scrollTo({top:0,behavior:rm?'auto':'smooth'});document.body.appendChild(tt);
addEventListener('scroll',()=>tt.classList.toggle('show',scrollY>500),{passive:true});
// FAQ search
const fq=document.getElementById('fq');
if(fq){const ds=[...document.querySelectorAll('#faqs ~ details')],fn=document.getElementById('fn');
fq.addEventListener('input',()=>{const q=fq.value.trim().toLowerCase();let n=0;ds.forEach(d=>{const m=!q||d.textContent.toLowerCase().includes(q);d.hidden=!m;if(m)n++;d.open=!!q&&m});fn.hidden=n>0})}
})();
