import { showModal } from '../plugins/modal.js'
import { getTodos, printTodo } from '../services/todoService.js'

addEventListener('DOMContentLoaded', async () => {
  const todos = await getTodos()

  todos.forEach((todo) => {
    printTodo(todo)
  })
})
