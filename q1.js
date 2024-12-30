document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const dateInput = document.getElementById('dateInput');
  const categoryInput = document.getElementById('categoryInput');
  const addTaskBtn = document.getElementById('addTask');
  const filterInput = document.getElementById('filterInput');
  const filterCategory = document.getElementById('filterCategory');
  const sortDateBtn = document.getElementById('sortDate');
  const sortCategoryBtn = document.getElementById('sortCategory');
  const taskList = document.getElementById('taskList');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  let editingIndex = -1;

  function renderTasks() {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
          const li = document.createElement('li');
          li.innerHTML = `
              <div class="task-info">
                  <span>${task.text}</span>
                  <div class="task-category">${task.category} - Due: ${task.date}</div>
              </div>
              <div class="task-actions">
                  <button class="edit-btn" onclick="editTask(${index})">Edit</button>
                  <button onclick="deleteTask(${index})">Delete</button>
              </div>
          `;
          taskList.appendChild(li);
      });
      saveTasks();
  }

  function addTask() {
      const text = taskInput.value.trim();
      const date = dateInput.value;
      const category = categoryInput.value;

      if (text && date && category) {
          if (editingIndex === -1) {
              tasks.push({ text, date, category });
          } else {
              tasks[editingIndex] = { text, date, category };
              editingIndex = -1;
              addTaskBtn.textContent = 'Add Task';
          }
          renderTasks();
          resetForm();
      } else {
          alert('Please fill in all fields');
      }
  }

  function editTask(index) {
      const task = tasks[index];
      taskInput.value = task.text;
      dateInput.value = task.date;
      categoryInput.value = task.category;
      editingIndex = index;
      addTaskBtn.textContent = 'Update Task';
  }

  function deleteTask(index) {
      tasks.splice(index, 1);
      renderTasks();
  }

  function resetForm() {
      taskInput.value = '';
      dateInput.value = '';
      categoryInput.value = '';
  }

  function filterTasks() {
      const filterText = filterInput.value.toLowerCase();
      const filterCat = filterCategory.value;
      const filteredTasks = tasks.filter(task => 
          task.text.toLowerCase().includes(filterText) &&
          (filterCat === '' || task.category === filterCat)
      );
      renderFilteredTasks(filteredTasks);
  }

  function renderFilteredTasks(filteredTasks) {
      taskList.innerHTML = '';
      filteredTasks.forEach((task, index) => {
          const li = document.createElement('li');
          li.innerHTML = `
              <div class="task-info">
                  <span>${task.text}</span>
                  <div class="task-category">${task.category} - Due: ${task.date}</div>
              </div>
              <div class="task-actions">
                  <button class="edit-btn" onclick="editTask(${tasks.indexOf(task)})">Edit</button>
                  <button onclick="deleteTask(${tasks.indexOf(task)})">Delete</button>
              </div>
          `;
          taskList.appendChild(li);
      });
  }

  function sortByDate() {
      tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
      renderTasks();
  }

  function sortByCategory() {
      tasks.sort((a, b) => a.category.localeCompare(b.category));
      renderTasks();
  }

  function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  addTaskBtn.addEventListener('click', addTask);
  filterInput.addEventListener('input', filterTasks);
  filterCategory.addEventListener('change', filterTasks);
  sortDateBtn.addEventListener('click', sortByDate);
  sortCategoryBtn.addEventListener('click', sortByCategory);

  // Make functions global so they can be called from inline event handlers
  window.editTask = editTask;
  window.deleteTask = deleteTask;

  renderTasks();
});

