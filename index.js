const puppeteer = require('puppeteer');

let scrape = async () => {
  // Здесь выполняются операции скрапинга...
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://professional-secure.justanswer.com/');
    // Код для скрапинг

    const result = await page.evaluate(() => {
        let username = document.querySelector('#UserName');
        let pass = document.querySelector('#Password');

        pass.value = 'skipper52';
        username.value = 'colinbalmford2018@gmail.com';

        return {
            username,
            pass
        }
    });

    await page.click('#remember');
    await page.click('#modal-login > div.form > form > div.submit > button');    

    // const openFirstQuestion = () => {


    //     const questionCount = page.evaluate(() => {
    //         let questions = document.querySelectorAll('')
    //         link.click(questions[0]);
    //     });
    // }
    await page.waitForSelector('body > div.question-list > div.bodyContainer > div.list-body-panel > div.questionlist > ul > div.scroll-questions-container > li:nth-child(2) > div.question.open > div.question__info-and-hide > div.question__info-container > div > div.question__reply.chatbutton');
    const link = await page.$('body > div.question-list > div.bodyContainer > div.list-body-panel > div.questionlist > ul > div.scroll-questions-container > li:nth-child(2) > div.question.open > div.question__info-and-hide > div.question__info-container > div > div.question__reply.chatbutton');  
    const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page()))); 

    await link.click();
    const newPage = await newPagePromise;

    await newPage.waitForSelector('body > div.chat-container > div.main > div > div.expert-reply-region > div > div.pro-response > div > div > div.post-status > div.question-actions.js-question-lock-region > div > p.relock-question.js-lock');
    await newPage.bringToFront();     
    await newPage.click('body > div.chat-container > div.main > div > div.expert-reply-region > div > div.pro-response > div > div > div.post-status > div.question-actions.js-question-lock-region > div > p.relock-question.js-lock');

    // // Возврат значения
    return {result};
    browser.close();

};

scrape().then((value) => {
    console.log(value); // Получилось!
});