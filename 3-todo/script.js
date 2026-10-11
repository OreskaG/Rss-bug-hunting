const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("task-list");
const counter = document.getElementById("counter");
const errorEl = document.getElementById("error");
const clearBtn = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll(".filter");

let tasks = [];
let currentFilter = "all";
let nextId = 1;

// Fixed: rejects empty or whitespace-only input and adds valid tasks.
function addTask() {
  const text = input.value.trim();
  if (!text) {
    errorEl.hidden = false;
    return;
  }
  errorEl.hidden = true;
  tasks.push({ id: nextId++, text: text, done: false });
  input.value = "";
  render();
}

// Fixed: toggles completion on each click so tasks can be marked or unmarked.
function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;
  task.done = !task.done;
  render();
}

// Fixed: removes the selected task from the stored list before rendering.
function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  render();
}

// Fixed: removes completed tasks while keeping active tasks.
function clearCompleted() {
  tasks = tasks.filter((t) => !t.done);
  render();
}

// Fixed: selects tasks according to the All, Active, or Completed filter.
function getVisibleTasks() {
  if (currentFilter === "active") return tasks.filter((t) => !t.done);
  if (currentFilter === "done") return tasks.filter((t) => t.done);
  return tasks;
}

// Fixed: counts all unfinished tasks, regardless of the selected filter.
function updateCounter() {
  counter.textContent = "Активных задач: " + tasks.filter((t) => !t.done).length;
}

// Fixed: rebuilds the list without duplicates and visits every visible task.
function render() {
  list.replaceChildren();
  const visible = getVisibleTasks();
  for (const task of visible) {
    const li = document.createElement("li");
    li.className = "task";
    if (task.done) {
      // Use the class expected by CSS to display the completed task style.
      li.classList.add("done");
    }

    const span = document.createElement("span");
    span.className = "task__text";
    span.textContent = task.text;
    span.addEventListener("click", () => toggleTask(task.id));

    const del = document.createElement("button");
    del.className = "task__del";
    del.textContent = "✕";
    del.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);
  }
  updateCounter();
}

// Fixed: adds a task on a single click.
addBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click", clearCompleted);

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    render();
  });
});

render();
