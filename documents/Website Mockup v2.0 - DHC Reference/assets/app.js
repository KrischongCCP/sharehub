'use strict';
(() => {
 const data=JSON.parse(document.getElementById('site-data').textContent);
 const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
 const html=document.documentElement;
 let preferences={font:0,contrast:false,gray:false};
 try{Object.assign(preferences,JSON.parse(localStorage.getItem('tmdhc-v2-reading')||'{}'));}catch{}
 const setPreferences=()=>{
  preferences.font=[0,1,2].includes(Number(preferences.font))?Number(preferences.font):0;
  html.style.setProperty('--base',[17,19,21][preferences.font]+'px');
  html.dataset.contrast=preferences.contrast?'high':'normal';
  html.classList.toggle('high-contrast',!!preferences.contrast);
  document.body.classList.toggle('grayscale',!!preferences.gray);
  $$('[data-font]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.font)===preferences.font)));
  $('#contrast-setting').checked=!!preferences.contrast;$('#grayscale-setting').checked=!!preferences.gray;
 };
 const savePreferences=()=>{setPreferences();try{localStorage.setItem('tmdhc-v2-reading',JSON.stringify(preferences));}catch{}};
 setPreferences();
 $$('[data-font]').forEach(b=>b.addEventListener('click',()=>{preferences.font=Number(b.dataset.font);savePreferences();}));
 $('#contrast-setting').addEventListener('change',e=>{preferences.contrast=e.target.checked;savePreferences();});
 $('#grayscale-setting').addEventListener('change',e=>{preferences.gray=e.target.checked;savePreferences();});
 $('#reset-preferences').addEventListener('click',()=>{preferences={font:0,contrast:false,gray:false};savePreferences();});
 $$('[data-language]').forEach(a=>a.addEventListener('click',()=>{try{localStorage.setItem('tmdhc-v2-language',a.dataset.language);}catch{}}));
 $('.mobile-menu').addEventListener('click',e=>{const b=e.currentTarget,open=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(open));$('#main-navigation').classList.toggle('menu-open',open);});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){$('#main-navigation').classList.remove('menu-open');$('.mobile-menu').setAttribute('aria-expanded','false');}});
 $$('[data-dialog]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();$('#'+b.dataset.dialog).showModal();}));
 $$('[data-close]').forEach(b=>b.addEventListener('click',()=>$('#'+b.dataset.close).close()));
 $$('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}}));
 const backTop=$('.back-top');
 const updateBackTop=()=>{backTop.hidden=window.scrollY<500;};
 window.addEventListener('scroll',updateBackTop,{passive:true});updateBackTop();
 let toastTimer;
 const toast=text=>{clearTimeout(toastTimer);$('#toast').textContent=text;$('#toast').hidden=false;toastTimer=setTimeout(()=>{$('#toast').hidden=true;},4200);};
 $('[data-share]').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(location.href);toast(data.ui.shared);}catch{toast(data.ui.shareFallback);}});
 $$('[data-news-page]').forEach(b=>b.addEventListener('click',()=>{const group=b.dataset.newsPage;$$('[data-news-group]').forEach(c=>{c.hidden=c.dataset.newsGroup!==group;});$$('[data-news-page]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));$('#news-status').textContent=data.ui.newsPage+' '+(Number(group)+1); }));
 $$('[data-provider-toggle]').forEach(b=>b.addEventListener('click',()=>{const open=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(open));$('#provider-more-'+b.dataset.providerToggle).hidden=!open;}));
 const filterForm=$('#provider-filters');
 if(filterForm){
  const filter=()=>{const f=new FormData(filterForm),q=String(f.get('name')).trim().toLocaleLowerCase(),profession=f.get('profession'),district=f.get('district'),copay=f.get('copay');let count=0;
   data.providerRecords.forEach(p=>{const words=[data.ui.providerNames[p.id],data.ui.professions[p.profession],data.ui.districts[p.district]].join(' ').toLocaleLowerCase();const match=(!q||words.includes(q))&&(profession===''||p.profession===Number(profession))&&(district===''||p.district===Number(district))&&(copay===''||p.price<=Number(copay));$('[data-provider="'+p.id+'"]').hidden=!match;if(match)count++;});
   $('#provider-count').textContent=count+' '+data.ui.resultsUnit;$('#provider-empty').hidden=count>0;
  };
  filterForm.addEventListener('submit',e=>{e.preventDefault();filter();});filterForm.addEventListener('reset',()=>setTimeout(filter,0));
 }
 $$('[data-programme-filter]').forEach(b=>b.addEventListener('click',()=>{const n=Number(b.dataset.programmeFilter);let count=0;$$('.programme-card').forEach(c=>{c.hidden=n!==-1&&Number(c.dataset.category)!==n;if(!c.hidden)count++;});$$('[data-programme-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));$('#programme-status').textContent=count+' '+data.ui.resultsUnit;}));
 $$('[data-programme]').forEach(b=>b.addEventListener('click',()=>{const p=data.ui.programmeItems[Number(b.dataset.programme)];$('#programme-dialog-name').textContent=p[0];$('#programme-dialog-desc').textContent=p[1];$('#programme-dialog').showModal();}));
 $$('[data-faq-filter]').forEach(b=>b.addEventListener('click',()=>{const n=Number(b.dataset.faqFilter);$$('[data-faq-category]').forEach(d=>{d.hidden=n!==-1&&Number(d.dataset.faqCategory)!==n;});$$('[data-faq-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));}));
 $$('[data-centre]').forEach(b=>b.addEventListener('click',()=>{$('#centre-name').textContent=data.ui.centreNames[Number(b.dataset.centre)];$$('[data-centre]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));}));
 const enquiry=$('#enquiry-form');
 if(enquiry){const submit=$('#submit-enquiry');submit.disabled=false;enquiry.addEventListener('submit',e=>e.preventDefault());submit.addEventListener('click',()=>{if(!enquiry.reportValidity())return;$('#form-success').hidden=false;$('#form-success').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'center'});});enquiry.addEventListener('input',()=>{$('#form-success').hidden=true;});}
 const searchForm=$('#site-search');
 if(searchForm){const query=$('#search-query'),container=$('#search-results');
  const search=()=>{const term=query.value.trim().toLocaleLowerCase();container.replaceChildren();if(!term){$('#search-status').textContent=data.ui.searchPrompt;return;}const results=data.searchIndex.filter(p=>(p.title+' '+p.text+' '+p.extra).toLocaleLowerCase().includes(term));$('#search-status').textContent=results.length?data.ui.searchResults+' · '+results.length+' '+data.ui.resultsUnit:data.ui.noSearch;for(const p of results){const a=document.createElement('a');a.className='search-result';a.href=p.href;const h=document.createElement('h2');h.textContent=p.title;const desc=document.createElement('p');desc.textContent=p.text;const url=document.createElement('small');url.textContent='/'+data.lang+'/'+p.id+'/';a.append(h,desc,url);container.append(a);}};
  query.value=new URLSearchParams(location.search).get('q')||'';search();searchForm.addEventListener('submit',e=>{e.preventDefault();search();});
 }
})();

// Option-two banner and compact search controls. No automatic slide rotation.
(() => {
 const data=JSON.parse(document.getElementById('site-data').textContent);
 const toggle=document.querySelector('.search-toggle'),form=document.querySelector('#header-search-form');
 toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));form.classList.toggle('search-expanded',open);if(open)document.getElementById('header-search').focus();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&form.classList.contains('search-expanded')){form.classList.remove('search-expanded');toggle.setAttribute('aria-expanded','false');toggle.focus();}});
 if(!document.querySelector('.dhc-hero'))return;
 let current=0;
 const show=index=>{
  current=(index+data.design.slides.length)%data.design.slides.length;
  const s=data.design.slides[current],heading=document.querySelector('#hero-heading'),action=document.querySelector('#hero-action');
  heading.querySelector('span').textContent=s[0];heading.querySelector('em').textContent=s[1];
  document.querySelector('#hero-description').textContent=s[2];action.querySelector('span').textContent=s[3];action.href=data.design.hrefs[current];
  document.querySelectorAll('[data-hero-photo]').forEach(el=>el.hidden=Number(el.dataset.heroPhoto)!==current);
  document.querySelectorAll('[data-hero-page]').forEach(el=>el.setAttribute('aria-pressed',String(Number(el.dataset.heroPage)===current)));
  document.querySelector('#hero-counter').textContent=String(current+1).padStart(2,'0')+' / 03';
  document.querySelector('#hero-status').textContent=data.design.slide+' '+(current+1)+' / 3: '+s[0]+' '+s[1];
 };
 document.querySelectorAll('[data-hero-page]').forEach(b=>b.addEventListener('click',()=>show(Number(b.dataset.heroPage))));
 document.querySelectorAll('[data-hero-step]').forEach(b=>b.addEventListener('click',()=>show(current+Number(b.dataset.heroStep))));
})();
