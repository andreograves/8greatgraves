(function(){
  var root=document.documentElement,sp=document.getElementById('splash'),enter=document.getElementById('enter'),done=false,timer=null;
  function showSplash(){
    if(!sp||!enter)return;
    done=false;clearTimeout(timer);sp.hidden=false;sp.classList.remove('leaving');root.classList.add('splash-on');
    enter.focus({preventScroll:true});
  }
  function finish(){
    clearTimeout(timer);root.classList.remove('splash-on');sp.hidden=true;sp.classList.remove('leaving');
    window.scrollTo(0,0);var top=document.getElementById('top');if(top)top.focus({preventScroll:true});
  }
  function go(){
    if(done||!root.classList.contains('splash-on'))return;
    done=true;
    if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches){finish();return}
    sp.classList.add('leaving');timer=setTimeout(finish,1300);
  }
  if(sp&&enter){
    showSplash();
    enter.addEventListener('click',go);
    sp.addEventListener('transitionend',function(e){if(done&&e.target===sp&&e.propertyName==='transform')finish()});
    document.addEventListener('keydown',function(e){
      if(!root.classList.contains('splash-on')||done)return;
      if(e.key==='Enter'||e.key===' '||e.key==='Escape'){e.preventDefault();go()}
      else if(e.key==='Tab'){e.preventDefault();enter.focus({preventScroll:true})}
    });
    window.addEventListener('pageshow',function(e){if(e.persisted)showSplash()});
  }
  var nav=document.getElementById('nav'),btn=document.getElementById('menuBtn');
  function onScroll(){nav.classList.toggle('scrolled',window.scrollY>40)}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  btn.addEventListener('click',function(){var o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o)});
  document.querySelectorAll('#menu a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open');btn.setAttribute('aria-expanded','false')})});
  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
    els.forEach(function(el){io.observe(el)});
  }else{els.forEach(function(el){el.classList.add('in')})}
})();
