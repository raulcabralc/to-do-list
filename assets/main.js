const inputTask = document.querySelector('.input-task');
const btnTask = document.querySelector('.btn-task');
const tasks = document.querySelector('.tasks');

function createLi() {
    const li = document.createElement('li');
    return li;
}

inputTask.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
        if (!inputTask.value) return;
        newTask(inputTask.value);
    };
});

function clearInput() {
    inputTask.value = '';
    inputTask.focus();
}

function createDeleteButton(li) {
    li.innerText += ' ';
    const deleteButton = document.createElement('button');
    deleteButton.innerText = '✕';
    deleteButton.setAttribute('class', 'delete');
    deleteButton.setAttribute('title', 'Delete this task');
    li.appendChild(deleteButton);
}

function newTask(task) {
    const li = createLi();
    li.innerText = task;
    tasks.appendChild(li);
    clearInput();
    createDeleteButton(li);
    saveTask();
}

btnTask.addEventListener('click', () => {
    if (!inputTask.value) return;
    newTask(inputTask.value);
});

document.addEventListener('click', (e) => {
    const el = e.target;

    if (el.classList.contains('delete')) {
        el.parentElement.remove();
        saveTask();
    };
});

function saveTask() {
    const liTasks = tasks.querySelectorAll('li');
    const liTasksList = [];

    for (let task of liTasks) {
        let taskText = task.innerText;
        taskText = taskText.replace('✕', '').trim();
        liTasksList.push(taskText);
    }

    const jsonTasks = JSON.stringify(liTasksList);
    localStorage.setItem('tasks', jsonTasks);
}

function addSavedTasks() {
    const tasks = localStorage.getItem('tasks');
    const tasksList = JSON.parse(tasks);
    console.log(tasksList);
    for (let task of tasksList) {
        newTask(task);
    };
}
addSavedTasks();
