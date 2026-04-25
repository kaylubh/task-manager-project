'use strict';

export function createTaskRow(taskDetails) {
  const taskRow = document.createElement('tr');

  const nameCell = createTaskCell(taskDetails.name);
  const priorityCell = createTaskCell(taskDetails.priority);
  const dateCell = createTaskDateCell(taskDetails.dateCreated);

  taskRow.appendChild(nameCell);
  taskRow.appendChild(priorityCell);
  taskRow.appendChild(dateCell);

  return taskRow;
}

function createTaskCell(content) {
  const cell = document.createElement('td');
  cell.innerHTML = content;
  return cell;
}

function createTaskDateCell(date) {
  const cell = document.createElement('td');

  currentDate = new Date();
  if (date.toDateString() === currentDate.toDateString()) {
    cell.innerHTML = 'Today';
  } else if (
    date.toDateString() ===
    new Date(currentDate.getTime() - 86400000).toDateString()
  ) {
    cell.innerHTML = 'Yesterday';
  } else {
    cell.innerHTML = date.toLocaleDateString();
  }

  return cell;
}
