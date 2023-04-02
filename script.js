// Get DOM elements
const todoInput = document.getElementById('todoInput');
const addButton = document.getElementById('addButton');
const todoList = document.getElementById('todoList');

// Add event listener to the Add button
addButton.addEventListener('click', addTask);

// Function to add a task to the list
function addTask() {
  // Get the user input and trim any extra spaces
  const taskText = todoInput.value.trim();

  // Check if the input is not empty
  if (taskText) {
    // Create a new list item
    const listItem = document.createElement('li');
    listItem.textContent = taskText;

    // Create a delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', deleteTask);

    // Add the delete button to the list item
    listItem.appendChild(deleteButton);

    // Add click event listener to the list item for editing
    listItem.addEventListener('click', editTask);

    // Add the list item to the todoList
    todoList.appendChild(listItem);

    // Clear the input field
    todoInput.value = '';

    // Make the list sortable to allow reordering
    makeSortable(todoList);
  }
}

// Function to edit a task in the list
function editTask(event) {
  // Check if the target is not the delete button
  if (event.target.tagName !== 'BUTTON') {
    // Get the target list item that was clicked
    const listItem = event.target;

    // Prompt the user to enter a new task
    const newTaskText = prompt('Edit task:', listItem.textContent);

    // Check if the input is not empty and not the same as the previous task
    if (newTaskText && newTaskText.trim() !== listItem.textContent) {
      // Update the list item text
      listItem.textContent = newTaskText.trim();
    }
  }
}

// Function to delete a task
function deleteTask(event) {
  // Get the target delete button that was clicked
  const deleteButton = event.target;

  // Get the list item containing the delete button
  const listItem = deleteButton.parentElement;

  // Remove the list item from the todoList
  todoList.removeChild(listItem);
}

// Function to make a list sortable using drag and drop
function makeSortable(list) {
  let draggedElement;

  // Add event listeners for drag and drop events
  list.addEventListener('dragstart', (event) => {
    draggedElement = event.target;
    event.dataTransfer.setData('text/plain', ''); // Required for Firefox
  });

  list.addEventListener('dragover', (event) => {
    event.preventDefault(); // Allow dropping
  });

  list.addEventListener('drop', (event) => {
    event.preventDefault();

    // Get the target list item where the dragged element was dropped
    const targetElement = event.target.closest('li');

    // Check if the target element is not the same as the dragged element
    if (targetElement && targetElement !== draggedElement) {
      // Insert the dragged element before the target element
      list.insertBefore(draggedElement, targetElement);
    }
  });

  // Set draggable attribute for each list item
  Array.from(list.children).forEach((listItem) => {
    listItem.setAttribute('draggable', 'true');
  });
}