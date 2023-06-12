const alerts = document.getElementById('alerts')

export function addAlert(message, type = 'danger') {
  const alert = document.createElement('div')
  alert.classList.add('alert')
  alert.classList.add(`alert-${type}`)
  alert.innerText = message
  alerts.appendChild(alert)
  setTimeout(() => {
    alert.remove()
  }, 5000)
}