import { updateList, setMultipleAttributes } from './helpers.js';

let listContainer = document.getElementsByClassName('stored-text')[0]
let addBtn = document.getElementById('add-button')

chrome.storage.sync.get('storedItems', function(data) {
  // console.log(data)

  // check if the array is empty
  if(data["storedItems"].length !== 0) {
    // create dom elements for each object
    data["storedItems"].forEach((elem) => {

      let mainList = document.getElementsByClassName('stored-text-list')[0]
      if(mainList === undefined) {
        mainList = document.createElement("ul")
        mainList.setAttribute("class", "stored-text-list");
        listContainer.appendChild(mainList)
      }
      updateList(elem, mainList)
      listContainer.appendChild(mainList)
    })
  }
  else {
    // create message to indicate nothing is saved
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
  const note = document.getElementById("highlight-note").value
  let highlightSelection;
  let currentURL;

  // get the active tab
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    console.log(tabs[0])
    let tabIndex = tabs[0].index
    currentURL = tabs[0].url

    chrome.windows.getCurrent({populate: true, windowTypes:["normal"]}, (window) => {
      console.log(window.tabs[tabIndex])
      console.log(window.tabs[tabIndex] instanceof Window)
      highlightSelection = window.getSelection();
    })
  })

  // retrieve the already stored value
  chrome.storage.sync.get('storedItems', (data) => {
    const lastNote = {
      note: note,
      pageUrl: currentURL,
      highlight_text: highlightSelection
    }

    // remove no-content-header if existing
    // same element as noContentHeader
    let noContentHeadMsg = document.getElementsByClassName('no-content-header')[0]
    if(noContentHeadMsg !== undefined) {
      noContentHeadMsg.style.display = "none";
    }

    // add the last note
    data["storedItems"].push(lastNote)

    let list = document.getElementsByClassName('stored-text-list')[0]

    // update the view
    if(list === undefined) {
      list = document.createElement("ul")
      list.setAttribute("class", "stored-text-list");
      listContainer.appendChild(list)
    }
    updateList(lastNote, list)

    // store the new object array
    chrome.storage.sync.set(data, (stored_data) => {
      //console.log(stored_data)
    })
  })
}
