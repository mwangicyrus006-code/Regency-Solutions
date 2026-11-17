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
