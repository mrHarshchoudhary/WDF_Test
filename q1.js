// Select DOM elements
const taskInput = document.getElementById('taskInput');
const taskDate = document.getElementById('taskDate');
const addTaskBtn = document.getElementById('addTaskBtn');
const filterInput = document.getElementById('filterInput');
const sortBtn = document.getElementById('sortBtn');
const taskList = document.getElementById('taskList');

// Array to hold tasks
let tasks = [];

// Add Task
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  const taskDueDate = taskDate.value;

  if (taskText === '' || taskDueDate === '') {
    alert('Please enter both a task and a date.');
    return;
  }

  const task = { text: taskText, date: taskDueDate };
  tasks.push(task);
  renderTasks();
  taskInput.value = '';
  taskDate.value = '';
});

// Delete Task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Render Tasks
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${task.text} - ${task.date}</span>
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

// Filter Tasks
filterInput.addEventListener('input', () => {
  const filterText = filterInput.value.toLowerCase();
  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(filterText)
  );

  taskList.innerHTML = '';
  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${task.text} - ${task.date}</span>
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(li);
  });
});

// Sort Tasks by Date
sortBtn.addEventListener('click', () => {
  tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
  renderTasks();
});
