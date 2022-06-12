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
    let acutalURL = encodeURIComponent(`https://tmi.twitch.tv/group/user/${channelName}/chatters`);
    let onlineChattersResponse = await fetch(`https://api.allorigins.win/get?url=${acutalURL}`)
      .then(response => {
        if (response.ok) return response.json()
        throw new Error('Network response was not ok.')
      });
    let responseJson = JSON.parse(onlineChattersResponse.contents);
    return responseJson["chatters"]["viewers"];
  };

  getChannelNameInCurrentTab = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab.url.split('/')[CHANNEL_NAME_IN_URL_POSITION];
  }
}
const retrievalService = new RetrievalService();
export default retrievalService;
