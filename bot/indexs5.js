import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

puppeteer.launch({ headless: true }).then(async (browser) => {
  console.log('Running tests..');
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(60000)
  await page.goto('https://www.propertyfinder.ae/en/search?c=2&ob=nd&page=2&rp=y&t=1', { waitUntil: 'load' });

  // Function to scroll to the bottom of tahe page
  async function scrollToBottom() {
    await page.evaluate(() => {
      window.scrollBy(0, 1000);
    });
  }

  // Scroll to the bottom every second until the bottom is reached
  let previousHeight = 0;
  while (true) {
    await scrollToBottom();
    await page.waitForTimeout(1000); // Wait for 1 second

    const currentHeight = await page.evaluate(() => {
      return document.documentElement.scrollHeight;
    });

    // If the current height is the same as the previous height, we've reached the bottom
    if (currentHeight === previousHeight) {
      break;
    }

    previousHeight = currentHeight;
  }

  const productsHandles = await page.$$ (
    "div.card-list__item > article.card"
    );
    let a =0
for  (let i = 5; i < 9 && i < productsHandles.length; i++) {
    
    const producthandle = productsHandles[i];
    await page.waitForTimeout(1000)
        let phone="number"
        try {
            try{
    const revealButton = await producthandle.$('div.card-footer__buttons > button:first-child');

    await   revealButton.click()
    
      console.log("clicled")}
      catch (error) {console.log(producthandle)} 
       await  page.waitForSelector('.button__phone--ltr', { visible: true,hidden: false,  // Don't wait for the element to become hidden
       timeout: 10000 })
       a=a+1
       console.log("waitfro selector  is good ")
       try{ phone = await page. evaluate(
            (el) => el.querySelector ('button > span').textContent,
            producthandle
            );  }
            catch (error) {}  
            

    console.log(phone)
    console.log(a);}
    catch (error) {}
    
}

await browser.close()
  console.log("work")


  console.log('All done, check the screenshot.');
});

try {
  const link = await page.evaluate(
      (el) => el.querySelector("div.carousel-item.active > a").getAttribute("href"),
      producthandle
  );

  await navigate(link);

  a = a + 1;
  console.log(link);
  console.log(a);
} catch (error) {
  console.log(error);
}