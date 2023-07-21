const strLocalstorage = 'items-gTarefas'
const task = JSON.parse(localStorage.getItem(strLocalstorage)) ?? ["Welcome"]
const form = document.querySelector('form')
const ul = document.getElementById('list-items')

rendererTasks()

function rendererTasks() {
    ul.innerText = ''
    task.forEach((element, index) => {
        const li = document.createElement('li')
        const icons = document.createElement('span')
        icons.classList.add('icons')
        
        li.classList.add(`task-${index}`)
        li.innerHTML = `<span class="task-text">${element}</span>`
        icons.appendChild(iconEdit(index))
        icons.appendChild(iconDelete(index))
        li.appendChild(icons)
        ul.appendChild(li)
    })
}

function addTask() {
    let text = document.querySelector('#idTarefa')
    if (text.value.length) {
        task.unshift(text.value)
        text.value = ''
        saveLocalStorage()
    } else window.alert("Digite uma tarefa")
}

function saveLocalStorage() {
    localStorage.setItem(strLocalstorage, JSON.stringify(task))
    rendererTasks()
}

function deleteTask(index) {
    let isconfirm = window.confirm(`Deseja apagar a tarefa "${task[index]}"?`)
    if(isconfirm) {
        task.splice(index, 1)
        saveLocalStorage()
    }
}

function editTask(index) {
    /* const taskText = document.querySelector(`li.task-${index} span.task-text`)
    taskText.setAttribute('contenteditable', '') */ // Pensando
    let newText = window.prompt("Informe o texto")
    if(newText != undefined) {
        task[index] = newText
        saveLocalStorage()
    }
}

function iconEdit(index) {
    const span = document.createElement('span')
    const i = document.createElement('i')
    i.classList.add("far", "fa-edit")
    i.setAttribute('onclick', `editTask(${index})`)
    span.appendChild(i)
    span.classList.add('icon')
    return span
}

function iconDelete(index) {
    const span = document.createElement('span')
    const i = document.createElement('i')
    i.classList.add("fas", "fa-trash")
    i.setAttribute('onclick', `deleteTask(${index})`)
    span.appendChild(i)
    span.classList.add('icon')
    return span
}

form.addEventListener('submit', () => {
    event.preventDefault()
    addTask()
})
