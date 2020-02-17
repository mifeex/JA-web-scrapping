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