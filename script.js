// Get DOM elements
const todoInput = document.getElementById('todoInput');
const addButton = document.getElementById('addButton');
const todoList = document.getElementById('todoList');

// Load the saved tasks from localStorage
loadTasks();

// Add event listener to the Add button
addButton.addEventListener('click', addTask);

// Function to load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks'));

  if (tasks) {
    tasks.forEach((taskText) => {
      createTaskElement(taskText);
    });
  }
}

// Function to save tasks to localStorage
function saveTasks() {
  const tasks = Array.from(todoList.children).map((listItem) => listItem.firstChild.textContent);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to create and append a task element to the list
function createTaskElement(taskText) {
  // Create a new list item
  const listItem = document.createElement('li');
  const taskTextNode = document.createTextNode(taskText);
  listItem.appendChild(taskTextNode);

  // Create a delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', deleteTask);

  // Add the delete button to the list item
  listItem.appendChild(deleteButton);

  // Add click event listener to the task text node for editing
  taskTextNode.addEventListener('click', editTask);

  // Add the list item to the todoList
  todoList.appendChild(listItem);

  // Make the list sortable to allow reordering
  makeSortable(todoList);
}


// Function to add a task to the list
function addTask() {
  // Get the user input and trim any extra spaces
  const taskText = todoInput.value.trim();

  // Check if the input is not empty
  if (taskText) {
    createTaskElement(taskText);

    // Clear the input field
    todoInput.value = '';

    // Save the updated tasks to localStorage
    saveTasks();
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

      // Save the updated tasks to localStorage
      saveTasks();
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

  // Save the updated tasks to localStorage
  saveTasks();
}

// Function to make a list sortable using drag and drop
function makeSortable(list) {
  let draggedElement;

  list.addEventListener('mousedown', (event) => {
    // Check if the target is the task text node
    if (event.target.nodeType === Node.TEXT_NODE) {
      // Store the target's parent (list item) as the dragged element
      draggedElement = event.target.parentNode;
      draggedElement.draggable = true;
    } else {
      // Reset the dragged element and disable dragging
      draggedElement = null;
    }
  });

  list.addEventListener('dragstart', (event) => {
    // Add a style to the dragged element
    event.target.style.opacity = '0.5';
  });

  list.addEventListener('dragend', (event) => {
    // Remove the style from the dragged element
    event.target.style.opacity = '';
    // Disable dragging on the dragged element
    event.target.draggable = false;
  });

  list.addEventListener('dragover', (event) => {
    // Prevent the default behavior to allow dropping
    event.preventDefault();
  });

  list.addEventListener('drop', (event) => {
    // Prevent the default behavior
    event.preventDefault();

    // Get the target list item
    const target = event.target.closest('li');

    // Check if the target is a list item and not the same as the dragged element
    if (target && target !== draggedElement) {
      // Remove the dragged element from its current position
      list.removeChild(draggedElement);

      // Insert the dragged element before the target list item
      list.insertBefore(draggedElement, target);

      // Save the updated tasks to localStorage
      saveTasks();
    }
  });
}
