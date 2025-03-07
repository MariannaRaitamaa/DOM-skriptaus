document.addEventListener("DOMContentLoaded", loadTasks);

const taskInput = document.getElementById("name");
const taskList = document.getElementById("taskList");
const addTaskBtn = document.getElementById("addTaskBtn");

addTaskBtn.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText.length < 4) {
        alert("Sana on liian lyhyt");
        taskInput.classList.add("error");
        return;
    }
    taskInput.classList.remove("error");

    const task = { text: taskText, completed: false };
    saveTaskToLocalStorage(task);
    taskInput.value = "";
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = "";

    const tasks = getTasksFromLocalStorage();

    tasks.forEach((task, index) => {
        const taskContainer = document.createElement("div");
        taskContainer.classList.add("task-container");

        // Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleTaskCompletion(index));

        // Tehtävän teksti
        const taskText = document.createElement("span");
        taskText.textContent = task.text;
        if (task.completed) {
            taskText.style.textDecoration = "line-through";
        }

        // Poistonappi
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑";
        deleteBtn.addEventListener("click", () => removeTask(index));

        taskContainer.appendChild(checkbox);
        taskContainer.appendChild(taskText);
        taskContainer.appendChild(deleteBtn);

        taskList.appendChild(taskContainer);
    });
}

function toggleTaskCompletion(index) {
    const tasks = getTasksFromLocalStorage();
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function removeTask(index) {
    const tasks = getTasksFromLocalStorage();
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

function saveTaskToLocalStorage(task) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function loadTasks() {
    renderTasks();
}
