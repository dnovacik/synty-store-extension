import { PackType, PackOrigin, MessageRequest } from "../models";
import {
  UAS_POLYGON_SERIES_LINK,
  UAS_SIMPLE_SERIES_LINK,
  NOTIFICATIONS_REQUEST,
} from "../constants";
import { getPackOriginName, getUASPacksName, getPackTypeName } from "../utils";
import { saveToSyncedStorage } from "../background/storage";

const onLoad = async () => {
  if (location.href === UAS_POLYGON_SERIES_LINK) {
    await syncPacks(PackType.POLYGON);
  } else if (location.href === UAS_SIMPLE_SERIES_LINK) {
    await syncPacks(PackType.SIMPLE);
  } else {
    return;
  }
};

const syncPacks = async (type: PackType) => {
  const packs = getUASPacksName(type);

  console.log(packs);

  await saveToSyncedStorage(packs);
  // send notification about the result
  syncNotification(true, PackOrigin.UAS, type);
};

const syncNotification = (
  success: boolean,
  origin: PackOrigin,
  type: PackType
) => {
  const options = {
    type: "basic",
    title: `${getPackTypeName(type)} synchronization finished`,
    silent: true,
    requireInteraction: false,
    message: `Synchronization from ${getPackOriginName(origin)} ${
      success ? "completed" : "failed"
    }!`,
    iconUrl: "../favicon.png",
  };

  const request: MessageRequest = {
    type: NOTIFICATIONS_REQUEST,
    data: options,
  };

  // send to background for sync result notification
  chrome.runtime.sendMessage(request);
};

// listeners
window.addEventListener("load", () => {
  onLoad();
});
