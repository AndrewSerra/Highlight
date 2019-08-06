import {
  updateContainer,
  addProject,
  addUntrackedNote
} from './helpers.js';
import { getSelection } from './getSelection.js';
import { setHandlers } from './dragEvent.js';

const selectionOptions = {
  1: "Project",
  2: "Note",
}
const addBtn = document.getElementById('addBtn');

// adding note or project button
addBtn.onclick = (event) => {

  event.preventDefault();

  const selectionType = document.getElementById("selectionType").value;

  let inputBoxText = document.getElementById("newNameField").value;
  let storedArr;

  if (selectionOptions[selectionType] === "Project") {
    chrome.storage.sync.get('projects', (data) => {
      const projects = data.projects;
      let isProjectCreated = false;

      projects.forEach((project) => {
        // exit if note is already created
        if (project.name === inputBoxText) {
          isProjectCreated = true;
          alert("Project is already created");
        }
      })
      storedArr = addProject(inputBoxText, projects);
      chrome.storage.sync.set({"projects": storedArr});
    });
  }
  else if(selectionOptions[selectionType] === "Note") {
    // TODO: NEEDS COMPLETION
    getSelection(inputBoxText).then((lastNote) => {
      console.log(lastNote)
      chrome.storage.sync.get('untrackedNotes', (data) => {
        const untrackedNotes = data.untrackedNotes;

        storedArr = addUntrackedNote(lastNote, untrackedNotes);
        chrome.storage.sync.set({'untrackedNotes': storedArr});
      });
    })
  }
  else {
    alert("Please select an option where it says \"Choose\"");
  }
}

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['projects', 'untrackedNotes'], (data) => {
    updateContainer('project', data.projects);
    updateContainer('note-untracked', data.untrackedNotes);

    setHandlers();
  })
});
