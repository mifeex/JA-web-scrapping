// const needle = require('needle');
// const cheerio = require('cheerio');
const phantom = require('phantom');

// var URL = 'https://my-secure.justanswer.com/account/logonpopup';

// let username = ''
// let pass = ''
// let form = ''

// needle.get(URL, function(err, res){
//     if (err) throw err;
//     const $ = cheerio.load(res.body);

//     username = $('#UserName').value = 'colinbalmford2018@gmail.com';
//     pass = $('#Password').value = 'skipper52';
//     form = $('#submit').val();

//     console.log(res.statusCode);
// });


// (async function() {
//     const instance = await phantom.create();
//     const page = await instance.createPage();
//     await page.on("onResourceRequested", function(requestData) {
//         // console.info('Requesting', requestData.url)
//     });

//     const status = await page.open('https://my-secure.justanswer.com/account/logonpopup');
//     console.log(status);

//     const content = await page.property('content');
//     console.log(username, pass, form)
//     console.log(content.getElementById('UserName'))

//     await instance.exit();
// }());

const puppeteer = require('puppeteer');

let scrape = async () => {
  // Здесь выполняются операции скрапинга...
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://www.justanswer.com/login.aspx');
    await page.waitFor(1000);
    // Код для скрапинга

    const result = await page.evaluate(() => {
        let username = document.querySelector('#JA_email');
        let pass = document.querySelector('#JA_password');

        pass.value = 'skipper52';
        username.value = 'colinbalmford2018@gmail.com';

        return {
            username,
            pass
        }
    });
    await page.click('#ctl00_BodyContent_btnLogin');
    // Возврат значения
    return result;
    browser.close();

};

scrape().then((value) => {
    console.log(value); // Получилось!
});