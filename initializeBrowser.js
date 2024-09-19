import puppeteer from "puppeteer";

const initializeBrowser = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
  );

  page.on("request", (request) => request.continue());

  return { browser, page };
};

export default initializeBrowser;
