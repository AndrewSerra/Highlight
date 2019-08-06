import { updateContainer } from './helpers.js';

const getIdNumber = (query) => {
  const re = /\d+/;

  return re.exec(query).toString();
}

const getTargetQuery = async (event) => {
  return await new Promise((resolve, reject) => {
    let targetId = event.target.id;
    let targetClassList = event.target.className.split(" ").join(".");

    if(targetClassList === 'project-item') {
      targetClassList = event.target.parentNode.className.split(" ").join(".");
      targetId = event.target.parentNode.id;
      // resolve(`.${targetClassList}`);
    }

    resolve(`#${targetId}.${targetClassList}`);
  })
}

const transferNoteToProject = (projectId, noteId) => {
  chrome.storage.sync.get(['untrackedNotes', 'projects'], (data) => {
    let projects = data.projects;
    let untrackedNotes = data.untrackedNotes;

    projects[projectId].notes.push(untrackedNotes[noteId]);
    untrackedNotes.splice(noteId,1);

    updateContainer('project', projects);
    updateContainer('note-untracked', untrackedNotes);

    chrome.storage.sync.set({projects: projects, untrackedNotes: untrackedNotes});
  })
}

const setHandlers = () => {
  const notesDOM = document.querySelectorAll('.note-list-item');
  const projectsDOM = document.querySelectorAll('.project-tab');

  // DRAG START EVENT FOR UNTRACKED NOTES
  for(let i=0; i < notesDOM.length; i++) {
    notesDOM[i].addEventListener('dragstart', (event) => {
      getTargetQuery(event)
      .then((note) => {
        event.dataTransfer.setData("text/plain", note);
      })
    });
  }

  //  DRAGOVER END AND DROP EVENT FOR PROJECTS
  for(let i=0; i < projectsDOM.length; i++) {
    // console.log(projectsDOM[i])
    projectsDOM[i].addEventListener('dragover', (event) => {
       event.preventDefault();
    })
    projectsDOM[i].addEventListener('drop', (event) => {
      event.preventDefault();
      getTargetQuery(event)
      .then((projectQuery) => {
        const noteQuery = event.dataTransfer.getData("text");
        // console.log('project async');
        // console.log(projectQuery);
        // console.log('note async');
        // console.log(noteQuery);
        const projectId = getIdNumber(projectQuery);
        const noteId = getIdNumber(noteQuery);

        transferNoteToProject(projectId, noteId);
      })
    })
  }
}

export {
  setHandlers
}
