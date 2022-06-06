import chai from 'chai';
import {run, stop} from '../lib/browser';
const assert = chai.assert;

describe ( 'Покрытие UI сценариев тестами', () =>{
    let page;
    const header = 'body > div > nav';
    const logo = 'body > div > nav > div > div > a > img';
    const pricing = 'body > div > nav > div > ul > li:nth-child(1) > a';
    const logInHead = 'body > div > nav > div > ul > li.action.login > a';
    const startUserButton = 'body > div > section.hero.index > div > div > div.inline > a';
    const signUpFree = 'body > div > section:nth-child(3) > div > ul > li.free > div.main_container > a';
    const signUpButton = 'body > div:nth-child(2) > section > div > form > fieldset.captcha > label';
    const errorMessage = 'body > div:nth-child(2) > section > div > form > fieldset.alerts.hidden';
    const email = '#email';
    const password = '#password';
    const firstName = '#first_name';
    const lastName = '#last_name';
    const address = '#address';
    const postCode = '#post_code';
    const country = '#country_code';
    const city = '#city';
    const taxID = '#tax_id';
    const robot = '#recaptcha-anchor';
    const errorMessage1 = 'body > div:nth-child(2) > section > div > form > fieldset.alerts > li';
    const textLogIn = 'body > div > section.preapp.login > div > h2 > strong';
    const forgotPassword = 'body > div > section.preapp.login > div > form > fieldset:nth-child(2) > div:nth-child(2) > label > a';
    const logIn = 'body > div > section.preapp.login > div > form > fieldset:nth-child(2) > label';
    const loggedText = 'body > div > div.strip.strip-alt.dashboard.gray_bg_all > div > div.current_user_info.desktop_only > section:nth-child(2)';
    const sighOut = 'body > div > div.strip.strip-alt.dashboard.gray_bg_all > div > div.current_user_info.desktop_only > section:nth-child(2) > a';
    const formLogin = 'body > div > section.preapp.login > div > form';
    const checkSeleсted1 = 'body > div > section.hero.pricing > div > div > a.monthly.selected';
    const check2 = 'body > div > section.hero.pricing > div > div > a.yearly';
    const checkSeleсted2 = 'body > div > section.hero.pricing > div > div > a.yearly.selected';
    const linkYearly = 'body > div > section:nth-child(3) > div > ul > li.business.highlighted > div.main_container > a';
    const location = 'body > div > section.hero.index > div > div > div.weather_animated > div.location';
    const icon = 'body > div > section.hero.index > div > div > div.weather_animated > div.main_left > i';
    const temperature = 'body > div > section.hero.index > div > div > div.weather_animated > div.main_right > span.temperature';
    const wind = 'body > div > section.hero.index > div > div > div.weather_animated > div.main_right > span.wind';
    const precip = 'body > div > section.hero.index > div > div > div.weather_animated > div.main_right > span.precip';
    const pressure = 'body > div > section.hero.index > div > div > div.weather_animated > div.main_right > span.pressure';
    const week = 'body > div > section.hero.index > div > div > div.weather_animated > div.week';

    beforeEach( async () => {
        page = await run('https://weatherstack.com/');
    });
    afterEach(async() => {
        await stop();
    });

    it ('Проверка шапки', async () => {
        await page.waitForSelector(header);

        const element1 = await page.locator(logo);
        const img = await element1.getAttribute('src');
        assert.equal(img, '/site_images/weatherstack_logo_white.png', 'Не правильная картинка в лого');

        await page.click(pricing);
        const url1 = await page.url();
        assert.equal(url1, 'https://weatherstack.com/product', 'Не верный переход в Pricing');
        page.goBack();

        const element2 = await page.locator(logInHead);
        const href = await element2.getAttribute('href');
        assert.equal(href, '/login', 'Не правильная ссылка в кнопке Log In');

    });

    it ('Форма регистрации', async () => {
        await page.click(startUserButton);
        await page.click(signUpFree);

        const url = await page.url();
        assert.equal(url, 'https://weatherstack.com/signup/free', 'Не перешло на страницу регистрации');
    
        await page.click(signUpButton);
        await page.waitForSelector(errorMessage);
        const errorText = await page.textContent(errorMessage);
        assert.strictEqual(errorText, 'There were errors. Please try again!', 'Не валидное сообщение об ошибке при не заполненных полях');

        await page.click(email);
        await page.fill(email, 'test@mail.ru');
        await page.click(password);
        await page.fill(password, 'testPassword123');
        await page.click(firstName);
        await page.fill(firstName, 'TestNameF');
        await page.click(lastName);
        await page.fill(lastName, 'TestNameL');
        await page.click(address);
        await page.fill(address, 'TestAdr');
        await page.click(postCode);
        await page.fill(postCode, '220123');
        await page.selectOption(country, { value: 'BY' });
        await page.click(city);
        await page.fill(city, 'TestCity');
        await page.click(taxID);
        await page.fill(taxID, '123');
        const frame = await page.frames().find(f => f.name().startsWith("a-"));
        await frame.waitForSelector(robot);
        await page.click(signUpButton);
        const errorText1 = await page.textContent(errorMessage1);
        assert.strictEqual(errorText1, 'Please prove that you are human by ticking the box.', 'Не правильное сообщение об ошибке капчи');
    });

    it ('Форма авторизации', async () => {
        await page.click(logInHead);
        const url = await page.url();
        assert.equal(url, 'https://weatherstack.com/login', 'Не перешло на форму авторизации по кнопке LogIn');

        const text = await page.textContent(textLogIn);
        assert.strictEqual(text, 'Log in', 'Форма авторизации называется не верно');
        
        const element = await page.locator(forgotPassword);
        const href = await element.getAttribute('href');
        assert.equal(href, '/forgot', 'Не правильная ссылка в Forgot Password');

        await page.click(email);
        await page.fill(email, 'testEmailKseniya@mail.ru');
        await page.click(password);
        await page.fill(password, 'testPas123');
        await page.click(logIn);
        await page.waitForSelector(loggedText);
        const textlog = await page.textContent(loggedText);
        assert.strictEqual(textlog, 'Logged In as Egawegwa Grawegaw (Sign Out)', 'Имя и фамилия пользователя не соответствует введенному');

        await page.click(sighOut);
        assert.exists(await page.$(formLogin), 'Не произошел разлогин по кнопке Sign Out');
    });

    it ('Работа чекбокса Fair Pricing for Any Weather', async () => {
        await page.click(startUserButton);
        const url = await page.url();
        assert.equal(url, 'https://weatherstack.com/product', 'Не перешло на страницу продуктов');
        
        assert.exists(await page.$(checkSeleсted1), 'Не активен чекбокс Monthly Billing');
        await page.click(check2);
        assert.exists(await page.$(checkSeleсted2), 'Не активен чекбокс Yearly Billing');
        const element = await page.locator(linkYearly);
        const href = await element.getAttribute('href');
        assert.equal(href, '/signup/professional/yearly', 'Не правильная ссылка в кнопке SignIn после переключения чекбокса');
    });

    it ('Отображение блока погоды', async () => {
        assert.exists(await page.$(location), 'Отсутствует локация');
        assert.exists(await page.$(icon), 'Отсутствует большая иконка погоды');
        assert.exists(await page.$(temperature), 'Отсутствует температура');
        assert.exists(await page.$(wind), 'Отсутствует блок ветра');
        assert.exists(await page.$(precip), 'Отсутствует блок осадков');
        assert.exists(await page.$(pressure), 'Отсутствует блок давления');
        assert.exists(await page.$(week), 'Отсутствует блок недели');
    });
});
