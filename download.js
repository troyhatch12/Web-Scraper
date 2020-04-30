const puppeteer = require('puppeteer');
const fs = require('fs');

const urlsObject = require('./videoUrls.json');
const videoUrls = urlsObject["urls"];

const chromeOptions = {
    executablePath:"C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    headless:false, 
    defaultViewPort: null,
    slowMo:24};

try {

    (async () => {
      const browser = await puppeteer.launch(chromeOptions);
      const page = await browser.newPage();
      await page.setViewport({width:1500, height:1000});

        for(const [i, urls] of videoUrls.entries()) {
            for( const [j, vidUrl] of urls.entries()) {
            await page.goto(vidUrl);
            await page.evaluate((i, j) => {
                const anchor = document.createElement('a');
                const sourceEl = document.querySelector('video source');
                const source = sourceEl.getAttribute('src');
                anchor.setAttribute('href', source);
                anchor.setAttribute('download', `BALec${i}Vid${j}.mp4`);
                document.body.appendChild(anchor);
                anchor.click();
            }, i, j);
            }
        }
    })();
} catch(err) {
    console.error("There was an error", err);
}