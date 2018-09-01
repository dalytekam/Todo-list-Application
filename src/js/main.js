// Get the Dom Elements
const filterTask = document.querySelector('#filter');
const inputTask = document.querySelector('#task');
const deleteAllTask = document.querySelector('#deleteAll');
const taskList = document.querySelector('#taskList');
const taskForm = document.querySelector('#taskForm');
//Adding an event listener to the form (submit)
taskForm.addEventListener('submit', addNewTask);

// Add a new task

function addNewTask(e) {
  e.preventDefault();
  //Get the input value

  const task = inputTask.value;

  //Check if a task is added
  if (task == '') {
    alert('No Task created !');
  } else {
    const li = document.createElement('li');
    //Add many classes to the created li
    li.classList.add('list-group-item', 'justify-content-between', 'align-items-center');
    //Set the content of the li
    li.innerHTML = `<i class="fas fa-check-circle"></i>${task}
                            <i class="fas fa-trash-alt del"></i>`;
    taskList.appendChild(li);

    // Store the task in local storage
    storeTheTaskInLocalStorage(task);
    //Clear the input field
    inputTask.value = '';
  }
}

function storeTheTaskInLocalStorage(task) {
  let taskCollection;
  if (localStorage.getItem('tasksInLocalStorage') == null) {
    taskCollection = [];
  } else {
    taskCollection = JSON.parse(localStorage.getItem('tasksInLocalStorage'));
  }
  //Add the task in the tasks array
  taskCollection.push(task);
  //Put back the array in the local storage
  localStorage.setItem('tasksInLocalStorage', JSON.stringify(taskCollection));
}

// Adding an event listener to the ul
taskList.addEventListener('click', toggleComplete);
//toggle class "isComplete" on clicked li
function toggleComplete(e) {
  const clickedTask = e.target;
  if (clickedTask.classList.contains('list-group-item')) {
    clickedTask.classList.toggle('isComplete');
  }
}
//Add the click event on the ul
taskList.addEventListener('click', deleteTask);

function deleteTask(e) {
  //Target the clicked li
  const deletedTask = e.target;
  //Check if the element contains the "del" class
  if (deletedTask.classList.contains('del')) {
    if (confirm('Delete the task?')) {
      // Remove the li from the ul
      deletedTask.parentElement.remove();
      //Remove task from the local storage
      removeTaskFromLocalStorage(deletedTask.parentElement);
    }
  }
}
// Remove task from Local storage

function removeTaskFromLocalStorage(targetTask) {
  //Check the local storage
  let taskCollection;
  if (localStorage.getItem('tasksInLocalStorage') == null) {
    taskCollection = [];
  } else {
    taskCollection = JSON.parse(localStorage.getItem('tasksInLocalStorage'));
  }
  taskCollection.forEach((elt, index) => {
    if (targetTask.textContent.trim() == elt) {
      //Delete the target Task in the Array
      taskCollection.splice(index, 1);
    }
  });
  // Send the modified array in the local storage
  localStorage.setItem('tasksInLocalStorage', JSON.stringify(taskCollection));
}

// Delete All Task
deleteAllTask.addEventListener('click', clearAll);

function clearAll() {
  if (taskList.innerHTML == '') {
    alert('There is noTask on the current list!');
  } else if (confirm('Delete All Tasks?')) {
    taskList.innerHTML = '';
    //Clear from local storage
    localStorage.clear();
  }
}
//Filter a Task

filterTask.addEventListener('keyup', filterATask);

function filterATask(e) {
  const allTask = document.querySelectorAll('.list-group-item');

  const filterText = e.target.value.toUpperCase();

  allTask.forEach(el => {
    const item = el.textContent.toUpperCase();

    if (item.indexOf(filterText) != -1) {
      el.style.display = '';
    } else {
      el.style.display = 'none';
    }
  });
}

//Add a loading event on the DOM
document.addEventListener('DOMContentLoaded', loadTheTasksFromLs);
// Get the task from local storage
function loadTheTasksFromLs() {
  let taskCollection;
  if (localStorage.getItem('tasksInLocalStorage') == null) {
    taskCollection = [];
  } else {
    taskCollection = JSON.parse(localStorage.getItem('tasksInLocalStorage'));
  }

  taskCollection.forEach(task => {
    const li = document.createElement('li');
    //Add many classes to the created li
    li.classList.add('list-group-item', 'justify-content-between', 'align-items-center');
    //Set the content of the li
    li.innerHTML = `<i class="fas fa-check-circle"></i> ${task}
                            <i class="fas fa-trash-alt del"></i>`;
    taskList.appendChild(li);
  });
}
