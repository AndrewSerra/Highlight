import { setDragHandlers } from './dragEvent.js';
import { setDeleteProjectHandler } from './deleteProject.js';
import { setProjectClickHandler } from './redirectProject.js';

const setHandlers = () => {
  setDragHandlers();
  setDeleteProjectHandler();
  setProjectClickHandler();
}

export {
  setHandlers
}
