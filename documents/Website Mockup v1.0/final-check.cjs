const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'C:/Users/W3BSOL/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('fs'),path=require('path'),assert=require('assert/strict');
(async()=>{
 let browser;try{browser=await chromium.launch({headless:true});}catch{browser=await chromium.launch({channel:'msedge',headless:true});}
 const ctx=await browser.newContext({viewport:{width:1440,height:1040},reducedMotion:'reduce'}),p=await ctx.newPage(),out=path.join(__dirname,'previews');
 const failures=[];
 for(const lang of ['tc','en','sc']){
  await p.goto('http://127.0.0.1:4173/'+lang+'/providers/');
  const sorted=await p.evaluate(()=>{const names=[...document.querySelectorAll('.provider-card h3')].map(e=>e.textContent);return names.every((s,i)=>i===0||names[i-1].localeCompare(s,document.documentElement.lang)<=0);});assert.ok(sorted,'Directory names must match stated alphabetical ordering.');
  await p.locator('.header-tools [data-dialog="preferences"]').click();await p.locator('#preferences [data-font="2"]').click();await p.locator('[data-close="preferences"]').click();
  await p.setViewportSize({width:320,height:850});
  for(const route of ['', 'providers/', 'contact/']){await p.goto('http://127.0.0.1:4173/'+lang+'/'+route);const width=await p.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));if(width.scroll>width.width+2)failures.push({lang,route,...width});}
  await p.evaluate(()=>localStorage.removeItem('tmdhc-reading'));await p.setViewportSize({width:1440,height:1040});
 }
 assert.deepEqual(failures,[]);
 await p.goto('http://127.0.0.1:4173/tc/');await p.screenshot({path:path.join(out,'homepage-desktop-viewport.png')});
 await p.goto('http://127.0.0.1:4173/tc/providers/');await p.screenshot({path:path.join(out,'directory-desktop.png'),fullPage:true});
 await p.goto('http://127.0.0.1:4173/en/providers/');await p.screenshot({path:path.join(out,'directory-english.png'),fullPage:true});
 await p.setViewportSize({width:390,height:844});await p.goto('http://127.0.0.1:4173/tc/');await p.screenshot({path:path.join(out,'homepage-mobile-viewport.png')});await p.goto('http://127.0.0.1:4173/tc/providers/');await p.screenshot({path:path.join(out,'directory-mobile.png'),fullPage:true});
 await p.goto('file:///'+path.join(__dirname,'tc/providers/index.html').replaceAll('\\','/'));assert.equal(await p.locator('.provider-card').count(),6);await p.locator('[data-language="en"]').click();assert.equal(await p.locator('html').getAttribute('lang'),'en');
 const report=JSON.parse(fs.readFileSync(path.join(out,'verification.json'),'utf8'));report.checks.push('Provider records are sorted by their localized display names.','Largest text setting reflows at 320px on home, directory and contact pages in all three languages.','Direct file browsing and same-page language switching work without the preview server.');fs.writeFileSync(path.join(out,'verification.json'),JSON.stringify(report,null,2));
 console.log('Final pass: localized sorting, nine large-text mobile layouts, offline file browsing and clean screenshots verified.');await browser.close();
})().catch(e=>{console.error(e);process.exit(1);});
