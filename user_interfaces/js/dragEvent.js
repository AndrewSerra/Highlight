
const getTargetNote = async (event) => {
  return await new Promise((resolve, reject) => {
    chrome.storage.sync.get('untrackedNotes', (data) => {
      const notes = data.untrackedNotes;
      const targetId = event.target.id;

      resolve({
        target: notes[targetId],
        all: notes
      });
    })
  })
}

const getTargetProject = async (event) => {
  return await new Promise((resolve, reject) => {
    chrome.storage.sync.get('projects', (data) => {
      const projects = data.projects;
      const targetId = event.target.id;

      resolve({
        target: projects[targetId],
        all: projects
      });
    })
  })
}

// TODO: Complete drop event
// TODO: Read about event.dataTransfer.setData
// TODO: Complete notes part
const setHandlers = () => {
  const notesDOM = document.querySelectorAll('.note-list-item');
  const projectsDOM = document.querySelectorAll('.project-item');

  for(let i=0; i < projectsDOM.length; i++) {
    projectsDOM[i].addEventListener('dragover', (event) => {
       event.preventDefault();
    })
    projectsDOM[i].addEventListener('drop', (event) => {

    })
  }

  for(let i=0; i < notesDOM.length; i++) {
    notesDOM[i].addEventListener('dragstart', (event) => {
      getTargetNote(event)
      .then((notes) => {
        console.log(notes.target);
        console.log(notes.all);
        // event.dataTransfer.setData("target", notes.target);
      })
    });
  }
}

export {
  setHandlers
}
