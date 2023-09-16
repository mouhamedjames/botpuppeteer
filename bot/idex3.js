import puppeteer from "puppeteer-extra"
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
puppeteer.use(StealthPlugin())
puppeteer.launch({ headless: true }).then(async browser => {
    console.log('Running tests..')
    const page = await browser.newPage()
    await page.goto('https://www.propertyfinder.ae/en/search?c=2&ob=nd&rp=y&t=1')
    await page.waitForTimeout (5000)
   
    const productsHandles = await page.$$ (
        "div.card-list.card-list--property > .card-list__item"
        );
        let a =0
    for (const producthandle of productsHandles) {
        try {

           
            let phone="number"
       
        const revealButton = await producthandle.$('div.card-footer__buttons > button.button-module_button__3Jsl_.card-footer__button.button-module_button-theme__OYQF-.button-module_button-theme--secondary__3iMP-.button-module_button-size--small__1cPeM.button-module_button-theme--secondary--with-padding__taqp8:first-child');
          await   revealButton.click()
           await  page.waitForSelector('.button__phone--ltr', { visible: true })
           a=a+1
           
           try{ phone = await page. evaluate(
                (el) => el.querySelector ('.button__phone--ltr').textContent,
                producthandle
                );  }
                catch (error) {console.log(error)}  
                
   
        console.log(phone)
        console.log(a);}
        catch (error) {}
        
    }
    
    await browser.close()
      console.log("work")
   
   }) 
