import { addTaskButtonHandler, addTaskInputHandler, delAllTasksHandler, selAllTasksHandler } from "./handler";
import { addTaskButton, delAllTasksButton, selAllTasksButton, taskInput } from "./selectors";

const listener = () => {
    addTaskButton.addEventListener("click", addTaskButtonHandler);
    taskInput.addEventListener("keydown", addTaskInputHandler);
    delAllTasksButton.addEventListener("click", delAllTasksHandler);
    selAllTasksButton.addEventListener("click", selAllTasksHandler);

};

export default listener;
