import { getCompletedTodosCount, getFuturTodosCount, getImportantTodosCount, getPastTodosCount, getTodayTodosCount, getUncompletedTodosCount } from "../services/todoService.js"

addEventListener('DOMContentLoaded', async () => {
  const ctx = document.getElementById('myChart')
  const seondCtx = document.getElementById('mySecondChart')

  const completedTodosCount = await getCompletedTodosCount()
  const uncompletedTodosCount = await getUncompletedTodosCount()
  const importantTodosCount = await getImportantTodosCount()

  const pastTodosCount = await getPastTodosCount()
  const todayTodosCount = await getTodayTodosCount()
  const futurTodosCount = await getFuturTodosCount()

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Completed', 'Uncompleted', 'Important'],
      datasets: [
        {
          label: 'Todos Count',
          data: [completedTodosCount, uncompletedTodosCount, importantTodosCount],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })

  new Chart(seondCtx, {
    type: 'doughnut',
    data: {
      labels: ['Past', 'Today', 'Futur'],
      datasets: [
        {
          label: 'Todos Count',
          data: [pastTodosCount, todayTodosCount, futurTodosCount],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Doughnut Chart'
        }
      }
    }
  })
})
