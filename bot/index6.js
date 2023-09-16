import puppeteer from "puppeteer-extra";
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

puppeteer.launch({ headless: true }).then(async browser => {
    console.log('Running tests..');
    const page = await browser.newPage();
    await page.goto('https://www.drivenproperties.com/dubai/properties-for-rent');
    await page.waitForTimeout(1000);

    async function navigate(link) {
        const page2 = await browser.newPage();
        await page2.goto(link);
     
    await  page2.waitForSelector('main.dpx-main', { visible: true })
     
    
        const title =await page2.$eval('.dpx-headings-2.dpx-headings-2', (element) =>
        element.textContent.trim()
      );
      const h1Elements = await page2.evaluate(() => {
          const elements = document.querySelectorAll('ul.nav.nav-pills.nav-justified.dpx-listings-detail-facts > li.nav-item div');
          return Array.from(elements).map(element => element.textContent);
        });
      console.log(title)
      console.log(h1Elements )

        await page2.close();
    }

    const productsHandles = await page.$$(
        "div.dpx-listing-thumbnail.ux-listing-thumbnail.make-transition"
    );

    let a = 0;
    for (const producthandle of productsHandles) {
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
    }

    
});
