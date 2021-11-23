import { Pack } from "../models";
import _ from "lodash";

const polygonRegex = /POLYGON( - )? ?(?<Name>[\w ]+)(.*)(Pack)?(.*)/i;
const simpleRegex = /Simple( - )? ?(?<Name>[\w ]+)(.*)(Pack)?(.*)/i;

const arrHasPack = (arr: Pack[], pack: Pack) => {
  return !!arr.find((p) => p.name === pack.name);
};

const mergePacks = (original: Pack[], newPacks: Pack[]) => {
  const packs = [...original];

  newPacks.forEach((newPack) => {
    if (!arrHasPack(original, newPack)) packs.push(newPack);
    else {
      const originalPack = original.find((p) => p.name === newPack.name);
      if (!originalPack) return;
      if (_.isEqual(originalPack, newPack)) return;

      packs[packs.indexOf(originalPack)] = {
        name: newPack.name,
        type: newPack.type,
        owned: {
          UAS: originalPack?.owned.UAS || newPack.owned.UAS,
          SS: originalPack?.owned.SS || newPack.owned.SS,
        },
      } as Pack;
    }
  });

  return _.uniq(packs);
};

const simplifyPackName = (name: string) => {
  const polygonMatch = name.match(polygonRegex);
  const simpleMatch = name.match(simpleRegex);

  if (polygonMatch) {
    const packName = polygonMatch.groups?.Name;
    if (!packName) return name;

    return `Polygon - ${packName.replace(/[Pp]ack/, "").trim()}`;
  } else if (simpleMatch) {
    const packName = simpleMatch.groups?.Name;
    if (!packName) return name;

    return `Simple - ${packName.replace(/[Pp]ack/, "").trim()}`;
  } else return name;
};

export const getPacksFromSyncedStorage = async () => {
  const packs = await chrome.storage.sync.get(["syntyAssets"]);
  return packs["syntyAssets"] as Pack[];
};

export const saveToSyncedStorage = async (packs: Pack[]) => {
  const currentPacks = await getPacksFromSyncedStorage();
  const mergedPacks = mergePacks(currentPacks, packs);
  const simplifiedPacks = mergedPacks.map((p) => {
    return { ...p, name: simplifyPackName(p.name) };
  });

  console.log(`DEBUG:
  saved: ${JSON.stringify(currentPacks, null, 2)}
  new: ${JSON.stringify(packs, null, 2)}
  final: ${JSON.stringify(simplifiedPacks, null, 2)}`);

  await chrome.storage.sync.set({ syntyAssets: simplifiedPacks });
};
