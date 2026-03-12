// LANG
function setLang(l){
  document.documentElement.setAttribute('data-lang',l);
  document.querySelectorAll('.lang-btn').forEach((b,i)=>{
    b.classList.toggle('active',(i===0&&l==='ru')||(i===1&&l==='en'));
  });
}

// NAV scroll
window.addEventListener('scroll',()=>{
  document.getElementById('nav').classList.toggle('scrolled',window.scrollY>30);
});

// Reveal
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

// Form
function submitForm(){
  const name=document.getElementById('f_name').value.trim();
  const phone=document.getElementById('f_phone').value.trim();
  const lang=document.documentElement.getAttribute('data-lang');
  if(!name||!phone){
    showToast(lang==='ru'?'Заполните имя и телефон':'Please fill in name and phone',false);
    return;
  }
  const btn=document.querySelector('.fsub');
  btn.style.opacity='.7';btn.disabled=true;
  setTimeout(()=>{
    btn.style.opacity='1';btn.disabled=false;
    showToast(lang==='ru'?'Заявка принята! Перезвоним в течение 30 минут.':'Request received! We will call you back within 30 minutes.');
    ['f_name','f_phone','f_note'].forEach(id=>document.getElementById(id).value='');
  },1200);
}

function showToast(msg,ok=true){
  document.getElementById('toastMsg').textContent=msg;
  const t=document.getElementById('toast');
  t.style.borderColor=ok?'var(--pink)':'#e05';
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),5000);
}

function toggleMenu(){
  const nl=document.querySelector('.nav-links');
  const open=nl.style.display==='flex';
  nl.style.display=open?'none':'flex';
  if(!open){nl.style.cssText='display:flex;flex-direction:column;position:absolute;top:68px;left:0;right:0;background:rgba(12,12,15,.98);border-bottom:1px solid var(--border2);padding:1.5rem 5%;gap:1.25rem;z-index:99;backdrop-filter:blur(20px)';}
}
