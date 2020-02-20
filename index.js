const puppeteer = require('puppeteer');

let scrape = async () => {
  // Здесь выполняются операции скрапинга...
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://professional-secure.justanswer.com/');
    // await page.setRequestInterception(true);
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

    async function puppeteerMutationListener(addedText, index) {
        console.log(`Added text: ${addedText}`);

        const link = await page.$(`body > div.question-list > div.bodyContainer > div.list-body-panel > div.questionlist > ul > div.scroll-questions-container > li:nth-child(${index + 2}) > div.question.open > div.question__info-and-hide > div.question__info-container > div > div.question__reply.chatbutton`);  
        const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page()))); 

        await link.click();
        const newPage = await newPagePromise;

        await newPage.bringToFront();

        setTimeout(() => {
            newPage.click('body > div.chat-container > div.main > div > div.expert-reply-region > div > div.pro-response > div > div > div.post-status > div.question-actions.js-question-lock-region > div > p.relock-question.js-lock');
        }, 15000)     
    }

    await page.click('#modal-login > div.form > form > div.submit > button');    

    await page.waitForSelector('body > div.question-list > div.bodyContainer > div.list-body-panel > div.questionlist > ul > div.scroll-questions-container');
    // await page.click('#openQuestionsButton');

    page.exposeFunction('puppeteerMutationListener', puppeteerMutationListener);

    await page.evaluate(() => {
        const mutationObserver = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                // if (!mutationsList.contains('')) {}
                window.puppeteerMutationListener(mutation.addedNodes[0].textContent, document.querySelector('#priorityCountMark').innerText);
            }
          });

        mutationObserver.observe(document.querySelector("body > div.question-list > div.bodyContainer > div.list-body-panel > div.questionlist > ul > div.scroll-questions-container"), {childList: true});
    });

    // // Возврат значения
    return {result, puppeteerMutationListener};
    browser.close();

};

scrape().then((value) => {
    console.log(value); // Получилось!
});

