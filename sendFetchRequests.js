const sendFetchRequests = async (urid, task_id, action_pixel_url, INCENTIVE_SERVER_DOMAIN, INCENTIVE_SYNCER_DOMAIN) => {
    await fetch(`https:${urid.substr(-5) % 3}.${INCENTIVE_SERVER_DOMAIN}/st?uid=${urid}&cat=${task_id}`, {
      method: "POST",
    });
  
    await fetch("https://" + action_pixel_url);
  
    await fetch(`https://${INCENTIVE_SYNCER_DOMAIN}/td?ac=1&urid=${urid}&&cat=${task_id}&tid=${task_id}`);
  };
  
  export default sendFetchRequests;
  