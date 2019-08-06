import { setDragHandlers } from './dragEvent.js';
import { setDeleteProjectHandler } from './deleteProject.js';

const setHandlers = () => {
  setDragHandlers();
  setDeleteProjectHandler();
}

export {
  setHandlers
}
