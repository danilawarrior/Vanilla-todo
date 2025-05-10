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
const id = 0;
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
  }
};
