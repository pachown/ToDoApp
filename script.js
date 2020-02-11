//array of created todos

let todoItems = [];

//defining variables

const list = document.querySelector('[data-tasks]');
const deleteCompletedTaskButton = document.querySelector('[data-clear-complete-tasks-button]');
const deleteAllTasksButton = document.querySelector('[data-delete-all-tasks-button]');

//Turn text into a new object and push to the todoItems Array

function addTodo(text) {
    const todo = {
        text,
        checked: false,
        id: Date.now(),
    };

    todoItems.push(todo);

//Uses the template in HTML to create the object wanted. This doesn't seem to be working as intended

    function renderTodos() {
    todoItems.forEach(todo =>{
        const todoTemplate = document.getElementById('todo-template')
        const todoElement = document.importNode(todoTemplate.content, true)
        const checkbox = todoElement.querySelector('input')
        checkbox.id = todo.id
        checkbox.checked = todo.checked
        const label = todoElement.querySelector('label')
        label.htmlFor = todo.id
        label.append(todo.text)
        list.appendChild(todoElement)
    })
}

//clears the list and recreates it with the new array to avoid double posting

clearElement(list)
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
});

// for clearing & reposting elements upon new todos being added
function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}
//for deleting completed tasks

deleteCompletedTaskButton.addEventListener('click', e => {
    todoItems = todoItems.filter(todo => !todo.checked)
    clearElement(list)
    renderTodos(todoItems)
})

//for deleting all tasks

deleteAllTasksButton.addEventListener('click', e => {
    todoItems.length = 0
    clearElement(list)
    renderTodos(todoItems)
})