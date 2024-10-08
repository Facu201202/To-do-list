"use strict";
const FormInput = document.getElementById("input");
const listGroup = document.getElementById("list-group");
//function to add task to the DOM
function addTask() {
    if (FormInput.value === '') {
        alert("Se debe escribir algo");
    }
    else {
        const content = FormInput.value;
        newTask(content, false);
        saveTask(content, false);
    }
}
// Function to create an HTML task element
function newTask(text, status) {
    const li = document.createElement("li");
    li.className = "list-group-item";
    const check = document.createElement("i");
    check.className = "fa-regular fa-circle-check fa-lg";
    const span = document.createElement("span");
    span.className = "text-content";
    span.innerHTML = text;
    if (status) {
        span.classList.add("realized");
        check.className = "fa-solid fa-circle-check fa-lg";
    }
    else {
        span.classList.remove("realized");
        check.className = "fa-regular fa-circle-check fa-lg";
    }
    const x = document.createElement("i");
    x.className = "fa-solid fa-xmark";
    li.appendChild(check);
    li.appendChild(span);
    li.appendChild(x);
    listGroup.appendChild(li);
    check.onclick = () => {
        checkButton(span.innerHTML, check, span);
    };
    x.onclick = () => {
        deleteTask(span.innerHTML);
        console.log("delete");
    };
    FormInput.value = '';
}
//function for delete a task from DOM and localstorage
function deleteTask(text) {
    const tasks = getTask();
    const newTasks = tasks.filter(T => T.text !== text);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    const liElement = Array.from(listGroup.children).find(li => { var _a; return (_a = li.textContent) === null || _a === void 0 ? void 0 : _a.includes(text); });
    listGroup.removeChild(liElement);
}
//toggle function to change the icons and the task status
function checkButton(text, check, span) {
    if (span.classList.contains("realized")) {
        span.classList.remove("realized");
        check.className = "fa-regular fa-circle-check fa-lg";
    }
    else {
        span.classList.add("realized");
        check.className = "fa-solid fa-circle-check fa-lg";
    }
    toggle(text);
}
//Get array of tasks from localstorage
function getTask() {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
}
//Pushes a task into the tasks array and saves it to localStorage afterward
function saveTask(text, realized) {
    console.log(text);
    const task = {
        text: text,
        realized: realized
    };
    const tasks = getTask();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
//changes the task status
function toggle(text) {
    const tasks = getTask();
    const task = tasks.find(task => task.text === text);
    if (task) {
        task.realized = !task.realized;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}
//Function to display the tasks in the DOM
function showTask() {
    const tasks = getTask();
    tasks.forEach(tasks => {
        newTask(tasks.text, tasks.realized);
    });
}
document.addEventListener("DOMContentLoaded", showTask);
