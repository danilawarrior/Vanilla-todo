// срабатывает при html документ загружен но не все ресурсы загрузились(например img)
document.addEventListener('DOMContentLoaded', function () {
  renderTasks();
});

const tasksModal = document.getElementById('tasksModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeTasksModalBtn = document.getElementById('closeTasksModalBtn');
openModalBtn.onclick = function () {
  tasksModal.style.display = 'flex';
};

closeTasksModalBtn.onclick = function () {
  tasksModal.style.display = 'none';
};

window.onclick = function (event) {
  if (event.target === tasksModal) {
    tasksModal.style.display = 'none';
  }
};

const saveTaskModalBtn = document.getElementById('saveTaskModalBtn');
const textareaTasksModal = document.getElementById('textareaTasksModal');

saveTaskModalBtn.onclick = function () {
  if (textareaTasksModal.value.trim().length === 0) {
    alert('Вы не написали задачу(');
  } else {
    const task = {
      id: Date.now(), //хранится как цифры непонятные, отлично подойдет для id
      text: textareaTasksModal.value,
      completed: false,
      createAt: new Date().toISOString(),
    };
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
    textareaTasksModal.value = '';
    renderTasks();
  }
};

function renderTasks() {
  const tasksPlacement = document.getElementById('tasksPlacement');
  tasksPlacement.innerHTML = '';
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => {
    const taskCard = document.createElement('div');
    taskCard.id = 'taskCard';
    taskCard.className = 'tasks__card';
    taskCard.innerHTML = `
          <input class="tasks__checkbox" type="checkbox" />
          <button id="moreTaskBtn" class="more-button">⋮</button>
          <p class="tasks__text">${task.text}</p>

          <div class="tasks__dropdown-menu">
            <button class="edit-btn">Редактировать</button>
            <button class="delete-btn">Удалить</button>
          </div>
          `;
    tasksPlacement.appendChild(taskCard);
  });

  //TODO: сейчас кнопка : работает только к первой задаче
  const moreTaskBtn = document.querySelector('.more-button');
  const dropDownMenuTask = document.querySelector('.tasks__dropdown-menu');

  moreTaskBtn.addEventListener('click', e => {
    e.stopPropagation();
    dropDownMenuTask.style.display = dropDownMenuTask.style.display === 'block' ? 'none' : 'block';
  });
}
