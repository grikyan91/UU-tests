import chai from 'chai';
import {run, stop} from '../lib/browser';
const assert = chai.assert;

describe ( 'Форма регистрации', () =>{
    let page;
    const signUpButton = 'body > div:nth-child(2) > section > div > form > fieldset.captcha > label';
    const errorMessage = 'body > div:nth-child(2) > section > div > form > fieldset.alerts.hidden';

    beforeEach( async () => {
        page = await run('https://weatherstack.com/signup/free');
    });
    afterEach(async() => {
        await stop();
    });

    it ('Авторизоваться без заполненных полей', async () => {
        await page.click(signUpButton);
        await page.waitForSelector(errorMessage);
        const errorText = await page.textContent(errorMessage);
        assert.strictEqual(errorText, 'There were errors. Please try again!', 'Не валидное сообщение об ошибке');
    });
});
