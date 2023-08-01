const strLocalstorage = 'items-gTarefas'
const tasks = JSON.parse(localStorage.getItem(strLocalstorage)) ?? ["Welcome"]
const form = document.querySelector('form')
const ul = document.getElementById('list-items')

rendererTasks()

function rendererTasks() {
    ul.innerText = ''
    tasks.forEach((element, index) => {
        const li = document.createElement('li')
        const icons = document.createElement('span')
        icons.classList.add('icons')
        
        li.classList.add(`task-${index}`)
        li.innerHTML = `<span class="task-text" contenteditable onkeypress="editTask(${index})">${element}</span>`

        icons.appendChild(iconDelete(index))

        li.appendChild(icons)
        ul.appendChild(li)
    })
}

function addTask() {
    let text = document.querySelector('#idTarefa')
    if (text.value.length) {
        tasks.unshift(text.value)
        text.value = ''

        saveLocalStorage()
    } else window.alert("Digite uma tarefa")
}

function saveLocalStorage() {
    localStorage.setItem(strLocalstorage, JSON.stringify(tasks))

    rendererTasks()
}

function deleteTask(index) {
    let isconfirm = window.confirm(`Deseja apagar a tarefa?`)
    if(isconfirm) {
        tasks.splice(index, 1)

        saveLocalStorage()
    }
}

function editTask(index) {
    const { keyCode } = event
    const { textContent } = event.target

    if(keyCode === 13) {
        tasks[index] = textContent
        saveLocalStorage()
    }
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
