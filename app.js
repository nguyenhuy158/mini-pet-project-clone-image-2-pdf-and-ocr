const puppeteer = require('puppeteer');
const https = require('https');
const url = require('node:url');
const fs = require('fs')
const path = require('path')

// let urlWebsite = 'https://wallpaperscraft.com/all/1600x900';
let urlWebsite = 'https://wallpaperscraft.com/all/1600x900/page2';

(async () => {
    const q = url.parse(urlWebsite, false);
    // console.log("🚀 ~ file: app.js:7 ~ q:", q);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(urlWebsite);
    var title = await page.title();
    // console.log("🚀 ~ file: app.js:17 ~ title:", title)
    var srcs = await page.$$eval("a.wallpapers__link", el => el.map(x => x.getAttribute('href')));
    await browser.close();
    return srcs;
})().then((srcs) => {
    var result = srcs.map(x => url.resolve(urlWebsite, x))
    // console.log("🚀 ~ file: app.js:26 ~ srcs:", srcs)
    // console.log("🚀 ~ file: app.js:26 ~ srcs:", srcs.length)
    return result;
}).then(async result => {
    // console.log("🚀 ~ file: app.js:26 ~ result:", result)
    var srcs = [];
    for (let i = 0; i < result.length; i++) {
        const value = result[i];
        // console.log("🚀 ~ file: app.js:34 ~ value:", value)

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(value);
        var src = await page.$eval("a.gui-button.gui-button_full-height", x => x.getAttribute('href'));
        // console.log("🚀 ~ file: app.js:32 ~ src:", src)
        await browser.close();
        srcs.push(src);
    }
    return srcs;

}).then(async result => {
    console.log("🚀 ~ file: app.js:35 ~ result:", result)
    for (let i = 0; i < result.length; i++) {
        const imageUrl = result[i];
        console.log("🚀 ~ file: app.js:48 ~ imageUrl:", imageUrl)
        const imageName = path.basename(imageUrl)
        console.log("🚀 ~ file: app.js:50 ~ imageName:", imageName)

        const file = fs.createWriteStream(imageName);

        https.get(imageUrl, response => {
            response.pipe(file);

            file.on('finish', () => {
                file.close();
                console.log(`Image downloaded as ${imageName}`);
            });
        }).on('error', err => {
            fs.unlink(imageName);
            console.error(`Error downloading image: ${err.message}`);
        });
    }
});
