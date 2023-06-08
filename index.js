addEventListener('DOMContentLoaded', () => {
  event.preventDefault()

  let todos = [
    {
      title: 'Test',
      content: '',
      datetime: new Date(),
      important: false,
      completed: false
    },
    {
      title: 'Test',
      content: '',
      datetime: new Date(),
      important: false,
      completed: false
    },
    {
      title: 'Test',
      content: '',
      datetime: new Date(),
      important: false,
      completed: false
    },
    {
      title: 'Test',
      content: '',
      datetime: new Date(),
      important: false,
      completed: false
    },
    {
      title: 'Test',
      content: '',
      datetime: new Date(),
      important: false,
      completed: false
    }
  ]

  const todoList = document.getElementById('todos')

  todos.forEach(todo => {
    printTodo(todo)
  })

  const form = document.getElementById('create-todo-form')
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    addTodo(event.target[0].value, event.target[1].value, event.target[2].value, event.target[3].checked)
    event.target[0].value = ''
    event.target[1].value = ''
    event.target[2].value = ''
    event.target[3].checked = false
  })

  function addTodo(title, content, datetime, important, completed = false) {
    const todo = {
      title,
      content,
      datetime,
      important,
      completed
    }
    todos.push(todo)
    printTodo(todo)
  }

  function printTodo(todoObject) {
    const todo = document.createElement('li')
    const delBtn = document.createElement('button')
    delBtn.classList.add('btn')
    delBtn.classList.add('btn-danger')
    todo.innerText = todoObject.title
    todo.appendChild(delBtn)
    todo.classList.add('todo')
    if (todoObject.completed) todo.classList.add('completed')
    if (todoObject.important) todo.classList.add('important')
    todoList.appendChild(todo)
  }
  
})