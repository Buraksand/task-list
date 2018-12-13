//Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all event listeners
loadEventLİsteners();

function loadEventLİsteners() {
    //Dom Content loaded
    document.addEventListener('DOMContentLoaded', getTasks)
    //Add task event
    form.addEventListener('submit', addTask);
    //Add remove task event
    taskList.addEventListener('click', removeTask)
    // Add clear all tasks event
    clearBtn.addEventListener('click', clearTasks);
    // Add filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

function addTask(e) {

    if (taskInput.value == '') {
        alert('Write a task');
    } else {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(taskInput.value));

        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="material-icons">delete</i>';
        li.appendChild(link);

        //Store it in local storage
        storeTaskInLocalStorage(taskInput.value);

        taskList.appendChild(li);
        taskInput.value = '';

    }
    e.preventDefault();
}

function removeTask(e) {

    if (e.target.parentElement.classList.contains('delete-item')) {
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        e.target.parentElement.parentElement.remove();
    }

}

function clearTasks() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    clearTasksFromLocalStorage();
}

function filterTasks(e) {
    const text = e.target.value

    console.log(document.querySelectorAll('.collection-item'));
    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        console.log(item.toLowerCase().indexOf(text));
        if (item.toLowerCase().indexOf(text) == '-1') {
            task.style.display = 'none';
        } else {
            task.style.display = 'block';
        }
    })
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    console.log(tasks);
    tasks.forEach(function (task) {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));

        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="material-icons">delete</i>';
        li.appendChild(link);
        taskList.appendChild(li);
    })

}

function removeTaskFromLocalStorage(taskItem) {
    console.log(taskItem);
    console.log(taskItem.firstChild.textContent);
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task, index) {
        if (taskItem.firstChild.textContent === tasks[index]) {
            tasks.splice(index, 1)
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}

