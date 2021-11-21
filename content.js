const GET_TASK_MESSAGE = 'getTaskData'

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let response = null;

  if (request.message === GET_TASK_MESSAGE) {
    response = getTaskData()
  }

  if (response) {
    navigator.clipboard.writeText(`${response.id} - ${response.description} - 0%`)
      .then(() => {
        return true
      })
  }

  sendResponse(response)

  return true
})

function getTaskData() {
  const taskId = document.querySelector('#issuekey-val > a')
  const taskDescription = document.querySelector('#summary-val')

  return (taskId && taskDescription)
    ? { id: taskId.innerText, description: taskDescription.innerText }
    : null
}