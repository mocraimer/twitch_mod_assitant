const { generateGuid } = require("./src/services/guid");
const constants = {
  appConfig: {
    appName: "Twitch Mod Assitant",
    urls: {
      chrome:
          "CHROME_STORE_URL",
      firefox: "FIREFOX_STORE_URL",
      edge:
          "EDGE_STORE_URL",
    },
    // put extension key here if required which would only be used in development mode
    key: "SSH_PUBLIC_KEY", // gather it from extension store
  },
  contentScript: {
    mountId: generateGuid(),
  },
  browser: {
    firefox: {
      manifest: {
        browser_specific_settings: {
          gecko: {
            id: "GECKO_ID",
            strict_min_version: "42.0",
          },
        },
      },
    },
  },
  support: {
    donate: "https://streamelements.com/mcraimer/tip",
    howToVideoLink: "TUTORIAL_LINK",
    uninstallFeedbackForm: "HTTPS://FEEDBACK_FORM_LINK",
  },
};

module.exports = constants;

