const settings = {
  userId: '',
  untrackedNotes: [],
  projects: [],
}

chrome.runtime.onInstalled.addListener(function() {

  // const Http = new XMLHttpRequest();
  // const url = 'http://localhost:27018/getId';
  // Http.open("POST", url);
  // Http.send();
  //
  // Http.onreadystatechange = (e) => {
  //   console.log(Http.responseText)
  // }

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
