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

function deleteTodoAddEvent(btn) {
  btn.addEventListener('click', (event) => {
    const id = parseInt(event.target.id.replace('delete-todo-', ''))
    deleteTodo(id)
  })
}

function editTodoAddEvent(btn) {
  btn.addEventListener('click', (event) => {
    const id = parseInt(event.target.id.replace('edit-todo-', ''))
    editTodo(id)
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

export function deleteTodo(todoId) {
  fetch(`${apiUrl}/todos/${todoId}`, {
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

export function editTodo(todoId) {
  console.log(todoId)
}

export function unPrintTodo(todoId) {
  document.getElementById(`todo-${todoId}`).remove()
}

export function printTodo(todoObject) {
  const todoCard = document.createElement('div')
  const cardBody = document.createElement('div')
  const todoTitle = document.createElement('h5')
  const todoDate = document.createElement('h6')
  const cardText = document.createElement('p')

  const delBtn = document.createElement('button')
  const editBtn = document.createElement('button')
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
  delBtn.classList.add('card-link')
  delBtn.setAttribute('id', `delete-todo-${todoObject.id}`)
  delBtn.setAttribute('type', 'button')
  deleteTodoAddEvent(delBtn)
  
  editBtn.innerText = 'Edit'
  editBtn.classList.add('btn')
  editBtn.classList.add('btn-success')
  editBtn.classList.add('edit-btn')
  editBtn.classList.add('card-link')
  editBtn.setAttribute('id', `edit-todo-${todoObject.id}`)
  editBtn.setAttribute('type', 'button')
  editTodoAddEvent(editBtn)

  todoCard.setAttribute('id', `todo-${todoObject.id}`)
  todoCard.classList.add('card')
  todoCard.classList.add('todos-card')
  cardBody.classList.add('card-body')
  todoCard.appendChild(cardBody)

  todoTitle.classList.add('card-title')
  todoTitle.innerText = maxStringLenght(todoObject.title, 20)

  todoDate.classList.add('card-subtitle')
  todoDate.classList.add('mb-2')
  if (!todoObject.important) todoDate.classList.add('text-muted')
  todoDate.innerText = todoObject.datetime
  
  cardText.classList.add('card-text')
  cardText.innerText = todoObject.content
  
  cardBody.appendChild(checkbox)
  cardBody.appendChild(todoTitle)
  cardBody.appendChild(todoDate)
  cardBody.appendChild(cardText)
  cardBody.appendChild(delBtn)
  cardBody.appendChild(editBtn)

  if (todoObject.completed) todoCard.classList.add('completed')
  if (todoObject.important) todoCard.classList.add('important')
  todoList.appendChild(todoCard)
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
