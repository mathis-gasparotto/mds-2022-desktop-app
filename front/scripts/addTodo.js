import { addTodo } from '../services/todoService.js'

addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('create-todo-form')
  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    await addTodo(event.target[0].value, event.target[1].value, event.target[2].value, event.target[3].checked).then((res) => {
      if (res && res.status >= 200 && res.status < 300) {
        event.target[0].value = ''
        event.target[1].value = ''
        event.target[2].value = ''
        event.target[3].checked = false
        window.location.href = 'todos.html'
      }
    })
  })
})
