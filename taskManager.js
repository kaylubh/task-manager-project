// import { Task } from './task.js';
// import { createTaskRow } from './taskElement.js';

// Tasks
const tasks = [];
// DOM Elements
const taskAddForm = document.querySelector('#task-add-form');
const taskTableBody = document.querySelector('#taskmanager tbody');

// Task Class
class Task {
  // Private Fields
  #name;
  #priority;
  #isImportant;
  #isCompleted;
  #dateCreated;
  #id;

  // Constructor
  constructor(name, priority, isImportant) {
    this.#name = name;
    this.#priority = priority;
    this.#isImportant = isImportant;
    this.#isCompleted = false;
    this.#dateCreated = new Date();
    this.#id = this.#generateId();
  }

  #generateId() {
    const idName = this.#name.replace(/\s+/g, '').toLowerCase(); // remove whitespace and convert to lowercase
    return `${idName}-${this.#dateCreated.toISOString()}`;
  }

  // Getters
  get id() {
    return this.#id;
  }

  get taskDetails() {
    return {
      name: this.#name,
      priority: this.#priority,
      dateCreated: this.#dateCreated,
      isImportant: this.#isImportant,
      isCompleted: this.#isCompleted,
    };
  }

  // Setters
  set name(newName) {
    this.#name = newName;
  }

  set priority(newPriority) {
    this.#priority = newPriority;
  }

  set isImportant(isImportant) {
    this.#isImportant = isImportant;
  }

  set isCompleted(isCompleted) {
    this.#isCompleted = isCompleted;
  }

  // Methods
  toJSON() {
    return {
      id: this.#id,
      name: this.#name,
      priority: this.#priority,
      isImportant: this.#isImportant,
      isCompleted: this.#isCompleted,
      dateCreated: this.#dateCreated.toLocaleString(),
    };
  }
}

// Create Task Element
function createTaskRow(taskDetails) {
  const taskRow = document.createElement('tr');

  const nameCell = createTaskCell(taskDetails.name);
  const priorityCell = createTaskCell(taskDetails.priority);
  const dateCell = createTaskDateCell(taskDetails.dateCreated);
  const actionButtonsCell = createActionsButtons();

  taskRow.appendChild(nameCell);
  taskRow.appendChild(priorityCell);
  taskRow.appendChild(dateCell);
  taskRow.appendChild(actionButtonsCell);

  return taskRow;
}

function createTaskCell(content) {
  const cell = document.createElement('td');
  cell.innerHTML = content;
  return cell;
}

function createTaskDateCell(date) {
  const cell = document.createElement('td');

  const currentDate = new Date();
  cell.innerHTML = date.toLocaleDateString();

  return cell;
}

function createActionsButtons() {
  // Action buttons group
  const cell = document.createElement('td');
  const buttonGroup = document.createElement('div');
  buttonGroup.classList.add('btn-group');

  // Complete Button
  const completeButton = document.createElement('button');
  completeButton.innerHTML = 'Complete';
  buttonGroup.appendChild(completeButton);

  // Edit Button
  const editButton = document.createElement('button');
  editButton.innerHTML = 'Edit';
  buttonGroup.appendChild(editButton);

  // Delete Button
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = 'Delete';
  buttonGroup.appendChild(deleteButton);

  cell.appendChild(buttonGroup);

  return cell;
}

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
});

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

//
