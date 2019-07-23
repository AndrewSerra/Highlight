const settings = {
  storedItems: [], // array of objects
  projects: [
    {
      id: 0,
      name: "Data"
    },
    {
      id: 1,
      name: "Race"
    },
    {
      id: 2,
      name: "GAN"
    }
  ],    // array of objects
}
chrome.runtime.onInstalled.addListener(function() {

  chrome.storage.sync.set(settings, function() {
    console.log(settings);
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {
          schemes: ['https', 'http']
        },
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
