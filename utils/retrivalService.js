/* eslint-disable max-len */
/**
* Abstraction class to retrieve data API's such as bot search and users in chat.
*
* @export
* @class RetrievalService
*/
const CHANNEL_NAME_IN_URL_POSITION = 3;
class RetrievalService {
  getBotList = async () => {
    let onlineBotsResponse = await fetch("https://api.twitchinsights.net/v1/bots/online", {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9,he;q=0.8",
        "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "document",
      },
      "referrer": "https://twitchinsights.net/",
      "body": null,
      "method": "GET",
      "credentials": "omit"
    });
    let responseJson = await onlineBotsResponse.json();
    return responseJson['bots'];
  }

  getViewersInChat = async (channelName) => {
    let onlineChattersResponse = await fetch(`https://tmi.twitch.tv/group/user/${channelName}/chatters`,
      {
        "headers": {
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "accept-language": "en-US,en;q=0.9,he;q=0.8",
          "cache-control": "max-age=0",
          "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"102\", \"Google Chrome\";v=\"102\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "none",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1"
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET"
      });
    let responseJson = await onlineChattersResponse.json();
    return responseJson["chatters"]["viewers"];
  };

  getChannelNameInCurrentTab = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab.url.split('/')[CHANNEL_NAME_IN_URL_POSITION];
  }
}
const retrievalService = new RetrievalService();
export default retrievalService;
