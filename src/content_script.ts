const MSG_EXAMPLE = "EXAMPLE";

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg === MSG_EXAMPLE) {
    sendResponse(`${MSG_EXAMPLE} received`)
  }
})