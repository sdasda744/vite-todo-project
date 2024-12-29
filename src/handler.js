import Swal from "sweetalert2";
import {
    addNewTask,
    handleCheckboxClick,
    updateCheckedTaskCount,
    updateTaskTotalCount,
} from "./list";

// Add new Task with Button
export const addTaskButtonHandler = () => {
    addNewTask(taskInput.value);
};

// Add new Task with input enter key
export const addTaskInputHandler = (event) => {
    if (event.key === "Enter") addNewTask(taskInput.value);
};

// Delete all tasks
export const delAllTasksHandler = () => {
    const taskLists = document.querySelectorAll(".task-list");
    Swal.fire({
        title: "Are you sure want to remove all tasks?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
            taskLists.forEach((taskList, index) => {
                // Add animation class with a delay using setTimeout
                setTimeout(() => {
                    taskList.classList.add(
                        "animate__animated",
                        "animate__zoomOutRight"
                    );

                    // Listen for the animation end before removing the element
                    taskList.addEventListener("animationend", () => {
                        taskList.remove();
                        updateTaskTotalCount();
                        updateCheckedTaskCount();
                    });
                }, index * 300); // Delay increases by 300ms for each task
            });
        }
    });
};

// Select all tasks
export const selAllTasksHandler = () => {
    const taskLists = document.querySelectorAll(".task-list");
    const allChecked = Array.from(taskLists).every((taskList) => {
        return taskList.querySelector(".task-done-check").checked;
    });

    taskLists.forEach((taskList) => {
        const inputCheck = taskList.querySelector(".task-done-check");
        const taskText = taskList.querySelector(".task-text");

        if (allChecked) {
            // Deselect all if everything was checked
            inputCheck.checked = false;
        } else {
            // Select all if anything was unchecked
            inputCheck.checked = true;
        }

        handleCheckboxClick(inputCheck, taskText);
    });

    updateCheckedTaskCount();
};

// Display icons hover handler
export const displayIconsHoverHandler = (task, checkbox) => {
    const displayIcons = task.querySelector(".display-icons");
    const handleMouseOver = () => {
        displayIcons.classList.add("duration-300");
        displayIcons.classList.add("opacity-100");
        displayIcons.classList.remove("opacity-0");
    };

    const handleMouseLeave = () => {
        displayIcons.classList.add("duration-300");
        displayIcons.classList.remove("opacity-100");
        displayIcons.classList.add("opacity-0");
    };

    task.addEventListener("mouseover", () => {
        if (!checkbox.checked) {
            handleMouseOver();
        }
    });

    task.addEventListener("mouseleave", () => {
        if (!checkbox.checked) {
            handleMouseLeave();
        }
    });
};

// Edit task
export const handleEditButton = (taskID) => {
    const currentTaskID = document.querySelector(`#${taskID}`);
    // const taskList = currentTaskID.querySelector(".task-list");
    const taskText = currentTaskID.querySelector(".task-text");
    const taskDoneCheck = currentTaskID.querySelector(".task-done-check");
    const editTaskButton = currentTaskID.querySelector(".edit-Task-Button");
    const delTaskButton = currentTaskID.querySelector(".del-Task-Button");
    const displayIcons = currentTaskID.querySelector(".display-icons");
    const editTaskButtonBorder = currentTaskID.querySelector(
        ".edit-Task-Button-Border"
    );
    const delTaskButtonBorder = currentTaskID.querySelector(
        ".edit-Task-Button-Border"
    );
    const newTaskInput = document.createElement("input");

    taskDoneCheck.setAttribute("disabled", true);
    editTaskButton.setAttribute("disabled", true);
    delTaskButton.setAttribute("disabled", true);

    editTaskButton.classList.remove("hover:scale-110", "duration-200");
    editTaskButton.classList.add("scale-75", "opacity-60");
    editTaskButtonBorder.classList.add("scale-75", "opacity-60");

    delTaskButton.classList.remove("hover:scale-110", "duration-200");
    delTaskButton.classList.add("scale-75", "opacity-60");
    delTaskButtonBorder.classList.remove("scale-75", "opacity-60");
    // displayIcons.classList.add("hidden");

    const currentTaskText = taskText.textContent;
    newTaskInput.className =
        "border border-stone-950 font-poppins px-2 py-1 w-[180px] focus-visible:outline-none";

    newTaskInput.value = currentTaskText;
    taskText.classList.add("hidden");
    taskText.after(newTaskInput);
    newTaskInput.focus();
    // taskText.classList.add("hidden");
    // newTaskInput.addEventListener("blur", () => {
    //     taskDoneCheck.removeAttribute("disabled", true);
    //     editTaskButton.removeAttribute("disabled", true);
    //     delTaskButton.removeAttribute("disabled", true);
    //     displayIcons.classList.remove("hidden");
    //     taskText.textContent = newTaskInput.value;
    //     taskText.classList.remove("hidden");
    //     newTaskInput.remove();
    // });

    newTaskInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            if (newTaskInput.value.trim() !== "") {
                taskText.textContent = newTaskInput.value;

                taskText.classList.remove("hidden");
                newTaskInput.remove();

                taskDoneCheck.removeAttribute("disabled", true);
                editTaskButton.removeAttribute("disabled", true);
                delTaskButton.removeAttribute("disabled", true);

                editTaskButton.classList.remove("scale-75", "opacity-60");
                editTaskButtonBorder.classList.remove("scale-75", "opacity-60");
                delTaskButton.classList.remove("scale-75", "opacity-60");
                delTaskButtonBorder.classList.remove("scale-75", "opacity-60");
            }
        }
        if (event.key === "Escape") {
            taskText.textContent = currentTaskText;

            taskText.classList.remove("hidden");
            newTaskInput.remove();

            taskDoneCheck.removeAttribute("disabled");
            editTaskButton.removeAttribute("disabled");
            delTaskButton.removeAttribute("disabled");

            editTaskButton.classList.remove("scale-75", "opacity-60");
            editTaskButtonBorder.classList.remove("scale-75", "opacity-60");
            delTaskButton.classList.remove("scale-75", "opacity-60");
            delTaskButtonBorder.classList.remove("scale-75", "opacity-60");
        }
    });
};

// Delete task
export const handleDeleteButton = (taskList) => {
    console.log("delete");
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
            taskList.classList.add(
                "animate__animated",
                "animate__zoomOutRight"
            );
            taskList.addEventListener("animationend", () => {
                taskList.remove();
                updateTaskTotalCount();
                updateCheckedTaskCount();
            });
        }
    });
};
