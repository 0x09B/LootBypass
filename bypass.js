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

export default bypass;
