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
    taskCard.className = 'task__card';
    taskCard.innerHTML = `
          <input  class="tasks__checkbox" 
          type="checkbox" data-task-id="${task.id}"  ${task.completed ? 'checked' : ''} />
          <button id="moreTaskBtn" class="more-button">⋮</button>
          <div class="task__dropdown-menu">
            <button id="taskEditBtn" class="edit-btn">Редактировать</button>
            <button id="taskDeleteBtn" class="delete-btn">Удалить</button>
          </div>
          <p class="tasks__text">${task.text}</p>
          `;
    tasksPlacement.appendChild(taskCard);

    const checkbox = taskCard.querySelector('.tasks__checkbox');
    checkbox.addEventListener('change', event => {
      const taskId = parseInt(event.target.dataset.taskId);
      const isChecked = event.target.checked;
      changeCheckbox(taskId, isChecked); // Передаём ID и статус
    });
  });
}
function changeCheckbox(taskId, isChecked) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.map(task => (task.id === taskId ? { ...task, completed: isChecked } : task));
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
