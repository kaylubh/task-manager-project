// Task Manager Application

/* ------------------------------------------------------------ */
// Global Variables
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
      id: this.#id,
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

/* ------------------------------------------------------------ */
// Create Task Element

// Create a table row for a task
function createTaskRow(taskDetails) {
  // Create table row and cells for task details (name, priority, date) and action buttons
  const taskRow = document.createElement('tr');
  const nameCell = createTaskCell(taskDetails.name);
  const priorityCell = createTaskCell(taskDetails.priority);
  const dateCell = createTaskDateCell(taskDetails.dateCreated);
  const actionButtonsCell = createActionsButtons(taskDetails);

  // Append cells to the task row
  taskRow.appendChild(nameCell);
  taskRow.appendChild(priorityCell);
  taskRow.appendChild(dateCell);
  taskRow.appendChild(actionButtonsCell);

  // Conditionally add CSS classes for completed, important, and priority status
  if (taskDetails.isCompleted) {
    taskRow.classList.add('completed');
  }
  if (taskDetails.isImportant) {
    taskRow.classList.add('important');
  }

  if (taskDetails.priority === 'High') {
    taskRow.classList.add('high-priority');
  } else if (taskDetails.priority === 'Medium') {
    taskRow.classList.add('medium-priority');
  } else if (taskDetails.priority === 'Low') {
    taskRow.classList.add('low-priority');
  }

  return taskRow;
}

// Helper functions to create table cells for name, priority, and date
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

// Helper function to create action buttons (Complete, Edit, Delete)
function createActionsButtons(taskDetails) {
  const taskId = taskDetails.id;
  const taskCompleted = taskDetails.isCompleted;
  const taskImportant = taskDetails.isImportant;

  // Action buttons group
  const cell = document.createElement('td');
  const buttonGroup = document.createElement('div');
  buttonGroup.classList.add('actions-group');

  // Complete Checkbox
  const completeCheckbox = document.createElement('input');
  completeCheckbox.type = 'checkbox';
  const completeLabel = document.createElement('label');
  completeLabel.innerHTML = 'Complete';
  completeCheckbox.classList.add('complete-checkbox');
  completeCheckbox.id = `${taskId}`;
  if (taskCompleted) {
    completeCheckbox.checked = true;
  }
  buttonGroup.appendChild(completeCheckbox);
  buttonGroup.appendChild(completeLabel);

  // Important Checkbox
  const importantCheckbox = document.createElement('input');
  importantCheckbox.type = 'checkbox';
  const importantLabel = document.createElement('label');
  importantLabel.innerHTML = 'Important';
  importantCheckbox.classList.add('important-checkbox');
  importantCheckbox.id = `${taskId}`;
  if (taskImportant) {
    importantCheckbox.checked = true;
  }
  buttonGroup.appendChild(importantCheckbox);
  buttonGroup.appendChild(importantLabel);

  // Delete Button
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = 'Delete';
  deleteButton.classList.add('delete-button');
  deleteButton.id = `${taskId}`;
  buttonGroup.appendChild(deleteButton);

  cell.appendChild(buttonGroup);

  return cell;
}

/* ------------------------------------------------------------ */
// Display Task List
function displayTaskList() {
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

/* ------------------------------------------------------------ */
// Add Task

// Event listener for task add form submission
taskAddForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get form input values
  const nameInput = document.querySelector('#task-name');
  const priorityInput = document.querySelector('#task-priority');
  const importantInput = document.querySelector('#task-important');

  const name = nameInput.value.trim();
  const priority = priorityInput.value;
  const isImportant = importantInput.checked;

  // Create a new task and add it to the tasks array if the name is not empty
  if (name) {
    const newTask = new Task(name, priority, isImportant);
    tasks.push(newTask);
    displayTaskList(); // Update the task list display
    taskAddForm.reset();
  }
});

/* ------------------------------------------------------------ */
// Task Actions (Complete, Edit, Delete)

// Complete Task
function toggleTaskCompletion(taskId) {
  // Find the task in the tasks array using the task ID
  const taskToComplete = tasks.find((task) => task.id === taskId);
  // Get the current completion status of the task
  const isCompleted = taskToComplete.taskDetails.isCompleted;

  // Toggle the completion status of the task
  taskToComplete.isCompleted = !isCompleted;
}

// Toggle Important Status
function toggleTaskImportant(taskId) {
  // Find the task in the tasks array using the task ID
  const taskToToggle = tasks.find((task) => task.id === taskId);
  // Get the current important status of the task
  const isImportant = taskToToggle.taskDetails.isImportant;

  // Toggle the important status of the task
  taskToToggle.isImportant = !isImportant;
}

// Delete Task
function deleteTask(taskId) {
  // Find the index of the task in the tasks array using the task ID
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  // Remove the task from the tasks array
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
  }
}

// Event Listener for Task Actions
taskTableBody.addEventListener('click', (event) => {
  const taskId = event.target.id; // get the task ID

  // Check if and which action was clicked using event delegation
  if (event.target.tagName === 'BUTTON') {
    // Delete Button
    if (event.target.classList.contains('delete-button')) {
      deleteTask(taskId);
    }
  } else if (event.target.tagName === 'INPUT') {
    // Complete Checkbox
    if (event.target.classList.contains('complete-checkbox')) {
      toggleTaskCompletion(taskId);
    } else if (event.target.classList.contains('important-checkbox')) {
      // Toggle Important Status
      toggleTaskImportant(taskId);
    }
  }

  displayTaskList(); // Update the task list display after any action
});
