let list = document.getElementsByClassName('stored-text-list')[0]
let addBtn = document.getElementById('add-button')

chrome.storage.sync.get('storedItems', function(data) {
  console.log(data)

  data["storedItems"].forEach((elem) => {
    let listItem = document.createElement("li")
    let head = document.createElement("h3")
    let span = document.createElement("span")

    head.innerHTML = elem.note
    span.innerHTML = elem.pageUrl

    listItem.appendChild(head)
    listItem.appendChild(span)

    listItem.setAttribute("class", "list-item")

    list.appendChild(listItem)
  })
});

addBtn.onclick = () => {
  const note = document.getElementById("highlight-note").value
  let highlightSelection = window.getSelection()
  let currentURL = document.URL


  chrome.storage.sync.get('storedItems', (data) => {
    data["storedItems"].push({
      note: note,
      pageUrl: currentURL,
      highlight_text: highlightSelection
    })
    console.log(data)
  })
}
