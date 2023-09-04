const puppeteer = require('puppeteer');
const https = require('https');
const url = require('node:url');
const fs = require('fs')
const path = require('path')
const df = require('./utils/download_file')

// let urlWebsite = 'https://wallpaperscraft.com/all/1600x900';
let urlWebsite = 'https://wallpaperscraft.com/all/1600x900/page4';

let main_process = async () => {
    const q = url.parse(urlWebsite, false);

    const browser = await puppeteer.launch({
        headless: 'new',
        // `headless: true` (default) enables old Headless;
        // `headless: 'new'` enables new Headless;
        // `headless: false` enables “headful” mode.
    });

    const page = await browser.newPage();

    await page.goto(urlWebsite);

    var raw_hrefs = await page.$$eval("a.wallpapers__link", el => el.map(x => x.getAttribute('href')));

    var hrefs = await raw_hrefs.map(x => url.resolve(urlWebsite, x))
    console.log("🚀 ~ file: app.js:23 ~ letmain_process= ~ hrefs:", hrefs)

    var url_images = [];
    // hrefs.length
    for (let i = 0; i < hrefs.length; i++) {
        const new_url = hrefs[i];
        const download_page = await browser.newPage();
        await download_page.goto(new_url);
        try {
            var current_src = await download_page.$eval("a.gui-button.gui-button_full-height", x => x.getAttribute('href'));
            url_images.push(current_src);
        } catch (error) {
            console.log("🚀 ~ file: app.js:29 ~ letmain_process= ~ new_url:", new_url)
            console.log("🚀 ~ file: app.js:35 ~ letmain_process= ~ error:", error);
            continue;
        }
    }
    await browser.close();

    for (let i = 0; i < url_images.length; i++) {
        df.download_file(url_images[i]);
    }

};

main_process();