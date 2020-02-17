
// document.onload = renderTodos()
//defining variables

const list = document.querySelector('[data-tasks]');
const deleteCompletedTaskButton = document.querySelector('[data-clear-complete-tasks-button]');
const deleteAllTasksButton = document.querySelector('[data-delete-all-tasks-button]');

let todoItems
    if(localStorage.getItem('todoItems') === null) {
        todoItems = []; } else {
            todoItems = JSON.parse(localStorage.getItem('todoItems'));
        }


//Uses the template in HTML to create the object wanted

function renderTodos() {
    clearElement(list)
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

//Turn text into a new object and push to the todoItems Array

function addTodo(text) {
    const todo = {
        text,
        checked: false,
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

//for checking items off

// list.addEventListener('click', e => {
//     if(e.target.tagName.toLowerCase() === 'input') {
//       checkbox.checked = todo.checked};
//     })
//for deleting checked/completed tasks

// deleteCompletedTaskButton.addEventListener('click', e => {
//     for each todoItems(let index = 0; index < todoItems.length; index++) {
//         if (todo.checked === true) {
//             localStorage.removeItem('todo')
//         }
//     }
//     localStorage.setItem('todoItems', JSON.stringify(todoItems));
//     renderTodos()
//     });

//for deleting all tasks

deleteAllTasksButton.addEventListener('click', e => {
    
    localStorage.clear()
    todoItems.length = 0
    clearElement(list)
    renderTodos(todoItems)
})

console.log(todoItems);

renderTodos()