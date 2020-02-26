//defining variables

const list = document.querySelector('[data-tasks]');
const deleteCompletedTaskButton = document.querySelector('[data-clear-complete-tasks-button]');
const deleteAllTasksButton = document.querySelector('[data-delete-all-tasks-button]');

let todoItems = JSON.parse(localStorage.getItem('todoItems')) || []

//Uses the template in HTML to create the todo objects in storage 

function renderTodos() {
    clearElement(list)
    todoItems.forEach(todo =>{
        const todoTemplate = document.getElementById('todo-template')
        const todoElement = document.importNode(todoTemplate.content, true)
        const checkbox = todoElement.querySelector('input')
        checkbox.id = todo.id
        checkbox.checked = todo.complete
        const label = todoElement.querySelector('label')
        label.htmlFor = todo.id
        label.append(todo.text)
        list.appendChild(todoElement)
    })
}

//Turn text into a new object and push to the todoItems Array

function addTodo(text) {
    const todo = {
        text,
        complete: false,
        id: Date.now(),
    };

    todoItems.push(todo);
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
    renderTodos(todoItems)
}


// listens for new tasks, trims them

const form = document.querySelector('[data-new-task-form]');

form.addEventListener('submit', event => {
    event.preventDefault();
    const input = document.querySelector('[data-new-task-input]');

    const text = input.value.trim();
    if (text !== '') {
        addTodo(text);
        input.value = '';
        input.focus();
    }
})

// for clearing & reposting elements upon new todos being added
function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

//for checking items off - This is where the TypeError is coming up
list.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'input') {
        const clickedTodo = todoItems.find(todo => todo.id === parseInt(e.target.id));
        clickedTodo.complete = e.target.checked
        localStorage.setItem('todoItems', JSON.stringify(todoItems))
    }
})

//for deleting completed tasks
deleteCompletedTaskButton.addEventListener('click', e => {
    todoItems = todoItems.filter(todo => !todo.complete)

    localStorage.setItem('todoItems', JSON.stringify(todoItems))
    renderTodos()
})

//for deleting all tasks

deleteAllTasksButton.addEventListener('click', e => {
    
    localStorage.clear()
    todoItems.length = 0
    clearElement(list)
    renderTodos(todoItems)
})

console.log(todoItems);

renderTodos()