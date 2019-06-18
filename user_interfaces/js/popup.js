let listContainer = document.getElementsByClassName('stored-text')[0]
let addBtn = document.getElementById('add-button')

chrome.storage.sync.get('storedItems', function(data) {
  console.log(data)

  // check if the array is empty
  if(data["storedItems"].length !== 0) {
    // create dom elements for each object
    data["storedItems"].forEach((elem) => {

      let list = document.createElement("ul")
      list.setAttribute("class", "stored-text-list");
      updateList(elem, list)
      listContainer.appendChild(list)
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
  let   highlightSelection = window.getSelection();
  let currentURL;

  // get the active tab
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    // console.log(tabs[0])
    currentURL = tabs[0].url
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
    console.log(data)

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
      console.log(stored_data)
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
