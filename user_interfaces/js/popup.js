let listContainer = document.getElementsByClassName('stored-text')[0]
// let list = document.getElementsByClassName('stored-text-list')[0]
let addBtn = document.getElementById('add-button')

chrome.storage.sync.get('storedItems', function(data) {
  console.log(data)

  if(data["storedItems"].length !== 0) {
    data["storedItems"].forEach((elem) => {

      let list = document.createElement("ul").setAttribute("class", "stored-text-list");
      updateList(elem, list)
    })
  }
  else {
    let noContentHeader = document.createElement("h1");
    noContentHeader.innerHTML = "Start Adding Notes!";
    setMultipleAttributes(noContentHeader, {
      "class": "no-content-header",
    })
    listContainer.appendChild(noContentHeader);
  }
});

addBtn.onclick = () => {
  const note = document.getElementById("highlight-note").value
  let   highlightSelection = window.getSelection();
  let currentURL;

  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    // console.log(tabs[0])
    currentURL = tabs[0].url
  })

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


    data["storedItems"].push(lastNote)
    console.log(data)

    let list = document.getElementsByClassName('stored-text-list')[0]
    updateList(lastNote, list)

    chrome.storage.sync.set(data, (stored_data) => {
      console.log(`Data in storage: ${stored_data}`)
    })
  })
}

function updateList(data_obj, dom_parent) {

  if(typeof data_obj !== 'object') {
    throw "Function updateList has a parameter of type \"object\""
  }

  let listItem = document.createElement("li")
  let head = document.createElement("h3")
  let span = document.createElement("span")

  head.innerHTML = data_obj.note
  span.innerHTML = data_obj.pageUrl

  listItem.appendChild(head)
  listItem.appendChild(span)
  listItem.setAttribute("class", "list-item")

  dom_parent.appendChild(listItem)
}

function setMultipleAttributes(elem, attrs) {
  for(key in attrs) {
    elem.setAttribute(key, attrs[key])
  }
}
