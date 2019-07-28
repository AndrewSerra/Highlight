/**
* Returns the main container that the note is related
* @param {String} name
* @return {HTML Tag}
*/
const getContainer = (name) => {
  const containerName = `.${name}-container ul.list-group`;
  const tag = document.querySelector(containerName);

  console.log(typeof tag);

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

  if(name === 'project') {
    data.forEach((project) => {
      newTab = addProjectTab(project);
      containerTag.appendChild(newTab);
    })
  }
  else if(name === 'note') {
    data.forEach((note) => {
      newTab = addNoteTab(data);
      containerTag.appendChild(newTab);
    })
  }
  else if (name === 'note-untracked') {
    data.forEach((note_untracked) => {
      newTab = addUntrackedNoteTab(data);
      containerTag.appendChild(newTab);
    })
  }
  else {
    throw 'Container name is not valid.';
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
const addUntrackedNoteTab = (data) => {

  const tag = getContainer('note-untracked');

  data.forEach((untrackedNote) => {
    const li = document.createElement('li');

    li.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-center');
    // li.innerHTML = (untrackedNote.note).concat(`<span class="badge badge-primary badge-pill">${project.notes.length}</span>`);
    li.innerHTML = untrackedNote.highlight_text;
    tag.appendChild(li);
  })
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

export {
  updateContainer,
  setMultipleAttributes,
  isElementDefined,
  isWindowSelected,
  addProject,
  addUntrackedNoteTab,
}
