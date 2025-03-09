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
    const taskText = taskInput.value.trim();
    console.log("Lisätään tehtävä:", taskText);
    

    //Virheilmoitus liian lyhyestä sanasta
    if (taskText.length < 3) {
        console.log("Liian lyhyt sana");
        alert("Sana on liian lyhyt");
        taskInput.classList.add("error");
        return;
    }

    //Palauttaa syöttökentän normaalitilaan
    taskInput.classList.remove("error");

    //Luodaan tehtävä ja tallennetaan LocalStorageen
    const task = { text: taskText, completed: false };
    saveTaskToLocalStorage(task);
    taskInput.value = "";
    taskInput.focus();
    renderTasks();
}
//Rakentaa tehtävälistan
function renderTasks() {
    Tehtävälista.innerHTML = "";

    // Haetaan tehtävät LocalStoragesta
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

        Tehtävälista.appendChild(taskContainer);
    });
}

//Muokkaa tehtävän tilaa
function toggleTaskCompletion(index) {
    console.log("Tehtävän tila muutettu");
    let tasks = getTasksFromLocalStorage();
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks(); // Päivitetään koko lista oikein
}


//Poistaa tehtävän
function removeTask(index) {
    console.log("Tehtävä poistettu");
    const tasks = getTasksFromLocalStorage();
    // Poistetaan tehtävälistasta
    tasks.splice(index, 1);
    // Tallennetaan uusi lista LocalStorageen
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Päivitetään koko tehtävälista
    renderTasks();
}

//Tallennus LocalStorageen
function saveTaskToLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(`Tallennetaan tehtävä "${task.text}" LocalStorageen. Yhteensä: ${tasks.length} tehtävää.`);
}


//Hakee tehtävät LocalStoragesta
function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

//Lataa tehtävät
function loadTasks() {
    console.log("Ladataan tehtävät");
    renderTasks();
}