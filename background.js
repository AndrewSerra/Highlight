const settings = {
  storedItems: [],
  projects: {}
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
