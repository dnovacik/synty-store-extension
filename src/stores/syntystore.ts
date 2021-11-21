import { PacksData, Pack, PackType, PackOrigin, MessageRequest } from "./../models";
import { SS_LINK, NOTIFICATIONS_REQUEST } from "../constants";
import { getPackOriginName, getSSPacksName, getPackTypeName } from "./../utils";

const onLoad = () => {
  if (location.href.includes(SS_LINK)) {
    syncPacks();
  }
}

const syncPacks = () => {
  const packs = getSSPacksName();

  console.log(packs);

  // TODO: save to chrome storage
  // send notification about the result
  syncNotification(true, PackOrigin.UAS);
}

const syncNotification = (success: boolean, origin: PackOrigin) => {
  const options = {
    type: "basic",
    title: `Synchronization finished`,
    silent: true,
    requireInteraction: false,
    message: `Synchronization from ${getPackOriginName(origin)} ${success ? "completed" : "failed"}!`,
    iconUrl: "../favicon.png"
  };

  const request: MessageRequest = {
    type: NOTIFICATIONS_REQUEST,
    data: options
  };

  // send to background for sync result notification
  chrome.runtime.sendMessage(request);
}

// listeners
window.addEventListener("load", () => {
  onLoad();
});