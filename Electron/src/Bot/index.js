const puppeteer = require('puppeteer');

module.exports.initPuppeteer = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = (await browser.pages())[0];

  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36');
  await page.setViewport({ width: 1000, height: 728 });

  await page.goto('https://web.whatsapp.com');
  return [browser, page];
}

module.exports.extractQR = async (page) => {
  // const data = await page.evaluate(() => {
  //   return document.querySelector('[aria-label="Scan me!"]').toDataURL();
  // });
  // console.log('\n');
  // console.log(data);
  // console.log('\n');
  // const svg = await page.evaluate(() => {
  //   function getElementByXpath(path) {
  //     return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  //   }
  //   return getElementByXpath('/html/body/div[1]/div/div/div[2]/div[1]/div/div[2]/div/div/span/svg').toDataURL();
  // });
  // // const svg = await page.waitForXPath('/html/body/div[1]/div/div/div[2]/div[1]/div/div[2]/div/div/span/svg');
  // console.log(svg);
  const xpath = '//*[@id="app"]/div/div/div[2]/div[1]/div/div[2]/div'
  await page.waitForXPath('//*[@id="app"]/div/div/div[2]/div[1]/div/div[2]/div/canvas');
  const element = await page.$x(xpath);

  return await element[0].screenshot({type: 'png', encoding: 'base64'});  
}

module.exports.state = {};