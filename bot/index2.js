import puppeteer from "puppeteer-extra"
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
puppeteer.use(StealthPlugin())
puppeteer.launch({ headless: true }).then(async browser => {
    console.log('Running tests..')
    const page = await browser.newPage()
    await page.goto('https://www.propertyfinder.ae/en/search?c=2&q=&l=&v=&ta=&t=1&rp=y&fu=0&kw=&pf=&pt=&af=&at=&vv=&ob=nd')
    await page.waitForTimeout (5000)
    while (true){
    const productsHandles = await page.$$ (
        "div.card-list.card-list--property > .card-list__item"
        );
    for (const producthandle of productsHandles) {
        try {
        const title = await page. evaluate(
        (el) => el.querySelector (".card-intro__price-area").textContent,
        producthandle
        );
        
        console.log(title);}
        catch (error) {}
        
    }
    
    await Promise.all([
        page.click("a.pagination__link.pagination__link--next"),
        page.waitForNavigation({ waitUntil: 'networkidle2' })
      ]);
      console.log("work")}d
    await browser.close()
   })
