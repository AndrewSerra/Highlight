const setProjectClickHandler = () => {
  const projectTabs = document.querySelectorAll('.project-tab');

  for(let i=0; i < projectTabs.length; i++) {
    projectTabs[i].addEventListener('click', (event) => {
      event.preventDefault();

      let targetId = event.target.id;
      let targetClass = event.target;

      if(targetClass.className === 'project-item') {
        targetClass = event.target.parentNode;
        targetId = event.target.parentNode.id;
      }

    })
  }
}

export {
  setProjectClickHandler
}
