import WebSocket from "ws";
import decodeURI from "./decodeURI.js";
const openWebSocket = (urid, task_id, extracted, INCENTIVE_SERVER_DOMAIN) => {
  return new Promise((resolve, reject) => {
    const wsUrl = `wss://${urid.substr(-5) % 3}.${INCENTIVE_SERVER_DOMAIN}/c?uid=${urid}&cat=${task_id}&key=${extracted.KEY}`;
    const ws = new WebSocket(wsUrl);

    ws.on("open", () => {
      setInterval(() => ws.send("0"), 1000);
    });

    ws.on("message", (event) => {
      const text = event.toString("utf-8");

      if (text.includes("r:")) {
        const PUBLISHER_LINK = text.replace("r:", "");
        const bypassed = decodeURIComponent(decodeURI(PUBLISHER_LINK));
        ws.close();
        resolve(bypassed);
      }
    });
  });
};

export default openWebSocket;
