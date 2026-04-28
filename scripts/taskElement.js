export function createTaskRow(taskDetails) {
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
