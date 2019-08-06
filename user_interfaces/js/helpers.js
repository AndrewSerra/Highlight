import { setDragHandlers } from './dragEvent.js';

const getIdNumber = (query) => {
  const re = /\d+/;

  return re.exec(query).toString();
}

/**
* Returns the main container that the note is related
* @param {String} name
* @return {HTML Tag}
*/
const getContainer = (name) => {
  const containerName = `.${name}-container ul.list-group`;
  const tag = document.querySelector(containerName);

  return tag
}

/**
* Adds a new tab the the container targeted.
* @param {String} containerName
* @param {Array<Object>} data
*/
const updateContainer = (containerName, data) => {

  const containerTag = getContainer(containerName);
  // console.log(containerTag)
  let newTab = '';

  // clean container
  containerTag.innerHTML = '';

  if(containerName === 'project') {
    data.forEach((project, index) => {
      newTab = addProjectTab(project, index);
      containerTag.appendChild(newTab);
    })
  }
  else if(containerName === 'note') {
    data.forEach((note) => {
      newTab = addNoteTab(note);
      containerTag.appendChild(newTab);
    })
  }
  else if(containerName === 'note-untracked') {
    data.forEach((noteUntracked, index) => {
      newTab = addUntrackedNoteTab(noteUntracked, index);
      containerTag.appendChild(newTab);
    })
  }
  else {
    throw 'helpers.js : Container name is not valid. in updateContainer';
  }
}

// NEEDS COMPLETION
/**
* Creates a new list item for a project.
* @param {Object} project
* @return {HTML Tag}
*/
const addProjectTab = (project, index) => {
  // <li class="list-group-item d-flex justify-content-between align-items-center">
  //   Cras justo odio
  //   <span class="badge badge-primary badge-pill">14</span>
  // </li>
  const li = document.createElement('li');
  const deleteElement = '<span class="delete"><i class="far fa-trash-alt "></i></span>';

  // li.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-center');
  li.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-center project-tab');
  li.setAttribute('id', `project-${project.id}`);
  const liInnerHtml = `<span class="project-item">${project.name}</span><div class="delete-container"><span class="badge badge-primary badge-pill">${project.notes.length}</span>${deleteElement}</div>`
  // li.innerHTML = (project.name).concat(`<div class="delete-container"><span class="badge badge-primary badge-pill">${project.notes.length}</span>${deleteElement}</div>`);
  li.innerHTML = liInnerHtml;

  return li;
}

/**
* Creates a new list item for a note related to a project.
* @param {Object} note
* @return {HTML Tag}
*/
const addNoteTab = (note) => {

}

/**
* Creates a new list item for a note NOT related to a project.
* @param {Object} data
*/
const addUntrackedNoteTab = (untrackedNote, index) => {
    const li = document.createElement('li');

    li.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-center note-list-item');
    li.setAttribute('draggable', true);
    li.setAttribute('id', 'note-'.concat(index));
    // li.setAttribute('ondragstart', `"drag(event)"`)
    // li.innerHTML = (untrackedNote.note).concat(`<span class="badge badge-primary badge-pill">${project.notes.length}</span>`);
    li.innerHTML = `<h6>${untrackedNote.note}</h6><p>${untrackedNote.highlightText}</p>`
    return li;
}
////////////////////

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

const addProject = (newProjectName, projectsStored) => {

  const { id, name } = projectsStored[projectsStored.length - 1];
  let newId;

  if(projectsStored.length === 0) {
    newId = 0;
  }
  newId = id + 1;

  const newProject = {
    id: newId,
    name: newProjectName,
    notes: []
  }

  projectsStored.push(newProject);

  updateContainer('project', projectsStored);
  return projectsStored;
}

const addUntrackedNote = (newNote, notesStored) => {

  notesStored.push(newNote);

  updateContainer('note-untracked', notesStored);
  setDragHandlers();
  return notesStored;
}

const removeProject = (projectId, projectsStored) => {

  let projectsStoredCopy = projectsStored;

  projectsStoredCopy.forEach((project, index) => {
    if(project.id === projectId) {
      projectsStoredCopy.splice(index, 1);
    }
  })
  updateContainer('project', projectsStoredCopy);
  return projectsStoredCopy;
}

export {
  getIdNumber,
  updateContainer,
  setMultipleAttributes,
  isElementDefined,
  isWindowSelected,
  addProject,
  addUntrackedNote,
  removeProject
}
