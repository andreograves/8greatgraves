(function(){
  'use strict';
  var album=document.getElementById('album');
  if(!album)return;
  var items=[];
  Object.values(window.PHOTOS||{}).forEach(function(a){
    a.items.forEach(function(it){items.push({full:a.base+'full/'+it[0],thumb:a.base+'thumb/'+it[0],width:it[1],height:it[2],caption:it[3]||''})});
  });
  for(var i=items.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),tmp=items[i];items[i]=items[j];items[j]=tmp}
  var gallery=document.createElement('div');gallery.className='gallery unified-gallery';
  var lb=document.getElementById('lb'),image=document.getElementById('lbImg'),caption=document.getElementById('lbCap'),count=document.getElementById('lbCount');
  var closeBtn=document.getElementById('lbClose'),prev=document.getElementById('lbPrev'),next=document.getElementById('lbNext'),idx=0,lastFocus=null;
  items.forEach(function(it,i){
    var link=document.createElement('a');link.href=it.full;link.setAttribute('aria-label',it.caption||'Open family photo '+(i+1));
    var img=new Image();img.width=it.width;img.height=it.height;img.alt=it.caption||'Family photo '+(i+1);img.loading=i<4?'eager':'lazy';img.decoding='async';
    img.onload=function(){img.classList.add('ok')};img.src=it.thumb;if(img.complete)img.classList.add('ok');
    link.appendChild(img);link.addEventListener('click',function(e){e.preventDefault();open(i)});gallery.appendChild(link);
  });
  album.appendChild(gallery);
  function render(){
    var it=items[idx];image.src=it.full;image.alt=it.caption||'Family photo '+(idx+1);caption.textContent=it.caption;count.textContent=(idx+1)+' / '+items.length;
    [idx-1,idx+1].forEach(function(i){if(i>=0&&i<items.length){var pre=new Image();pre.src=items[i].full}});
  }
  function open(i){idx=i;lastFocus=document.activeElement;render();lb.classList.add('open');document.documentElement.classList.add('lb-open');closeBtn.focus()}
  function close(){lb.classList.remove('open');document.documentElement.classList.remove('lb-open');image.removeAttribute('src');if(lastFocus)lastFocus.focus()}
  function step(d){if(!items.length)return;idx=(idx+d+items.length)%items.length;render()}
  closeBtn.addEventListener('click',close);prev.addEventListener('click',function(){step(-1)});next.addEventListener('click',function(){step(1)});
  lb.addEventListener('click',function(e){if(e.target===lb||e.target.tagName==='FIGURE')close()});
  document.addEventListener('keydown',function(e){
    if(!lb.classList.contains('open'))return;
    if(e.key==='Escape'){e.preventDefault();close()}
    else if(e.key==='ArrowLeft'){e.preventDefault();step(-1)}
    else if(e.key==='ArrowRight'){e.preventDefault();step(1)}
    else if(e.key==='Tab'){
      var controls=[closeBtn,prev,next],pos=controls.indexOf(document.activeElement);
      if(e.shiftKey&&(pos<=0)){e.preventDefault();next.focus()}
      else if(!e.shiftKey&&(pos===controls.length-1||pos===-1)){e.preventDefault();closeBtn.focus()}
    }
  });
  var x0=null;lb.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
  lb.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>50)step(dx<0?1:-1);x0=null},{passive:true});
})();