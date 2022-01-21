const strLocalstorage = 'items-gTarefas'
const task = JSON.parse(localStorage.getItem(strLocalstorage)) || ["Welcome"]
const form = document.querySelector('form')
const ul = document.getElementById('list-items')

rendererTasks()

function rendererTasks() {
    ul.innerText = ''
    
    for(let index = task.length - 1; index >= 0; index--) {
        const li = document.createElement('li')

        let output = `<span>${task[index]}</span>`
        output += `<span class="icons"> <span class="icon" onclick="editTask(${index})"><i class="far fa-edit"></i></span>`
        output += `&nbsp; <span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></span>`

        li.innerHTML = output
        ul.appendChild(li)
    }
}

function addTask() {
    let text = document.querySelector('#idTarefa')
    if (text.value.length) {
        task.push(text.value)
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
    let newText = window.prompt("Informe o texto")
    if(newText.length) {
        task[index] = newText
        saveLocalStorage()
    }

}

form.addEventListener('submit', () => {
    event.preventDefault()
    addTask()
})
