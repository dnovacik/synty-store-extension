import { NOTIFICATIONS_REQUEST } from "../constants";
import { MessageRequest } from "../models";

chrome.runtime.onMessage.addListener((request: MessageRequest) => {
  if (request.type === NOTIFICATIONS_REQUEST) {
    chrome.notifications.create(`${Date.now}_NOTIFICATION_ID`, request.data);
  }
});
