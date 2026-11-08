(function(){
  var root=document.documentElement,sp=document.getElementById('splash'),enter=document.getElementById('enter'),done=false;
  if(sp&&root.classList.contains('splash-on')){
    var still=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
    enter.focus({preventScroll:true});
    var finish=function(){root.classList.remove('splash-on');sp.hidden=true;window.scrollTo(0,0);document.getElementById('top').focus({preventScroll:true})};
    var go=function(){
      if(done)return;done=true;
      try{sessionStorage.setItem('8gg-splash','1')}catch(e){}
      if(still){finish();return}
      sp.classList.add('leaving');
      var t=setTimeout(finish,1300);
      sp.addEventListener('transitionend',function(){clearTimeout(t);finish()},{once:true});
    };
    enter.addEventListener('click',go);
    document.addEventListener('keydown',function(e){if(!done&&/^(Enter| |Escape|ArrowDown|PageDown)$/.test(e.key)){e.preventDefault();go()}});
    sp.addEventListener('wheel',function(e){if(e.deltaY>20)go()},{passive:true});
    var y0=null;
    sp.addEventListener('touchstart',function(e){y0=e.touches[0].clientY},{passive:true});
    sp.addEventListener('touchmove',function(e){if(y0!==null&&y0-e.touches[0].clientY>40)go()},{passive:true});
  }else if(sp){sp.hidden=true}
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
