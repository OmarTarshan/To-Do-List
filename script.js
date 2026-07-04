let addTaskBtn = document.querySelector(".btn");
let input = document.querySelector(".input");
let tasksContainer = document.querySelector(".tasks");

function createTaskElement(text) {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";

    const checkSpan = document.createElement("span");
    checkSpan.className = "check-circle";
    checkSpan.setAttribute("role", "button");
    checkSpan.setAttribute("aria-label", "Mark task done");
    taskDiv.appendChild(checkSpan);

    const textSpan = document.createElement("span");
    textSpan.className = "non-comp-task-text";
    textSpan.textContent = text;
    taskDiv.appendChild(textSpan);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.type = "button";
    deleteBtn.textContent = "×";
    deleteBtn.setAttribute("aria-label", "Delete task");
    taskDiv.appendChild(deleteBtn);

    return taskDiv;
}

function addTask() {
    const taskText = input.value.trim();
    if (!taskText) return;

    tasksContainer.appendChild(createTaskElement(taskText));
    input.value = "";
    input.focus();
}

addTaskBtn.addEventListener("click", addTask);
input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") addTask();
});

tasksContainer.addEventListener("click", function (event) {
    const task = event.target.closest(".task, .comp-task");
    if (!task || !tasksContainer.contains(task)) return;

    if (event.target.classList.contains("delete-btn")) {
        task.remove();
        return;
    }

    if (event.target.closest(".check-circle, .checked-circle")) {
        const isDone = task.classList.toggle("comp-task");
        task.classList.toggle("task", !isDone);

        const textSpan = task.querySelector(".non-comp-task-text, .comp-task-text");
        if (textSpan) {
            textSpan.className = isDone ? "comp-task-text" : "non-comp-task-text";
        }

        const circle = task.querySelector(".check-circle, .checked-circle");
        if (circle) {
            circle.className = isDone ? "checked-circle" : "check-circle";
        }
    }
});

