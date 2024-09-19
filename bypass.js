import initializeBrowser from "./initializeBrowser.js";
import handleResponse from "./handleResponse.js";

const bypass = async (urlToBypass) => {
  const { browser, page } = await initializeBrowser();

  const myPromise = new Promise((resolve, reject) => {
    page.on("response", async (response) => {
      const bypassed = await handleResponse(response, page);
      if (bypassed)     {
        console.log(bypassed)
        await browser.close();
        resolve(bypassed);
    }
    });
  });

  await page.goto(urlToBypass);

  return myPromise;
};

const test = await bypass("https://loot-link.com/s?a71a5892&data=cK4X7pNIqU%2BFmtcNCU8WT%2BM7bgWZ746JX5cSA0mJZwWztlUvToEe8l9pXbT8hNHJim9NiiPhkqcCQ9GAEaa6ASuLVAapEqSyECNcGylyZS4%3D");

console.log(test);
