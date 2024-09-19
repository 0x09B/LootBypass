import extractValuesFromHTML from "./extractValuesFromHTML.js";
import openWebSocket from "./openWebSocket.js";
import sendFetchRequests from "./sendFetchRequests.js";

const handleResponse = async (response, page) => {
	try {
		const url = response.url();
        const request = response.request();


		if (url.includes("/tc") && request.method() === 'POST') {
			const data = await response.json();
            console.log(data);

			let urid = "";
			let action_pixel_url = "";
            const task_id = "54";

			data.forEach((item) => {
				urid = item.urid;
				action_pixel_url = item.action_pixel_url;
			});

            
			const extracted = extractValuesFromHTML(await page.content());
			const INCENTIVE_SERVER_DOMAIN = await page.evaluate("INCENTIVE_SERVER_DOMAIN");
			const INCENTIVE_SYNCER_DOMAIN = await page.evaluate("INCENTIVE_SYNCER_DOMAIN");
			await sendFetchRequests(urid, task_id, action_pixel_url, INCENTIVE_SERVER_DOMAIN, INCENTIVE_SYNCER_DOMAIN);

			// Вызов функции для открытия WebSocket
			const bypassed = await openWebSocket(urid, task_id, extracted, INCENTIVE_SERVER_DOMAIN);

			// Вызов функции для отправки fetch запросов

			return bypassed;
		}
	} catch (error) {
		console.error("Error processing response:", error);
	}
};


export default handleResponse;