import { Pack } from "../models";
import { PACKS_CHROME_STORAGE_KEY } from "../constants";

export const saveToSyncedStorage = async (packs: Pack[]) => {
  const currentPacks = await chrome.storage.sync.get([
    PACKS_CHROME_STORAGE_KEY,
  ]);
  const packSet = new Set(currentPacks[PACKS_CHROME_STORAGE_KEY]);

  packs.forEach((pack) => packSet.add(pack));
  const uniquePacks = Array.from(packSet);

  await chrome.storage.sync.set({ PACKS_CHROME_STORAGE_KEY: uniquePacks });
};
