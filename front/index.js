addEventListener('DOMContentLoaded', async () => {
  const apiUrl = 'http://localhost:3000'

  const promise = await fetch(`${apiUrl}/todos`)
  var todos = await promise.json()

  const alerts = document.getElementById('alerts')

  // var todos = [
  //   {
  //     id: 1,
  //     title: 'Test',
  //     content: '',
  //     datetime: new Date(),
  //     important: false,
  //     completed: false
  //   },
  //   {
  //     id: 2,
  //     title: 'Test',
  //     content: '',
  //     datetime: new Date(),
  //     important: false,
  //     completed: false
  //   },
  //   {
  //     id: 3,
  //     title: 'Test',
  //     content: '',
  //     datetime: new Date(),
  //     important: false,
  //     completed: false
  //   },
  //   {
  //     id: 4,
  //     title: 'Test',
  //     content: '',
  //     datetime: new Date(),
  //     important: false,
  //     completed: false
  //   },
  //   {
  //     id: 5,
  //     title: 'Test',
  //     content: '',
  //     datetime: new Date(),
  //     important: false,
  //     completed: false
  //   }
  // ]

  const todoList = document.getElementById('todos')

  todos.forEach((todo) => {
    printTodo(todo)
  })

  // ********** EVENT LISTENERS ********** //

  const form = document.getElementById('create-todo-form')
  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    await addTodo(event.target[0].value, event.target[1].value, event.target[2].value, event.target[3].checked)
    event.target[0].value = ''
    event.target[1].value = ''
    event.target[2].value = ''
    event.target[3].checked = false
  })

  const deleteBtns = document.querySelectorAll('.delete-btn')
  deleteBtns.forEach((btn) => {
    deleteTodoAddEvent(btn)
  })

  // ********** FUNCTIONS ********** //

  function addAlert(message, type = 'danger') {
    const alert = document.createElement('div')
    alert.classList.add('alert')
    alert.classList.add(`alert-${type}`)
    alert.innerText = message
    alerts.appendChild(alert)
    setTimeout(() => {
      alert.remove()
    }, 5000)
  }

  function deleteTodoAddEvent(btn) {
    btn.addEventListener('click', (event) => {
      const id = parseInt(event.target.id.replace('delete-todo-', ''))
      deleteTodo(id)
      console.log(id)
    })
  }

  async function addTodo(title, content, datetime, important, completed = false) {
    const payload = {
      title,
      content,
      datetime,
      important,
      completed
    }
    await fetch(`${apiUrl}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(async (res) => {
      const resJson = await res.json()
      if (res.status !== 200) {
        addAlert(resJson.message)
        return
      }
      todos.push(resJson)
      printTodo(resJson)
    })
  }

  function deleteTodo(todoId) {
    todos = todos.filter((e) => e.id !== todoId)
    unPrintTodo(todoId)
  }

  function unPrintTodo(todoId) {
    document.getElementById(`todo-${todoId}`).remove()
  }

  function printTodo(todoObject) {
    const todo = document.createElement('li')
    const delBtn = document.createElement('button')
    delBtn.innerText = 'Delete'
    delBtn.classList.add('btn')
    delBtn.classList.add('btn-danger')
    delBtn.classList.add('delete-btn')
    delBtn.classList.add('delete-btn')
    delBtn.setAttribute('id', `delete-todo-${todoObject.id}`)
    deleteTodoAddEvent(delBtn)
    todo.setAttribute('id', `todo-${todoObject.id}`)
    todo.innerText = todoObject.title
    todo.appendChild(delBtn)
    todo.classList.add('todo')
    if (todoObject.completed) todo.classList.add('completed')
    if (todoObject.important) todo.classList.add('important')
    todoList.appendChild(todo)
  }
})
