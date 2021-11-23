import { Pack } from "../models";

export const saveToSyncedStorage = async (packs: Pack[]) => {
  const currentPacks = await chrome.storage.sync.get(["syntyAssets"]);
  const packSet = new Set(currentPacks["syntyAssets"]);

  packs.forEach((pack) => packSet.add(pack));
  const uniquePacks = Array.from(packSet);
  console.log(`DEBUG--------------------------
  current: ${JSON.stringify(currentPacks, null, 2)}
  new: ${JSON.stringify(packs, null, 2)},
  unique: ${JSON.stringify(uniquePacks, null, 2)}`);
  await chrome.storage.sync.set({ syntyAssets: uniquePacks });
};
