import {
  updateList,
  setMultipleAttributes,
  isElementDefined,
  isWindowSelected
} from './helpers.js';

let listContainer = document.getElementsByClassName('stored-text')[0]
let addBtn = document.getElementById('add-button')

chrome.storage.sync.get('storedItems', function(data) {
  // console.log(data)

  // check if the array is empty
  if(data["storedItems"].length !== 0) {
    // create dom elements for each object
    data["storedItems"].forEach((elem) => {

      let mainList = document.getElementsByClassName('stored-text-list')[0]
      if(!isElementDefined(mainList)) {
        mainList = document.createElement("ul")
        mainList.setAttribute("class", "stored-text-list");
        listContainer.appendChild(mainList)
      }
      updateList(elem, mainList)
      listContainer.appendChild(mainList)
    })
  }
  else {
    // create message to indicate nothing is saved yet
    let noContentHeader = document.createElement("h1");
    noContentHeader.innerHTML = "Start Adding Notes!";
    setMultipleAttributes(noContentHeader, {
      "class": "no-content-header",
    })
    listContainer.appendChild(noContentHeader);
  }
});

// highlight button click event
addBtn.onclick = () => {
  const note = (document.getElementById("highlight-note").value).trim()
  let highlightSelection;
  let tagSelection;
  let currentURL;

  if (note === "") {
    return alert("Don't forget to take a note to remember what you highlight!");
  }

  // get the active tab
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    currentURL = tabs[0].url;
  });

  const executeScriptObj = {
    file: "user_interfaces/js/contentScripts/selectionInjection.js",
  }

  // get the selection and text
  chrome.tabs.executeScript(null, executeScriptObj, (results) => {
    if (chrome.runtime.lastError || !results || !results.length) {
      return;  // Permission error, tab closed, etc.
    }
  });

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");

    highlightSelection = request.msg;
    tagSelection = request.tag;

    console.log(highlightSelection)

    // retrieve the already stored value
    chrome.storage.sync.get('storedItems', (data) => {
      const lastNote = {
        note: note,
        pageUrl: currentURL,
        highlight_text: highlightSelection,
        tag: tagSelection,
        projectId: 0,
      }

      // remove no-content-header if existing
      // same element as noContentHeader
      let noContentHeadMsg = document.getElementsByClassName('no-content-header')[0]
      if(isElementDefined(noContentHeadMsg)) {
        noContentHeadMsg.style.display = "none";
      }

      // add the last note
      data["storedItems"].push(lastNote)

      let list = document.getElementsByClassName('stored-text-list')[0]

      // update the view
      if(!isElementDefined(list)) {
        list = document.createElement("ul")
        list.setAttribute("class", "stored-text-list");
        listContainer.appendChild(list)
      }
      updateList(lastNote, list)

      // store the new object array
      chrome.storage.sync.set(data);
    })
  });
}
