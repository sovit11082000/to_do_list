let tasks = [];
let inputBx = document.querySelector('#inputBx');
let list = document.querySelector('#list');
const dropdown = document.querySelector('.dropdown');
const filterItems = document.querySelectorAll('.items a');
const clearAllBtn = document.querySelector('#clear-all');
const completeAllBtn = document.querySelector('#complete-all');
const completedCount = document.querySelector('#c-count');
const tasksCounter = document.querySelector('#tasks-counter');

inputBx.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    addItem(this.value);
    this.value = "";
  }
});

function addItem(taskText) {
  if (taskText.trim() === "") return; // Don't add empty tasks

  let listItem = document.createElement("li");
  listItem.innerHTML = `${taskText}<i></i>`;

  listItem.addEventListener("click", function() {
    this.classList.toggle('done');
    updateTaskCount();
  });

  listItem.querySelector("i").addEventListener("click", function(event) {
    event.stopPropagation(); 
    removeTaskFromTasks(taskText); // Remove the task from the tasks array
    listItem.remove();
    updateTaskCount();
  });

  list.append(listItem);
  tasks.push({ text: taskText, done: false });
  updateTaskCount();
}

function removeTaskFromTasks(taskText) {
  tasks = tasks.filter(task => task.text !== taskText);
}


function updateTaskCount() {
  const completedTasks = tasks.filter(task => task.done).length;
  completedCount.textContent = completedTasks;
  const completedTasksCount = document.querySelectorAll('#list li.done').length;
  completedCount.textContent = completedTasksCount;

  tasksCounter.textContent = tasks.length;
}



clearAllBtn.addEventListener('click', function() {
  list.innerHTML = '';
  tasks = [];
  updateTaskCount();
});

completeAllBtn.addEventListener('click', function() {
  tasks.forEach(task => (task.done = true));
  const listItemElements = document.querySelectorAll('#list li');
  listItemElements.forEach(item => item.classList.add('done'));
  updateTaskCount();
});

filterItems.forEach((item, index) => {
    item.addEventListener('click', function() {
      filterItems.forEach(item => item.classList.remove('active'));
      item.classList.add('active');
  
      // Apply the appropriate filter based on the index
      if (index === 0) {
        list.querySelectorAll('li').forEach(item => item.style.display = 'block');
      } else if (index === 1) {
        list.querySelectorAll('li.done').forEach(item => item.style.display = 'block');
        list.querySelectorAll('li:not(.done)').forEach(item => item.style.display = 'none');
      } else if (index === 2) {
        list.querySelectorAll('li.done').forEach(item => item.style.display = 'none');
        list.querySelectorAll('li:not(.done)').forEach(item => item.style.display = 'block');
      }
      
      // Adjust the list's height to prevent layout shifts
      list.style.height = list.scrollHeight + 'px';
    });
  });

dropdown.addEventListener('click', () => {
  dropdown.classList.toggle('active');
});