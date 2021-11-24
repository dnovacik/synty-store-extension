import { Pack, PersistedData } from "../models";
import { EXTENSION_VERSION } from "../constants";
import { flattenPacks, mergePacks } from "../utils";

export const getPacksFromSyncedStorage = async (): Promise<PersistedData | null> => {
  const data = await chrome.storage.sync.get(["syntyAssets"]);

  const persisted = data["syntyAssets"] as PersistedData;

  return persisted
    ? {
      ...persisted,
      packs: flattenPacks(persisted.packs ?? [])
    }
    : null;
};

export const savePacksToSyncedStorage = async (packs: Array<Pack>): Promise<void> => {
  const currentData = await getPacksFromSyncedStorage();
  const mergedPacks = mergePacks(currentData ? currentData.packs : [], packs);
  const simplifiedPacks = flattenPacks(mergedPacks);

  await chrome.storage.sync.set({ syntyAssets: { version: EXTENSION_VERSION, packs: simplifiedPacks } });
};
