chrome.runtime.onInstalled.addListener(async function () {
  console.log('background running')
  chrome.browserAction.onClicked.addListener(async (tab) => {
    await getTaskData(tab.id, 'getTaskData')
  })

  async function getTaskData(tabId, message) {
    chrome.tabs.sendMessage(tabId, { message: message })
  }
})

