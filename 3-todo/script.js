const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('task-list');
const counter = document.getElementById('counter');
const errorEl = document.getElementById('error');
const clearBtn = document.getElementById('clear-completed');
const filterButtons = document.querySelectorAll('.filter');

let tasks = [];
let currentFilter = 'all';
let nextId = 1;

function addTask() {
  const text = input.value.trim();
  if (!text) {
    errorEl.hidden = false;
    return;
  }
  errorEl.hidden = true;
  tasks.push({ id: nextId, text, done: false });
  nextId += 1;
  input.value = '';
  render();
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) task.done = !task.done;
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  render();
}

function clearCompleted() {
  tasks = tasks.filter((t) => !t.done);
  render();
}

function getVisibleTasks() {
  if (currentFilter === 'active') return tasks.filter((t) => !t.done);
  if (currentFilter === 'done') return tasks.filter((t) => t.done);
  return tasks;
}

function updateCounter() {
  const active = tasks.filter((t) => !t.done).length;
  counter.textContent = `Активных задач: ${active}`;
}

function render() {
  list.innerHTML = '';

  const visible = getVisibleTasks();

  for (let i = 0; i < visible.length; i += 1) {
    const task = visible[i];

    const li = document.createElement('li');
    li.className = 'task';
    if (task.done) li.classList.add('done');

    const span = document.createElement('span');
    span.className = 'task__text';
    span.textContent = task.text;
    span.addEventListener('click', () => toggleTask(task.id));

    const del = document.createElement('button');
    del.className = 'task__del';
    del.textContent = '✕';
    del.addEventListener('click', () => deleteTask(task.id));

    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);
  }
  updateCounter();
}

addBtn.addEventListener('click', addTask);
clearBtn.addEventListener('click', clearCompleted);

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    render();
  });
});

render();
