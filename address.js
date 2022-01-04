const playwright = require('playwright');

(async () => {

    //since this would be done for debugging, intentionally showing as much as I can and slowing things down to ensure each step works correctly
    const browser = await playwright["chromium"].launch({
        headless: false,
        slowMo: 10
    });

    //creating browser and page with mobile phone dimensions for testing to take place in
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.setViewport({
        width:375,
        height:812 
    });

    //navigate to home page 
    await page.goto('https://jp.mercari.com/');
    await page.screenshot({path: `ea-${Date.now}.png`});

    //selecting my page by the label it uses
    await page.click('text=マイページ'); 
    await page.screenshot({path: `ea-${Date.now}.png`});

    //navigating to personal information
    await page.click('text=個人情報設定'); 
    await page.screenshot({path: `ea-${Date.now}.png`});

    //navigating to shipping address
    await page.click('text=発送元・お届け先住所'); 
    await page.screenshot({path: `ea-${Date.now}.png`});

    //selecting add shipping address
    await page.click('text=配送先住所を追加する'); 
    await page.screenshot({path: `ea-${Date.now}.png`});

    //fill out new address form, assuming a basic name/address structure
    //using my name and an American address format since I cannot access this page on the website to pull and translate label names
    //input would have to be quite different for the actual JP website since addresses are not formatted the same
    await page.type('[name=Surname]', 'McNamara');
    await page.type('[name=GivenName]', 'Zackary');
    await page.type('[name=Street]', '201 W Washington Blvd');
    await page.type('[name=City]', 'Los Angeles');
    await page.type('[name=State]', 'California');
    await page.type('[name=ZipCode]', '90007');
    await page.screenshot({path: `ea-${Date.now}.png`});
    await page.click('id=submit');

    //validate new address is shown in shipping addresses
    await page.click('id=back');
    await page.screenshot({path: `ea-${Date.now}.png`});

    //end test and close browser
    await browser.close();
})();