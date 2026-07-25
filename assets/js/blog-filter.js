(function(){
  const categoryList = Array.isArray(window.CATEGORIES) ? window.CATEGORIES : [];
  const articleList = Array.isArray(window.ARTICLES) ? window.ARTICLES : [];
  const pillBar = document.getElementById('pillBar');
  const blogGrid = document.getElementById('blogGrid');
  const emptyState = document.getElementById('emptyState');
  const loadMoreWrap = document.getElementById('loadMoreWrap');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if(!pillBar || !blogGrid || !emptyState || !loadMoreWrap || !loadMoreBtn) return;

  function escapeHtml(value){
    return String(value ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  }

  function getCategoryLabel(key){
    const c = categoryList.find(c => c.key === key);
    return c ? c.label : key;
  }

  const params = new URLSearchParams(location.search);
  const requestedCat = params.get('cat');
  let currentCat = requestedCat && categoryList.some(c => c.key === requestedCat) ? requestedCat : 'all';
  let visibleCount = 9;
  const PAGE_SIZE = 9;

  function pillBarHtml(){
    const all = [{key:'all', label:'全部文章'}, ...categoryList];
    return all.map(c => `<button type="button" class="pill ${c.key===currentCat?'active':''}" data-cat="${escapeHtml(c.key)}" aria-pressed="${c.key===currentCat}">${escapeHtml(c.label)}</button>`).join('');
  }

  function cardHtml(a){
    const catLabel = getCategoryLabel(a.category);
    const seriesLabel = a.series ? `・${a.series}${a.seriesOrder ? ' '+a.seriesOrder : ''}` : '';
    const thumb = (a.image && a.image !== '')
      ? `<div class="card-thumb"><img src="${escapeHtml(a.image)}" alt="${escapeHtml(a.imageAlt || a.title)}" loading="lazy"></div>`
      : '';
    return `<a href="${escapeHtml(a.url)}" class="blog-card">
      ${thumb}
      <span class="tag">${escapeHtml(catLabel)}</span>
      <h3>${escapeHtml(a.title)}</h3>
      <p class="excerpt">${escapeHtml(a.excerpt)}</p>
      <p class="meta">${escapeHtml(a.date)}・${escapeHtml(a.readingTime)} 分鐘閱讀${escapeHtml(seriesLabel)}</p>
    </a>`;
  }

  function render(){
    pillBar.innerHTML = pillBarHtml();
    const source = currentCat === 'all' ? [...articleList] : articleList.filter(a => a.category === currentCat);
    const filtered = source.sort((a,b) => {
      if(currentCat !== 'all'){
        const af = a.categoryFeatured ? 0 : 1;
        const bf = b.categoryFeatured ? 0 : 1;
        if(af !== bf) return af - bf;
        return (Number(a.categoryOrder)||9999) - (Number(b.categoryOrder)||9999);
      }
      return String(b.date).localeCompare(String(a.date));
    });
    const shown = filtered.slice(0, visibleCount);

    blogGrid.innerHTML = shown.map(cardHtml).join('');
    emptyState.style.display = filtered.length ? 'none' : 'block';
    loadMoreWrap.style.display = visibleCount < filtered.length ? 'flex' : 'none';

    document.querySelectorAll('.cat-card-btn').forEach(btn=>{
      const active = btn.dataset.cat === currentCat;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    document.querySelectorAll('#pillBar .pill').forEach(btn=>{
      btn.addEventListener('click', ()=> setCategory(btn.dataset.cat, true));
    });
  }

  function setCategory(cat, shouldScroll){
    currentCat = cat;
    visibleCount = PAGE_SIZE;
    const url = new URL(location.href);
    if(currentCat === 'all') url.searchParams.delete('cat');
    else url.searchParams.set('cat', currentCat);
    history.replaceState(null, '', url);
    render();
    if(shouldScroll) blogGrid.scrollIntoView({behavior:'smooth', block:'start'});
  }

  document.querySelectorAll('.cat-card-btn').forEach(btn=>{
    btn.setAttribute('aria-pressed', 'false');
    btn.addEventListener('click', ()=> setCategory(btn.dataset.cat, true));
  });

  loadMoreBtn.addEventListener('click', ()=>{
    visibleCount += PAGE_SIZE;
    render();
  });

  render();
})();
