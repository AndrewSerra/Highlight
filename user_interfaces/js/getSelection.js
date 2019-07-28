const isNoteEmpty = (note) => {
  return note.trim().length === 0 ? true : false;
}

const isNoteDuplicate = (newNote, stored) => {

  let isCreated = false;

  stored.forEach((item) => {
    if((newNote.highlight_text === item.highlight_text && newNote.tag === item.tag) ||
        newNote.pageUrl === item.pageUrl) {
          isCreated = true;
    }
  })

  return isCreated;
}

export const getSelection = (note) => {

  const executeScriptObj = {
    file: "user_interfaces/js/contentScripts/selectionInjection.js",
  }
  let lastNote;
  let highlightSelection;
  let tagSelection;
  let currentURL;

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
    chrome.storage.sync.get('untrackedNotes', (data) => {
      lastNote = {
        note: note,
        pageUrl: currentURL,
        highlight_text: highlightSelection,
        tag: tagSelection,
        projectId: null,
      }

      if(isNoteDuplicate(lastNote, data.untrackedNotes)){
        alert("This selection is already saved.");
      }
      else {
        data.untrackedNotes.push(lastNote);
        chrome.storage.sync.set(data);
      }
    })
  });
}
