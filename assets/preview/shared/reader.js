(() => {
  const cfg = window.READER_CONFIG;
  if (!cfg) return;
  const img = document.querySelector('#pageImage');
  const wrap = document.querySelector('.page-wrap');
  const prev = document.querySelector('#prevBtn');
  const next = document.querySelector('#nextBtn');
  const num = document.querySelector('#pageNum');
  const total = document.querySelector('#pageTotal');
  const bar = document.querySelector('#progressFill');
  const jump = document.querySelector('#jumpInput');
  const fs = document.querySelector('#fullBtn');
  const zoom = document.querySelector('#zoomBtn');
  let page = 0;
  let scale = 1;
  const sources = cfg.sources;
  const preload = (i) => { if (i>=0 && i<sources.length) { const p=new Image(); p.src=sources[i]; } };
  function render(dir=0){
    if(dir){ wrap.classList.add(dir>0?'turn-next':'turn-prev'); setTimeout(()=>wrap.classList.remove('turn-next','turn-prev'),260); }
    img.src=sources[page]; img.alt=`${cfg.title} 試讀第 ${page+1} 頁`;
    num.textContent=page+1; total.textContent=sources.length; jump.value=page+1;
    bar.style.width=`${((page+1)/sources.length)*100}%`;
    prev.disabled=page===0; next.disabled=page===sources.length-1;
    preload(page+1); preload(page-1);
  }
  function go(n){ const target=Math.max(0,Math.min(sources.length-1,n)); if(target===page)return; const d=target>page?1:-1; page=target; render(d); window.scrollTo({top:0,behavior:'smooth'}); }
  prev.onclick=()=>go(page-1); next.onclick=()=>go(page+1);
  jump.addEventListener('change',()=>go((parseInt(jump.value,10)||1)-1));
  document.addEventListener('keydown',e=>{ if(e.key==='ArrowRight'||e.key==='PageDown')go(page+1); if(e.key==='ArrowLeft'||e.key==='PageUp')go(page-1); });
  let startX=0,startY=0;
  wrap.addEventListener('touchstart',e=>{startX=e.touches[0].clientX;startY=e.touches[0].clientY},{passive:true});
  wrap.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-startX,dy=e.changedTouches[0].clientY-startY;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.2)go(page+(dx<0?1:-1));},{passive:true});
  wrap.addEventListener('contextmenu',e=>e.preventDefault());
  img.addEventListener('dragstart',e=>e.preventDefault());
  fs.onclick=async()=>{ try{ if(!document.fullscreenElement) await document.querySelector('.reader-shell').requestFullscreen(); else await document.exitFullscreen(); }catch(e){} };
  zoom.onclick=()=>{ scale=scale===1?1.35:1; img.style.width=scale===1?'auto':'135%'; img.style.maxWidth=scale===1?'100%':'none'; zoom.textContent=scale===1?'放大':'還原'; };
  render();
})();
