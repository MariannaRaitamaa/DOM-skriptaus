document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo');
    const input = document.getElementById('input');
    const todoList = document.getElementById('todo-lista');
   
    form.addEventListener('submit', (event) => {
      event.preventDefault();
   
      const taskText = input.value.trim();
   
      // Tarkistetaan syötetyn tekstin kelvollisuus
      if (!taskText || taskText.length < 3) {
        input.classList.add('error');
        return;
      }
   
      // Poistetaan virheellinen syöte
      input.classList.remove('error');
   
      // Lisätään tehtävä listalle
      const li = document.createElement('li');
      li.innerHTML = `
        ${taskText}
  <button class="done-btn">Valmis</button>
  <button class="delete-btn">Poista</button>
      `;
      todoList.appendChild(li);
   
      // Tyhjennetään syöttökenttä
      input.value = '';
    });
   
    todoList.addEventListener('click', (event) => {
      if (event.target.classList.contains('done-btn')) {
        event.target.closest('li').classList.toggle('done');
      }
   
      if (event.target.classList.contains('delete-btn')) {
        event.target.closest('li').remove();
      }
    });
  });