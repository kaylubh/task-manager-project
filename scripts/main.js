import { Task } from './task.js';
import { createTaskRow } from './taskElement.js';

// Tasks
const tasks = [];
// DOM Elements
const taskAddForm = document.querySelector('#task-add-form');
const taskTableBody = document.querySelector('#taskmanager tbody');

// Add Task
taskAddForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const nameInput = document.querySelector('#task-name');
  const priorityInput = document.querySelector('#task-priority');
  const importantInput = document.querySelector('#task-important');

  const name = nameInput.value.trim();
  const priority = priorityInput.value;
  const isImportant = importantInput.checked;

  if (name) {
    const newTask = new Task(name, priority, isImportant);
    tasks.push(newTask);
    displayTaskList(tasks);
    taskAddForm.reset();
  }
}
);

function displayTaskList(tasks) {
  // reset task list
  taskTableBody.innerHTML = '';

  // create task rows and append to table
  tasks.forEach((task) => {
    const taskRow = createTaskRow(task.taskDetails);
    taskTableBody.appendChild(taskRow);
  });

  // log tasks to console
  console.log(JSON.stringify(tasks, null, 2));
}
