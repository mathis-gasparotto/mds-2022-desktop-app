import { apiUrl } from '../plugins/constants.js'
import { dateTimeToInput, displayDateTime, maxStringLenght } from '../plugins/formatting.js'
import { addAlert } from '../plugins/alerts.js'
import { removeAllModals, showModal } from '../plugins/modal.js'

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
    showEditTodoPopup(id)
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
      return res
    }
    addAlert('Todo added successfully', 'success')
    todos.push(resJson)
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

export function showEditTodoPopup(todoId) {
  const todo = todos.find((e) => e.id === todoId)

  const form = document.createElement('form')
  const titleContainer = document.createElement('div')
  const titleLabel = document.createElement('label')
  const titleInput = document.createElement('input')
  const contentContainer = document.createElement('div')
  const contentLabel = document.createElement('label')
  const contentInput = document.createElement('textarea')
  const datetimeContainer = document.createElement('div')
  const datetimeLabel = document.createElement('label')
  const datetimeInput = document.createElement('input')
  const importantContainer = document.createElement('div')
  const importantLabel = document.createElement('label')
  const importantInput = document.createElement('input')
  const submitBtn = document.createElement('button')

  form.setAttribute('id', 'edit-todo-form')

  titleContainer.classList.add('mb-3')
  titleLabel.setAttribute('for', 'edit-todo-title')
  titleLabel.classList.add('form-label')
  titleLabel.innerText = 'Title'
  titleInput.setAttribute('type', 'text')
  titleInput.setAttribute('id', 'edit-todo-title')
  titleInput.classList.add('form-control')
  titleInput.value = todo.title

  contentContainer.classList.add('mb-3')
  contentLabel.setAttribute('for', 'edit-todo-content')
  contentLabel.classList.add('form-label')
  contentLabel.innerText = 'Content'
  contentInput.classList.add('form-control')
  contentInput.setAttribute('id', 'edit-todo-content')
  contentInput.setAttribute('rows', '3')
  contentInput.value = todo.content

  datetimeContainer.classList.add('mb-3')
  datetimeLabel.setAttribute('for', 'edit-todo-datetime')
  datetimeLabel.classList.add('form-label')
  datetimeLabel.innerText = 'Date and time'
  datetimeInput.setAttribute('type', 'datetime-local')
  datetimeInput.setAttribute('id', 'edit-todo-datetime')
  datetimeInput.classList.add('form-control')
  datetimeInput.value = dateTimeToInput(todo.datetime)

  importantContainer.classList.add('mb-3')
  importantContainer.classList.add('form-check')
  importantLabel.classList.add('form-check-label')
  importantLabel.setAttribute('for', 'edit-todo-important')
  importantLabel.innerText = 'Important'
  importantInput.setAttribute('type', 'checkbox')
  importantInput.setAttribute('id', 'edit-todo-important')
  importantInput.classList.add('form-check-input')
  importantInput.checked = todo.important

  submitBtn.setAttribute('type', 'submit')
  submitBtn.classList.add('btn')
  submitBtn.classList.add('btn-primary')
  submitBtn.innerText = 'Save changes'

  titleContainer.appendChild(titleLabel)
  titleContainer.appendChild(titleInput)
  contentContainer.appendChild(contentLabel)
  contentContainer.appendChild(contentInput)
  datetimeContainer.appendChild(datetimeLabel)
  datetimeContainer.appendChild(datetimeInput)
  importantContainer.appendChild(importantInput)
  importantContainer.appendChild(importantLabel)
  form.appendChild(titleContainer)
  form.appendChild(contentContainer)
  form.appendChild(datetimeContainer)
  form.appendChild(importantContainer)
  form.appendChild(submitBtn)

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const payload = {
      title: event.target[0].value,
      content: event.target[1].value,
      datetime: event.target[2].value,
      important: event.target[3].checked,
      completed: todo.completed
    }
    updateTodo(todoId, payload).then((res) => {
      if (res && res.status >= 200 && res.status < 300) {
        addAlert('Todo edited successfully', 'success')
        removeAllModals()
      }
    })
  })

  showModal('Edit todo', form, 'Cancel')

  // showModal('Edit todo', `
  //   <form id="edit-todo-form">
  //     <div class="mb-3">
  //       <label for="edit-todo-title" class="form-label">Title</label>
  //       <input type="text" class="form-control" id="edit-todo-title" value="${todo.title}">
  //     </div>
  //     <div class="mb-3">
  //       <label for="edit-todo-content" class="form-label">Content</label>
  //       <textarea class="form-control" id="edit-todo-content" rows="3">${todo.content}</textarea>
  //     </div>
  //     <div class="mb-3">
  //       <label for="edit-todo-datetime" class="form-label">Date and time</label>
  //       <input type="datetime-local" class="form-control" id="edit-todo-datetime" value="${dateTimeToInput(todo.datetime)}">
  //     </div>
  //     <div class="mb-3 form-check">
  //       <input type="checkbox" class="form-check-input" id="edit-todo-important" ${todo.important ? 'checked' : ''}>
  //       <label class="form-check-label" for="edit-todo-important">Important</label>
  //     </div>
  //     <button type="submit" class="btn btn-primary">Save changes</button>
  //   </form>
  // `)
}

function updateTodo (todoId, payload) {
  return fetch(`${apiUrl}/todos/${todoId}`, {
    method: 'PUT',
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
    const todo = todos.find((e) => e.id === resJson.id)
    todo.title = resJson.title
    todo.content = resJson.content
    todo.datetime = resJson.datetime
    todo.important = resJson.important
    const todoElement = document.getElementById(`todo-${resJson.id}`)
    todoElement.querySelector('.card-title').innerText = maxStringLenght(resJson.title, 20)
    todoElement.querySelector('.card-subtitle').innerText = displayDateTime(resJson.datetime)
    todoElement.querySelector('.card-text').innerText = resJson.content
    if (resJson.important) {
      todoElement.querySelector('.card-subtitle').classList.remove('text-muted')
      todoElement.classList.add('important')
    } else {
      todoElement.querySelector('.card-subtitle').classList.add('text-muted')
      todoElement.classList.remove('important')
    }
    return res
  })
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
  todoDate.innerText = displayDateTime(todoObject.datetime)
  
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
export async function getTodosCount() {
  const promise = await fetch(`${apiUrl}/todos/count`)
  const res = await promise.json()
  return res
}
export async function getCompletedTodosCount() {
  const promise = await fetch(`${apiUrl}/todos/completed/count`)
  const res = await promise.json()
  return res
}
export async function getUncompletedTodosCount() {
  const promise = await fetch(`${apiUrl}/todos/uncompleted/count`)
  const res = await promise.json()
  return res
}
export async function getImportantTodosCount() {
  const promise = await fetch(`${apiUrl}/todos/important/count`)
  const res = await promise.json()
  return res
}
export async function getNotImportantTodosCount() {
  const promise = await fetch(`${apiUrl}/todos/not-important/count`)
  const res = await promise.json()
  return res
}
export async function getPastTodosCount() {
  const promise = await fetch(`${apiUrl}/todos/past/count`)
  const res = await promise.json()
  return res
}
export async function getTodayTodosCount() {
  const promise = await fetch(`${apiUrl}/todos/today/count`)
  const res = await promise.json()
  return res
}
export async function getFuturTodosCount() {
  const promise = await fetch(`${apiUrl}/todos/futur/count`)
  const res = await promise.json()
  return res
}