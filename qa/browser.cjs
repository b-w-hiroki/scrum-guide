const { chromium } = require('playwright');
const { createServer } = require('node:http');
const { readFileSync, mkdirSync } = require('node:fs');
const { resolve, extname } = require('node:path');
const assert = require('node:assert/strict');
const root=resolve(__dirname,'../dist');
const server=createServer((req,res)=>{
  const pathname=new URL(req.url,'http://localhost').pathname.replace(/^\/scrum-guide\//,'/');
  const file=resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
  if(!file.startsWith(root+'/')) return res.writeHead(403).end();
  try{res.writeHead(200,{'Content-Type':({'.html':'text/html','.js':'application/javascript','.css':'text/css','.svg':'image/svg+xml'}[extname(file)]||'application/octet-stream')}).end(readFileSync(file));}
  catch{res.writeHead(404).end();}
});
(async()=>{
  await new Promise(r=>server.listen(0,'127.0.0.1',r));
  const origin=`http://127.0.0.1:${server.address().port}`;
  const browser=await chromium.launch();
  try{
    mkdirSync('qa-artifacts',{recursive:true});
    for(const width of [390,1280]){
      const context=await browser.newContext({viewport:{width,height:844},reducedMotion:'reduce'});
      await context.route('**/*',route=>route.request().url().startsWith(origin+'/')?route.continue():route.abort());
      const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
      await page.goto(origin+'/scrum-guide/');
      await page.keyboard.press('Tab');
      assert.equal(await page.locator(':focus').textContent(),'メインコンテンツへスキップ');
      await page.keyboard.press('Enter');
      assert.equal(new URL(page.url()).hash,'#main-content');
      if(width===390){
        const menu=page.getByRole('button',{name:'メニューを開く'});
        await menu.focus();await page.keyboard.press('Enter');
        await page.getByRole('button',{name:'メニューを閉じる'}).waitFor();
        await page.keyboard.press('Enter');
        await page.getByRole('button',{name:'メニューを開く'}).waitFor();
        assert.equal(await menu.getAttribute('aria-expanded'),'false');
        await page.keyboard.press('Tab');
        assert.equal(await page.locator(':focus').evaluate(el=>!!el.closest('#mobile-navigation')),false);
      }
      await page.evaluate(()=>window.scrollTo(0,0));
      await page.screenshot({path:`qa-artifacts/hero-${width}.png`});
      const section=page.locator('#companies');await section.scrollIntoViewIfNeeded();
      const all=section.getByRole('button',{name:'すべて',exact:true});
      const jp=section.getByRole('button',{name:'日本企業',exact:true});
      assert.equal(await all.getAttribute('aria-pressed'),'true');
      const total=await section.locator('article').count();
      await jp.focus();await page.keyboard.press('Space');
      await page.waitForFunction(()=>document.querySelector('#companies button[aria-pressed="true"]')?.textContent==='日本企業');
      assert.equal(await all.getAttribute('aria-pressed'),'false');
      assert.ok((await section.locator('article').count())>0);
      assert.ok((await section.locator('article').count())<total);
      await all.focus();await page.keyboard.press('Enter');
      await page.waitForFunction(()=>document.querySelector('#companies button[aria-pressed="true"]')?.textContent==='すべて');
      assert.equal(await section.locator('article').count(),total);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
      await page.waitForTimeout(800);
      await page.screenshot({path:`qa-artifacts/companies-${width}.png`});
      assert.deepEqual(errors,[]);await context.close();
    }
    console.log('PASS: 390/1280 layout; keyboard skip link, menu toggle and filter; aria-pressed and result counts; no runtime errors. Company claims remain unverified.');
  }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
