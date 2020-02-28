//defining variables
const list = document.querySelector('[data-tasks]');

//Uses the template in HTML to create the todo objects in storage 
function renderTodos() {
    let todoItems = JSON.parse(localStorage.getItem('todoItems')) || [];

    clearList()
    todoItems.forEach(todo =>{
        const taskDiv = document.createElement('DIV');
        taskDiv.classList = 'task';

        const taskCheckbox = document.createElement('INPUT');
        taskCheckbox.id = todo.id;
        taskCheckbox.type = 'checkbox';
        taskCheckbox.checked = todo.complete;
        taskDiv.appendChild(taskCheckbox);
        list.append(taskDiv);

        const taskLabel = document.createElement('LABEL');
        taskLabel.htmlFor = todo.id;
        taskDiv.appendChild(taskLabel);

        const taskSpan = document.createElement('SPAN');
        taskSpan.className = 'custom-checkbox';
        taskLabel.appendChild(taskSpan);
        taskLabel.append(todo.text);
    });
}

//Turn text into a new object and push to the todoItems Array
function addTodo(text) {
    let todoItems = JSON.parse(localStorage.getItem('todoItems')) || [];

    const todo = {
        text,
        complete: false,
        id: Date.now(),
    };

    todoItems.push(todo);
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
    renderTodos()
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
function clearList() {
    while (list.firstChild) {
        list.removeChild(list.firstChild)
    }
}

//for checking items off - This is where the TypeError is coming up
list.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'input') {
        let todoItems = JSON.parse(localStorage.getItem('todoItems')) || [];
        const clickedTodo = todoItems.find(todo => todo.id === parseInt(e.target.id));
        clickedTodo.complete = e.target.checked
        localStorage.setItem('todoItems', JSON.stringify(todoItems))
    }
})

//for deleting completed tasks
const deleteCompletedTaskButton = document.querySelector('[data-clear-complete-tasks-button]');
deleteCompletedTaskButton.addEventListener('click', e => {
    let todoItems = JSON.parse(localStorage.getItem('todoItems')) || [];
    todoItems = todoItems.filter(todo => !todo.complete)

    localStorage.setItem('todoItems', JSON.stringify(todoItems))
    renderTodos()
})

//for deleting all tasks
const deleteAllTasksButton = document.querySelector('[data-delete-all-tasks-button]');
deleteAllTasksButton.addEventListener('click', e => {
    localStorage.setItem('todoItems', JSON.stringify([]))
    clearList()
    renderTodos()
})

renderTodos()