addEventListener('DOMContentLoaded', () => {
  event.preventDefault()
  const form = document.getElementById('create-todo-form')
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const todo = document.createElement('li')
    const todoList = document.getElementById('todos')
    todo.innerText = event.target[0].value
    todo.classList.add('todo')
    event.target[0].value = ''
    todoList.appendChild(todo)
  })
  
})