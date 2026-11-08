
(function(){
  var P=window.PHOTOS||{},album=document.getElementById('album'),tabs=document.querySelectorAll('.tab'),PAGE=30;
  var lb=document.getElementById('lb'),lbImg=document.getElementById('lbImg'),lbCount=document.getElementById('lbCount'),cur=null,idx=0,lastFocus=null;
  tabs.forEach(function(t){var a=P[t.dataset.album];t.querySelector('b').textContent=a?a.items.length:0;t.addEventListener('click',function(){show(t.dataset.album)})});
  function show(key){
    tabs.forEach(function(t){t.setAttribute('aria-selected',t.dataset.album===key)});
    var a=P[key];album.setAttribute('aria-labelledby','tab-'+key);album.innerHTML='';
    if(!a||!a.items.length){
      album.innerHTML='<div class="empty"><div class="eyebrow">Coming together</div><h3>Share your photos</h3><p>Old portraits, reunion snapshots, pictures of Collins. Send them in and they will be added to this album, credited to your branch of the family.</p></div>';
      return;
    }
    var head=document.createElement('div');head.className='album-head';
    head.innerHTML='<h3>'+a.title+'</h3><p>'+a.items.length+' photos'+(key==='family'?' · shared by family members':'')+'</p>';album.appendChild(head);
    var g=document.createElement('div');g.className='gallery';album.appendChild(g);
    var shown=0,btn=document.createElement('button');btn.type='button';btn.className='more';
    function add(){
      var end=Math.min(shown+PAGE,a.items.length);
      for(var i=shown;i<end;i++){(function(i){
        var it=a.items[i],ln=document.createElement('a');
        ln.href=a.base+'full/'+it[0];ln.style.setProperty('--r',(it[1]/it[2]).toFixed(3));
        ln.setAttribute('aria-label','Open photo '+(i+1)+' of '+a.items.length);
        var im=new Image();im.loading='lazy';im.decoding='async';im.alt='';im.width=it[1];im.height=it[2];
        if(it[3]){im.alt=it[3];ln.title=it[3];ln.setAttribute('aria-label',it[3])}
        im.onload=function(){im.classList.add('ok')};im.src=a.base+'thumb/'+it[0];if(im.complete)im.classList.add('ok');
        ln.appendChild(im);if(it[3]){var c=document.createElement('span');c.className='cap';c.textContent=it[3];ln.appendChild(c)}ln.addEventListener('click',function(e){e.preventDefault();open(key,i)});g.appendChild(ln);
      })(i)}
      shown=end;
      if(shown<a.items.length){btn.textContent='Show more · '+(a.items.length-shown)+' left';if(!btn.parentNode)album.appendChild(btn)}else if(btn.parentNode)btn.remove();
    }
    btn.addEventListener('click',add);add();
  }
  function render(){var a=P[cur],it=a.items[idx];lbImg.src=a.base+'full/'+it[0];lbImg.alt=it[3]||(a.title+', photo '+(idx+1));document.getElementById('lbCap').textContent=it[3]||'';lbCount.textContent=a.title+'  ·  '+(idx+1)+' / '+a.items.length;
    [idx-1,idx+1].forEach(function(j){if(j>=0&&j<a.items.length){var pre=new Image();pre.src=a.base+'full/'+a.items[j][0]}})}
  function open(key,i){cur=key;idx=i;lastFocus=document.activeElement;render();lb.classList.add('open');document.documentElement.classList.add('lb-open');document.getElementById('lbClose').focus()}
  function close(){lb.classList.remove('open');document.documentElement.classList.remove('lb-open');lbImg.removeAttribute('src');if(lastFocus)lastFocus.focus()}
  function step(d){var n=P[cur].items.length;idx=(idx+d+n)%n;render()}
  document.getElementById('lbClose').addEventListener('click',close);
  document.getElementById('lbPrev').addEventListener('click',function(){step(-1)});
  document.getElementById('lbNext').addEventListener('click',function(){step(1)});
  lb.addEventListener('click',function(e){if(e.target===lb||e.target.tagName==='FIGURE')close()});
  document.addEventListener('keydown',function(e){if(!lb.classList.contains('open'))return;if(e.key==='Escape')close();else if(e.key==='ArrowLeft')step(-1);else if(e.key==='ArrowRight')step(1)});
  var x0=null;lb.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
  lb.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>50)step(dx<0?1:-1);x0=null},{passive:true});
  show('reunion-2022');
})();
