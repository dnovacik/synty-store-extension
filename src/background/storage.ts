import { Pack } from "../models";
import { flattenPacks, mergePacks } from "../utils";

export const getPacksFromSyncedStorage = async (): Promise<Pack[]> => {
  const packs = await chrome.storage.sync.get(["syntyAssets"]);
  // just a consistency measure
  return flattenPacks(packs["syntyAssets"]);
};

export const savePacksToSyncedStorage = async (
  packs: Pack[]
): Promise<void> => {
  const currentPacks = await getPacksFromSyncedStorage();
  const mergedPacks = mergePacks(currentPacks, packs);
  const simplifiedPacks = flattenPacks(mergedPacks);

  await chrome.storage.sync.set({ syntyAssets: simplifiedPacks });
};
