/**
 * Returns true if the entered string is empty.
 * @param {String} note
 * @return {Boolean}
 */
const isNoteEmpty = (note) => {
  return note.trim().length === 0 ? true : false;
}

/**
 * Checks if the note is already created.
 * @param {Object} newNote
 * @param {Array<Object>} stored
 * @return {Boolean}
 */
const isNoteDuplicate = (newNote, stored) => {

  let isCreated = false;

  stored.forEach((item) => {
    if ((newNote.highlightText === item.highlightText && newNote.tag === item.tag) ||
      newNote.pageUrl === item.pageUrl) {
      isCreated = true;
    }
  })
  return isCreated;
}

/**
 * Sends content script to webpage and receives
 * the highlighted section.
 * @param {String} note
 */
export const getSelection = async (note) => {

  let promise = new Promise((resolve, reject) => {
      let lastNote;
      let highlightSelection;
      let tagSelection;
      let currentURL;

      const executeScriptObj = {
        file: "user_interfaces/js/contentScripts/selectionInjection.js",
      }
      // get the selection and text
      chrome.tabs.executeScript(null, executeScriptObj, (results) => {
        if (chrome.runtime.lastError || !results || !results.length) {
          return; // Permission error, tab closed, etc.
        }
      });
      // get the active tab url
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, (tabs) => {
        currentURL = tabs[0].url;
      });

      chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log(sender.tab ?
          "from a content script:" + sender.tab.url :
          "from the extension");

        highlightSelection = request.msg;
        tagSelection = request.tag;

        console.log(highlightSelection)

        lastNote = {
          note: note,
          pageUrl: currentURL,
          highlightText: highlightSelection,
          tag: tagSelection,
          projectId: null,
        }
        resolve(lastNote);
      });
    });

    return await promise;
}
