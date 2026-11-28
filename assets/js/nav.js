(function(){
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('mobileMenu');
  if(!toggle || !menu) return;
  const labelOpen = toggle.dataset.labelOpen || '開啟導覽選單';
  const labelClose = toggle.dataset.labelClose || '關閉導覽選單';

  function openMenu(){
    menu.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', labelClose);
    document.body.classList.add('menu-open');
    const firstLink = menu.querySelector('a');
    if(firstLink) firstLink.focus();
  }

  function closeMenu(returnFocus){
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', labelOpen);
    document.body.classList.remove('menu-open');
    if(returnFocus) toggle.focus();
  }

  toggle.addEventListener('click', ()=>{
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu(true) : openMenu();
  });

  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true'){
      closeMenu(true);
    }
  });

  // 點選單內連結後自動關閉
  menu.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=> closeMenu(false));
  });

  // 視窗放大回桌機尺寸時，確保選單狀態重置
  window.addEventListener('resize', ()=>{
    if(window.innerWidth > 860 && !menu.hidden){
      closeMenu(false);
    }
  });
})();
