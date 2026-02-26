const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const deletedCount = document.getElementById("deletedCount");
const editedCount = document.getElementById("editedCount");

const sortAscBtn = document.getElementById("sortAsc");
const sortDescBtn = document.getElementById("sortDesc");
const resetBtn = document.getElementById("resetOrder");
const themeToggle = document.getElementById("themeToggle");

let deleted = 0;
let edited = 0;
let originalTasks = [];

/* ---------- ADD TASK ---------- */
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", e => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return alert("Empty task not allowed");

for (let li of taskList.children) {
  const span = li.querySelector("span");
  if (!span) continue;

  if (span.textContent.toLowerCase() === text.toLowerCase()) {
    alert("Duplicate task");
    return;
  }
}


  const li = createTaskElement(text);
  taskList.appendChild(li);

  originalTasks.push(text);
  taskInput.value = "";
  updateCounts();
  save();
}

/* ---------- EDIT TASK ---------- */
function editTask(span) {
  const input = document.createElement("input");
  input.value = span.textContent;
  span.replaceWith(input);
  input.focus();

  input.onkeydown = e => {
    if (e.key === "Enter") saveEdit(input);
  };

  input.onblur = () => saveEdit(input);
}

function saveEdit(input) {
  if (!input.value.trim()) return;

  const span = document.createElement("span");
  span.textContent = input.value.trim();
  span.ondblclick = () => editTask(span);
  span.onclick = () => span.classList.toggle("completed");

  input.replaceWith(span);
  edited++;
  updateCounts();
  save();
}

/* ---------- MULTI DELETE ---------- */
document.addEventListener("keydown", e => {
  if (e.key === "Delete") {
    const selected = document.querySelectorAll(".selected");
    if (!selected.length) return;

    if (confirm(`Delete ${selected.length} tasks?`)) {
      selected.forEach(li => li.remove());
      deleted += selected.length;
      updateCounts();
      save();
    }
  }
});

/* ---------- SORTING ---------- */
sortAscBtn.onclick = () => sortTasks(true);
sortDescBtn.onclick = () => sortTasks(false);

function sortTasks(asc) {
  const items = [...taskList.children];
  items.sort((a, b) =>
    asc
      ? a.innerText.localeCompare(b.innerText)
      : b.innerText.localeCompare(a.innerText)
  );
  taskList.replaceChildren(...items);
}

function createTaskElement(text) {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.onchange = () => {
    span.classList.toggle("completed", checkbox.checked);
    updateCounts();
  };

  const span = document.createElement("span");
  span.textContent = text;
  

  span.ondblclick = () => editTask(span);

  const btn = document.createElement("button");
  btn.textContent = "X";
  btn.onclick = () => {
    if (confirm(`Delete "${span.textContent}"?`)) {
      li.remove();
      deleted++;
      updateCounts();
      save();
    }
  };

  li.append(checkbox, span, btn);
  return li;
}

resetBtn.onclick = () => {
  taskList.innerHTML = "";

  originalTasks.forEach(text => {
    const li = createTaskElement(text);
    taskList.appendChild(li);
  });

  updateCounts();
  save();
};


/* ---------- COUNTERS ---------- */
function updateCounts() {
  totalCount.textContent = taskList.children.length;
  completedCount.textContent = document.querySelectorAll(".completed").length;
  deletedCount.textContent = deleted;
  editedCount.textContent = edited;
}

/* ---------- THEME ---------- */

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");

  // Change icon
  themeToggle.textContent =
    document.body.classList.contains("light") ? "☀️" : "🌙";
});


/* ---------- LOCAL STORAGE ---------- */
function save() {
  const task = [...taskList.children].map(li => li.querySelector("span")?.textContent);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function load() {
  const saved = JSON.parse(localStorage.getItem("tasks") || "[]");
  taskList.innerHTML = "";
  saved.forEach(text => {
    taskList.appendChild(createTaskElement(text));
  });
  updateCounts();
}


load();
