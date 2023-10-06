import express from "express"
import puppeteer from "puppeteer-extra";
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Cluster } from 'puppeteer-cluster';
import fs from 'fs'; // Import the fs module for file operations

async function scraping(){

puppeteer.use(StealthPlugin());

puppeteer.launch({ headless: true }).then(async browser => {
    console.log('Running tests..');
    const page = await browser.newPage();
    await page.goto('https://www.drivenproperties.com/dubai/properties-for-rent', { timeout: 60000 });

    async function navigate(link) {
        const page2 = await browser.newPage();
        await page2.goto(link);

        await page2.waitForSelector('main.dpx-main', { visible: true });

      
      
        const images  = await page2.evaluate(() => {
            const elements = document.querySelectorAll('div.carousel-inner > div.carousel-item.dpx-property-status-tag > img');
            return Array.from(elements).map(element => element.src);
        });


       
        console.log(images);
       
        await page2.close();

        // Return the scraped data as an object
        return {
          
            images: images
        };
    }

    const scrapedData = []; // Create an array to store scraped data

    while (true) {
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

                const data = await navigate(link);

                scrapedData.push(data);

                a = a + 1;
                console.log(link);
                console.log(a);
            } catch (error) {
                console.log(error);
            }
        }

        // Find and click the "Next Page" button
        const nextPageButton = await page.$('div.dpx-pagination-controls > a[title="Next Page"]');
        if (!nextPageButton) {
            break; // Exit the loop if there is no "Next Page" button
        }

         await Promise.all([
            page.click('div.dpx-pagination-controls > a[title="Next Page"]'),
            page.waitForNavigation({ waitUntil: 'networkidle2' })
          ]);
        console.log("clikced");

        // Save the scraped data to a JSON file after each iteration
        fs.writeFileSync('scraped_data.json', JSON.stringify(scrapedData, null, 2), 'utf-8');
    }

    console.log("Work completed");
    await browser.close();
});}


    scraping()
   