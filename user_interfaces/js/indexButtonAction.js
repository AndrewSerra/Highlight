import {
  updateContainer,
  addProject
} from './helpers.js';

const selectionOptions = {
  1: "Project",
  2: "Note",
}
const addBtn = document.getElementById("addBtn");

addBtn.onclick = () => {

  const selectionType = document.getElementById("selectionType").value;

  let inputBoxText = document.getElementById("newNameField").value;
  let storedArr;

  if (selectionOptions[selectionType] === "Project") {
    chrome.storage.sync.get('projects', (data) => {
      const projects = data.projects;
      let isProjectCreated = false;

      projects.forEach((project) => {
        // exit if already created
        if (project.name === inputBoxText) {
          isProjectCreated = true;
          alert("Project is already created");
        }
      })
      storedArr = addProject(inputBoxText, projects);
      chrome.storage.sync.set({
        "projects": storedArr
      });
    });
  } else {
    alert("Please select an option where it says \"Choose\"");
  }
}

document.body.onload = () => {
  chrome.storage.sync.get('projects', (data) => {
    updateContainer('project', data.projects);
  })
}
