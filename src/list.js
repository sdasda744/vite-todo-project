import Swal from "sweetalert2";
import { checkedTaskCount } from "./selectors";
import { displayIconsHoverHandler, handleDeleteButton, handleEditButton } from "./handler";

let countID = 1;

// Create a task element and task clone
export const createTaskElement = (task) => {
    const taskTemplateClone = taskTemplate.content.cloneNode(true);
    const taskLists = taskTemplateClone.querySelector(".task-list");
    const taskListHover = taskTemplateClone.querySelectorAll(".task-list");
    // console.log(taskGroupContainer);
    const delTaskButton = taskTemplateClone.querySelector("#delTaskButton");
    const editTaskButton = taskTemplateClone.querySelector("#editTaskButton");

    taskLists.id = "task-" + countID;
    // Assign unique ID for the checkbox
    const inputCheck = taskTemplateClone.querySelector(".task-done-check");
    inputCheck.id = "check-" + countID;
    const taskText = taskTemplateClone.querySelector(".task-text");
    taskText.textContent = task;

    // Add event listener for each checkbox (no delegation)
    inputCheck.addEventListener("click", () => {
        handleCheckboxClick(inputCheck, taskText);
        updateCheckedTaskCount();
    });

    // Delete Task
    delTaskButton.addEventListener("click", () => {
        handleDeleteButton(taskLists);
    });

    // Edit task
    editTaskButton.addEventListener("click", () => {
        handleEditButton(taskLists.id);
    });

    // Display icons hover handler
    taskListHover.forEach((task) => {
        displayIconsHoverHandler(task, inputCheck);
    });

    countID++;

    return taskTemplateClone;
};

// Add a new task
export const addNewTask = (text) => {
    if (text.trim() !== "") {
        const newTask = createTaskElement(text);
        taskGroup.appendChild(newTask);
        taskInput.value = null;
        updateTaskTotalCount();
        updateCheckedTaskCount();
    }
};

// Update task total count
export const updateTaskTotalCount = () => {
    const taskLists = document.querySelectorAll(".task-list");
    totalTaskCount.textContent = taskLists.length;
};

// Update checked task count
export const updateCheckedTaskCount = () => {
    const checkedTasks = document.querySelectorAll(".task-done-check:checked");
    checkedTaskCount.textContent = checkedTasks.length;
};

// Handle Checkbox Click
export const handleCheckboxClick = (checkbox, taskText) => {
    // const delAllTasksButton = document.querySelector("#delTaskButton");
    const displayIcons = checkbox
        .closest(".task-list")
        .querySelector(".display-icons");

    if (checkbox.checked) {
        checkbox.classList.add("bg-green-500", "border-2", "border-white");
        checkbox.classList.remove("bg-white", "border-green");
        taskText.classList.add("line-through");
        displayIcons.classList.add("duration-300");
        displayIcons.classList.add("opacity-100");
    } else {
        checkbox.classList.remove("bg-green-500", "border-white");
        checkbox.classList.add("bg-white", "border-green");
        taskText.classList.remove("line-through");
        displayIcons.classList.add("duration-300");
        displayIcons.classList.remove("opacity-100");
    }
};
