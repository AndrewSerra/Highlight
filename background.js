const settings = {
  storedItems: []
}
chrome.runtime.onInstalled.addListener(function() {

  chrome.storage.sync.set(settings, function() {
    console.log(settings);
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {
          schemes: ['https']
        },
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
