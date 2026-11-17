/* Gentle section reveal for ev-detail pages (same behaviour as the main page's .rv) */
(function(){
  var els=document.querySelectorAll('.rv');
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('on');});return;}
  var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('on');io.unobserve(x.target);}});},{threshold:.12});
  els.forEach(function(e){io.observe(e);});
})();
/* 현장 사진: data-after 날짜가 지나고 사진(figure)이 있을 때만 보임 */
(function(){
  document.querySelectorAll('.ev-photos[data-after]').forEach(function(s){
    var p=s.getAttribute('data-after').split('-'), end=new Date(+p[0],+p[1]-1,+p[2]+1);
    if(new Date()>=end && s.querySelector('figure')) s.hidden=false;
  });
})();
