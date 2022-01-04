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

    //selecting search bar and searching for the term 'Macbook'
    await page.click('label:検索');
    await page.type('[text=なにをお探しですか？]', 'Macbook');
    await page.keyboard.press('Enter', {delay:2000});
    await page.screenshot({path: `ea-${Date.now}.png`});

    //select third option in search result grid
    //because I am not entirely familiar with playwright this is a guess on syntax
    //thought process here is that I'm attempting to select by id, and then select the 3rd item within the list used by the item-grid
    await page.selectOption(['id=item-cell', {'index': 3}])
    await page.screenshot({path: `ea-${Date.now}.png`});

    //validate "MacBook" appears in item title, right click it, then screenshot
    //I'm not 100% sure how to handle this part of the test, so am trying to locate the term 'macbook' in the title by searching for the heading page class, then the term, and right clicking
    //I looked into various ways to print a success message into the console if it found the term in the title since that would be a more elegant solution, but couldn't figure out the proper method
    await page.click('heading page', 'macbook', {button: 'right'});
    await page.screenshot({path: `ea-${Date.now}.png`});
    

    //end test and close browser
    await browser.close();
})();