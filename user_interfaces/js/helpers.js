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
  console.log(containerTag)
  let newTab = '';

  // clean container
  containerTag.innerHTML = '';

  if(containerName === 'project') {
    data.forEach((project) => {
      newTab = addProjectTab(project);
      containerTag.appendChild(newTab);
    })
  }
  else if(containerName === 'note') {
    data.forEach((note) => {
      newTab = addNoteTab(note);
      containerTag.appendChild(newTab);
    })
  }
  else if (containerName === 'note-untracked') {
    data.forEach((noteUntracked) => {
      newTab = addUntrackedNoteTab(noteUntracked);
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
const addProjectTab = (project) => {
  // <li class="list-group-item d-flex justify-content-between align-items-center">
  //   Cras justo odio
  //   <span class="badge badge-primary badge-pill">14</span>
  // </li>
  const li = document.createElement('li');

  li.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-center');
  li.innerHTML = (project.name).concat(`<span class="badge badge-primary badge-pill">${project.notes.length}</span>`);

  return li;
}

/**
* Creates a new list item for a note related to a project.
* @param {Object} note
* @return {HTML Tag}
*/
const addNoteTab = (note) => {
  const li = document.createElement('li');

  li.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-center');
  // li.innerHTML = (untrackedNote.note).concat(`<span class="badge badge-primary badge-pill">${project.notes.length}</span>`);
  li.innerHTML = untrackedNote.note;
  return li;
}

/**
* Creates a new list item for a note NOT related to a project.
* @param {Object} data
*/
const addUntrackedNoteTab = (untrackedNote) => {

  // const tag = getContainer('note-untracked');

  // data.forEach((untrackedNote) => {
    const li = document.createElement('li');
    console.log(untrackedNote)
    li.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-center');
    // li.innerHTML = (untrackedNote.note).concat(`<span class="badge badge-primary badge-pill">${project.notes.length}</span>`);
    li.innerHTML = untrackedNote.highlightText;
    // tag.appendChild(li);
    return li;
  // })
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
  return notesStored;
}

export {
  updateContainer,
  setMultipleAttributes,
  isElementDefined,
  isWindowSelected,
  addProject,
  addUntrackedNote,
}
