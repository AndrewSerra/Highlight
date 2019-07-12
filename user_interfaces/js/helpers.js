const updateList = (data_obj, dom_parent) => {

  if(typeof data_obj !== 'object') {
    throw "Function updateList has a parameter of type \"object\""
  }

  let listItem = document.createElement("li")

  // unslided view of the tab
  let divHead = document.createElement("div")
  let head = document.createElement("h3")
  let span = document.createElement("span")

  // slided view of the tab
  let divHighlight = document.createElement("div")
  let p = document.createElement("p")

  head.innerHTML = data_obj.note
  span.innerHTML = data_obj.pageUrl
  p.innerHTML = data_obj.highlight_text

  divHead.setAttribute("class", "list-item-div note")
  divHighlight.setAttribute("class", "list-item-div highlight")

  divHead.appendChild(head)
  divHead.appendChild(span)
  listItem.appendChild(divHead)

  divHighlight.appendChild(p)
  listItem.appendChild(divHighlight)

  listItem.setAttribute("class", "list-item")

  dom_parent.appendChild(listItem)
}

const setMultipleAttributes = (elem, attrs) => {
  for(let key in attrs) {
    elem.setAttribute(key, attrs[key])
  }
}

const isElementDefined = (elem) => {
  if(elem === undefined) {
    return false;
  }
  return true;
}

const isWindowSelected = (tab) => {
  if (tab.selected === true ) {
    return true;
  }

  return false;
}

export {
  updateList,
  setMultipleAttributes,
  isElementDefined,
  isWindowSelected,
}
