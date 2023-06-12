import { addTodo, deleteTodoAddEvent, getTodos, printTodo } from './services/todoService.js'

addEventListener('DOMContentLoaded', async () => {
  const todos = await getTodos()


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

  todos.forEach((todo) => {
    printTodo(todo)
  })

  // ********** EVENT LISTENERS ********** //

  const form = document.getElementById('create-todo-form')
  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    await addTodo(event.target[0].value, event.target[1].value, event.target[2].value, event.target[3].checked).then(
      (res) => {
        if (res && res.status >= 200 && res.status < 300) {
          event.target[0].value = ''
          event.target[1].value = ''
          event.target[2].value = ''
          event.target[3].checked = false
        }
      }
    )
  })

  const deleteBtns = document.querySelectorAll('.delete-btn')
  deleteBtns.forEach((btn) => {
    deleteTodoAddEvent(btn)
  })
})
