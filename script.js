document.addEventListener("DOMContentLoaded", loadTasks);

/* Muuttujien määrittelyt */
const Lomake = document.getElementById("Lomake");
const taskInput = document.getElementById("tehtävä");
const Tehtävälista = document.getElementById("Tehtävälista");

//Lomakkeen lähetys
Lomake.addEventListener("submit", function(event) {
    event.preventDefault(); // Estää lomakkeen oletusarvoisen lähettämisen
    addTask();
});

//Lisää tehtävä
function addTask() {
    console.log("Kenttä aktivoitu");
    const taskText = taskInput.value.trim();
    console.log("Tehtävä syötetty", taskText);

    //Virheilmoitus liian lyhyestä sanasta
    if (taskText.length < 3) {
        console.log("Liian lyhyt sana");
        alert("Sana on liian lyhyt");
        taskInput.classList.add("error");
        return;
    }

    //Palauttaa syöttökentän normaalitilaan
    taskInput.classList.remove("error");
    console.log("Tehtävä lisätty", taskText);

    //Luodaan tehtävä ja tallennetaan LocalStorageen
    const task = { text: taskText, completed: false };
    saveTaskToLocalStorage(task);
    taskInput.value = "";
    taskInput.focus();
    renderTasks();
}
//Rakentaa tehtävälistan
function renderTasks() {
    console.log("Rakennetaan tehtävälista");
    Tehtävälista.innerHTML = "";

    // Haetaan tehtävät LocalStoragesta
    const tasks = getTasksFromLocalStorage();
    console.log("Tehtäviä löytyi", tasks.length);

    tasks.forEach((task, index) => {
        console.log("Tehtävä näkyville listaan", task);
        const taskContainer = document.createElement("div");
        taskContainer.classList.add("task-container");

        // Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        console.log("Tehtävä valmis");
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

        Tehtävälista.appendChild(taskContainer);
    });
}

//Muokkaa tehtävän tilaa
function toggleTaskCompletion(index) {
    console.log("Tehtävän tila muutettu");
    const tasks = getTasksFromLocalStorage();
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

//Poistaa tehtävän
function removeTask(index) {
    console.log("Tehtävä poistettu");
    const tasks = getTasksFromLocalStorage();
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

//Tallennus LocalStorageen
function saveTaskToLocalStorage(task) {
    console.log("Tehtävä tallennettu", task);
    let tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("Tallennettu Local Storageen:", tasks);
}


//Hakee tehtävät LocalStoragesta
function getTasksFromLocalStorage() {
    console.log("Haetaan tehtävät LocalStoragesta");
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

//Lataa tehtävät
function loadTasks() {
    console.log("Ladataan tehtävät");
    renderTasks();
}