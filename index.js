const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const url = 'https://www.thesuperathleteacademy.com/';

const lectureUrl = 'https://www.thesuperathleteacademy.com/courses/564696/lectures/10303534';

const { BAEMAIL, BAPASS } = process.env;


const chromeOptions = {
    executablePath:"C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    headless:false, 
    defaultViewPort: null,
    slowMo:10};

(async () => {
  const browser = await puppeteer.launch(chromeOptions);
  const page = await browser.newPage();
  await page.setViewport({width:1500, height:1000});
  console.log("Connecting to URL...")
  await page.goto(url, {timeout:60000, waitUntil: 'domcontentloaded'})
    .then( () => console.log("Connected to ", url))
    .catch((err) => {
      console.error("Error connecting to url: ", err);
      process.exit();
    });
  // await page.screenshot({path: 'screenshots/img1.png'})
  //   .then( () => console.log("Screenshot 1 captured"))
  //   .catch((err) => {
  //     console.error("Error capturing screenshot: ", err);
  //     process.exit();
  //   });
  //const button = await page.$(() => document.querySelector('ul.nav > li'));
  //await button.evaluate( button => button.click());
  //await page.click();

  let selector = 'li a';
  await page.waitFor(selector);
  await page.evaluate((selector) => document.querySelector(selector).click(), selector)
    .catch((err) => console.error("Error query Selector: ", err));
  console.log("Clicked Login");
  await page.waitFor(5000);
  // await page.screenshot({path: 'screenshots/img2.png'})
  //   .then(() => console.log("screenshot 2 captured"));
  //second page
  selector = "#user_email";
  await page.waitFor((selector) => !!document.querySelector(selector), {timeout:120000}, selector)
    .catch((err) => console.error("Error query Selector: ", err));
  await page.evaluate((selector, BAEMAIL) => document.querySelector(selector).value = BAEMAIL, selector, BAEMAIL)
    .catch((err) => console.error("Error query Selector: ", err));
  await page.waitFor(1000);
  selector = "#user_password";
  await page.evaluate((selector, BAPASS) => document.querySelector(selector).value = BAPASS, selector, BAPASS)
    .catch((err) => console.error("Error query Selector: ", err));
  // await page.screenshot({path: 'screenshots/img3.png'})
  //   .then(console.log("Screenshot 3 captured"));
  selector = ".btn"
  await page.evaluate((selector) => document.querySelector(selector).click(), selector)
    .catch((err) => console.error("Error query Selector: line 53", err));
  await page.waitFor(5000);
  // await page.screenshot({path: 'screenshots/img4.png'})
  //   .then(console.log("Screenshot 4 captured"));

  //page 3
  selector = ".course-box-image-container";
  await page.evaluate((selector) => document.querySelector(selector).click(), selector)
    .catch((err) => console.error("Error query Selector: ", err));;

  selector = "ul.section-list li a";
  await page.waitFor(selector)
    .catch((err) => console.error("Error wait for: ", err));;
  let lectureLinks = await page.evaluate((selector) => {
      let lectureList = document.querySelectorAll(selector);
      let lectures = [];
      lectureList.forEach((lec) => {
        lectures.push(lec.href);
      });
      return lectures;
    }, selector)
    .catch((err) => {
      console.error("Error, probably wrong selector: ", err);
      process.exit();
    });


  for (const [i, link] of lectureLinks.entries()) {

    await page.goto(link, {waitUntil:"networkidle0"})
      .then(console.log(`Waiting for videos on week ${i}...`))
      .catch((err) => {
        console.error("Error with lecture links: ", err);
        process.exit(0);
      })
    
    await page.evaluate(() => {
      const pdfElements = document.querySelectorAll('.lecture-attachment-type-pdf_embed');
      for (const pdfElement of pdfElements) {
        pdfElement.remove();
      }
    });

    // await page.waitFor(10000);
    // let screenshotName = `screenshots/week${i}.jpeg`
    // await page.screenshot({path: screenshotName, fullPage:true, quality:10})
    //   .catch((err) => {
    //     console.error("Screenshot Error", err);
    //   });
    let selector = 'img.w-css-reset';
    await page.waitFor(selector);
    const videoLinks = await page.evaluate((selector) => {
      let videos = document.querySelectorAll(selector);
      let vidLinks = [];
      videos.forEach((video) => {
        let videoUrl = video.src;
        vidLinks.push(videoUrl);
      });
      return vidLinks;
    }, selector);

 
    console.log(videoLinks);


    // const videoElements = await page.$$('video');
    // for (const videoElement of videoElements) {
    //   const videoUrl = await videoElement.getProperty('src');
    //   console.log(videoUrl);
    //   videoLinks.push(videoUrl);
    // }
  }



  // let lectureAtt = await page.evaluate(() => document.querySelectorAll('div.lecture-attachment'));
  // console.log(lectureAtt);

  console.log('We\'re at the end');


  await browser.close();

})();
// axios(url)
//   .then(respose => {
//     const html = response.data;
//     const $ = cheerio.load(html);
//     const courseSections = ('.course-mainbar > .row');
//     const courseLinks = [];
//
//     courseSections.each(function () {
//
//     })
//   })
