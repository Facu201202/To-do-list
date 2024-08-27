const FormInput = document.getElementById("input") as HTMLInputElement;
const listGroup = document.getElementById("list-group") as HTMLUListElement;


//function to load the new task

function addTask(): void {
    if (FormInput.value === '') {
        alert("Se debe escribir algo")
    } else {
        const content: string = FormInput.value
        newTask(content, false)
        saveTask(content, false)
    }
}


function newTask(text: string, status: boolean) {
    const li = document.createElement("li") as HTMLLIElement
    li.className = "list-group-item"


    const check = document.createElement("i") as HTMLElement
    check.className = "fa-regular fa-circle-check fa-lg"


    const span = document.createElement("span") as HTMLSpanElement
    span.className = "text-content"
    span.innerHTML = text

    if (status) {
        span.classList.add("realized")
        check.className = "fa-solid fa-circle-check fa-lg"
    } else {
        span.classList.remove("realized")
        check.className = "fa-regular fa-circle-check fa-lg"
    }

    
    const x = document.createElement("i") as HTMLElement
    x.className = "fa-solid fa-xmark"

   

    li.appendChild(check)
    li.appendChild(span)
    li.appendChild(x)

    listGroup.appendChild(li)


    check.onclick = () => {
        checkButton(span.innerHTML, check, span)
    }

    x.onclick = () => {
        deleteTask(span.innerHTML)
        console.log("delete")
    }


    FormInput.value = ''
}

function deleteTask(text: string): void {
    console.log("newTasks")
    const tasks = getTask()
    const newTasks = tasks.filter(T => T.text !== text)
    
    localStorage.setItem("tasks", JSON.stringify(newTasks))
    const liElement = Array.from(listGroup.children).find( li => li.textContent?.includes(text)) as HTMLLIElement

    listGroup.removeChild(liElement)
}

function checkButton(text: string, check: HTMLElement, span: HTMLSpanElement): void {
    if (span.classList.contains("realized")) {
        span.classList.remove("realized")
        check.className = "fa-regular fa-circle-check fa-lg"
    } else {
        span.classList.add("realized")
        check.className = "fa-solid fa-circle-check fa-lg"

    }
    toggle(text)
}


function getTask(): { text: string, realized: boolean }[] {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : []
}

function saveTask(text: string, realized: boolean): void {
    console.log(text)
    const task = {
        text: text,
        realized: realized
    }
    const tasks = getTask()

    tasks.push(task)

    localStorage.setItem("tasks", JSON.stringify(tasks))
}


function toggle(text: string): void {
    const tasks = getTask()
    const task = tasks.find(task => task.text === text)

    if (task) {
        task.realized = !task.realized
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }
}


function showTask() {
    const tasks = getTask()
    tasks.forEach(tasks => {
        newTask(tasks.text, tasks.realized)
    })
}

document.addEventListener("DOMContentLoaded", showTask)