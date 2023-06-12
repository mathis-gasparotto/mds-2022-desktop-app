import { apiUrl } from '../plugins/constants.js'
import { maxStringLenght } from '../plugins/formatting.js'
import { addAlert } from './alertService.js'

const todoList = document.getElementById('todos')
var todos = []

export async function getTodos() {
  const promise = await fetch(`${apiUrl}/todos`)
  todos = await promise.json()
  return todos
}

export function deleteTodoAddEvent(btn) {
  btn.addEventListener('click', (event) => {
    const id = parseInt(event.target.id.replace('delete-todo-', ''))
    deleteTodo(id)
  })
}

export async function addTodo(title, content, datetime, important, completed = false) {
  const payload = {
    title,
    content,
    datetime,
    important,
    completed
  }
  return await fetch(`${apiUrl}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }).then(async (res) => {
    const resJson = await res.json()
    if (res.status < 200 || res.status >= 300) {
      addAlert(resJson.message)
      return
    }
    addAlert('Todo added successfully', 'success')
    todos.push(resJson)
    printTodo(resJson)
    return res
  })
}

export async function deleteTodo(todoId) {
  await fetch(`${apiUrl}/todos/${todoId}`, {
    method: 'DELETE'
  }).then(async (res) => {
    if (res.status < 200 || res.status >= 300) {
      const resJson = await res.json()
      addAlert(resJson.message)
      return
    }
    addAlert('Todo deleted successfully', 'success')
    todos = todos.filter((e) => e.id !== todoId)
    unPrintTodo(todoId)
  })
}

export function unPrintTodo(todoId) {
  document.getElementById(`todo-${todoId}`).remove()
}

export function printTodo(todoObject) {
  const todo = document.createElement('li')
  const delBtn = document.createElement('button')
  const checkbox = document.createElement('input')
  checkbox.setAttribute('type', 'checkbox')
  checkbox.setAttribute('id', `todo-${todoObject.id}-checkbox`)
  checkbox.classList.add('form-check-input')
  checkbox.classList.add('todo-checkbox')
  checkbox.checked = todoObject.completed
  checkbox.addEventListener('change', async (event) => {
    const id = parseInt(event.target.id.replace('todo-', '').replace('-checkbox', ''))
    checkTodo(id)
  })
  delBtn.innerText = 'Delete'
  delBtn.classList.add('btn')
  delBtn.classList.add('btn-danger')
  delBtn.classList.add('delete-btn')
  delBtn.classList.add('delete-btn')
  delBtn.setAttribute('id', `delete-todo-${todoObject.id}`)
  deleteTodoAddEvent(delBtn)
  todo.setAttribute('id', `todo-${todoObject.id}`)
  todo.innerText = maxStringLenght(todoObject.title, 20)
  todo.appendChild(checkbox)
  todo.appendChild(delBtn)
  todo.classList.add('todo')
  if (todoObject.completed) todo.classList.add('completed')
  if (todoObject.important) todo.classList.add('important')
  todoList.appendChild(todo)
}

export async function checkTodo(id) {
  const todo = todos.find((e) => e.id === id)
  todo.completed = !todo.completed
  await fetch(`${apiUrl}/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  }).then(async (res) => {
    const resJson = await res.json()
    if (res.status < 200 || res.status >= 300) {
      addAlert(resJson.message)
      return
    }
    const todo = todos.find((e) => e.id === resJson.id)
    todo.completed = resJson.completed
    const todoElement = document.getElementById(`todo-${resJson.id}`)
    if (resJson.completed) {
      todoElement.classList.add('completed')
      addAlert('Todo successfully checked', 'success')
    } else {
      todoElement.classList.remove('completed')
      addAlert('Todo successfully unchecked', 'success')
    }
  })
}
