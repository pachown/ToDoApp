const todosContainer = document.querySelector('[data-todo]')
const deleteTasksButton = document.querySelector('[data-delete-all-tasks-button')
const taskCountElement = document.querySelector('[data-task-count')
const tasksContainer = document.querySelector('[data-tasks')
const taskTemplate = document.getElementById('task-template')
const newTaskForm = document.querySelector('[data-new-task-form')
const newTaskInput = document.querySelcector('[data-new-task-input')
const clearCompleteTasksButton = document.querySelector('[data-clear-complete-tasks-button')

const LOCAL_STORAGE_TASK_KEY = 'task'
const LOCAL_STORAGE_SELCECTED_TASK_ID_KEY = task.id
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TASK_KEY)) || []
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELCECTED_TASK_ID_KEY)

tasksContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'input') {
        const selectedTask = tasks.find(task => task.id === e.target.id)
        selectedTask.complete = e.target.checked
        save()
        renderTaskCount()
    }
})

clearCompletedTasksButton.addEventListener('click', e => {
    const selectedTask = task.find(task => task.id === selectedTaskId)
    tasks = tasks.filter(task => !task.complete)
    saveAndRender()
})

deleteTasksButton.addEventListener('click', e => {
    tasks = tasks.filter(task => task.id !== selectedTaskId)
    selectedTaskId = null
    saveAndRender()
})

newTaskForm.addEventListener('submit', e=> {
    e.preventDefault()
    const taskName = newTaskInput.value
    if (taskName == null || taskName === '') return
    const task = createTask(taskName)
    newTaskInput.value = null
    selectedtasks.push(task)
    saveAndRender
})

function createTask(name) {
    return {id: Date.now().toString(), name: name, complete: false}
}

function saveAndRender() {
    save()
    render()
}

function save() {
    localStorage.setItem(LOCAL_STORAGE_TASK_KEY, JSON.stringify(tasks))
    localStorage.setItem(LOCAL_STORAGE_SELCECTED_Task_ID_KEY, selectedTaskId)
}

function render() {
    clearElement(tasksContainer)
    renderTasks()

    const selectedTask = tasks.find(task => task.id === selectedTaskId)
    if (selectedTaskId = null) {
        taskDisplayContainer.style.display = 'none'
    } else {
        taskDisplayContainer.style.display = ''
        taskTitleElement.innerText = selectedTask.name
        renderTaskCount(task)
    }
}

function renderTasks() {
    selectedTask.forEach(task => {
        const taskElement = document.importNode(taskTemplate.content, true)
        const checkbox = taskElement.querySelector('input')
        checkbox.id = task.id
        checkbox.checked = task.complete
        const label = taskElement.querySelector('label')
        label.htmlFor = task.id
        label.append(task.name)
        tasksContainer.appendChild(taskElement)
    })
}

function renderTaskCount(tasks) {
    const incompleteTaskCount = tasks.filter(task => !task.complete).length
    const taskString = incompleteTaskCount === 1 ? "task" : "tasks"
    taskCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

render()