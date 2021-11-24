import { Pack, PackOrigin, PackType } from "./models";
import {
  UAS_POLYGON_PURCHASED_XPATH,
  UAS_SIMPLE_PURCHASED_XPATH,
  SS_POLYGON_PURCHASED_XPATH,
  SS_SIMPLE_PURCHASED_XPATH,
} from "./constants";
import _ from "lodash";

const packNameRegex =
  /(?<Series>POLYGON|Simple)( - )? ?(?<Name>[\w ]+)(.*)(Pack)?(.*)/i;

export const getPackOriginName = (origin: PackOrigin) => {
  return origin === PackOrigin.SS ? "Synty Store" : "Unity Asset Store";
};

export const getPackTypeName = (type: PackType) => {
  return type === PackType.POLYGON ? "Polygon Series" : "Simple Serires";
};

export const getUASPacksName = (type: PackType): Array<Pack> => {
  const packNames =
    type === PackType.POLYGON
      ? getElementsByXPath(UAS_POLYGON_PURCHASED_XPATH)
      : getElementsByXPath(UAS_SIMPLE_PURCHASED_XPATH);

  return packNames.map((pack) => {
    return flattenPack({
      name: pack,
      baseName: pack,
      type: type,
      owned: {
        SS: false,
        UAS: true,
      },
    } as Pack);
  });
};

export const getSSPacksName = (): Array<Pack> => {
  const polygon = getElementsByXPath(SS_POLYGON_PURCHASED_XPATH).map((pack) => {
    return flattenPack({
      name: pack,
      baseName: pack,
      type: PackType.POLYGON,
      owned: {
        UAS: false,
        SS: true,
      },
    } as Pack);
  });

  const simple = getElementsByXPath(SS_SIMPLE_PURCHASED_XPATH).map((pack) => {
    return flattenPack({
      name: pack,
      baseName: pack,
      type: PackType.SIMPLE,
      owned: {
        UAS: false,
        SS: true,
      },
    } as Pack);
  });

  return polygon.concat(simple);
};

export const getElementsByXPath = (path: string) => {
  const query = document.evaluate(
    path,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );

  const result: Array<string> = [];

  for (let i = 0; i < query.snapshotLength; i++) {
    const item = query.snapshotItem(i);

    if (item && item.textContent) {
      result.push(
        item.textContent.replace("- Low Poly 3D Art by Synty", "").trim()
      );
    }
  }

  return result;
};

export const flattenPackName = (name: string) => {
  const match = name.match(packNameRegex);

  if (!match || !match.groups?.Series || !match.groups?.Name) {
    return name;
  }

  const type =
    match.groups.Series.toLowerCase() === "polygon"
      ? PackType.POLYGON
      : PackType.SIMPLE;

  const baseName = match.groups.Name.replace(/[Pp]ack/, "").trim();

  return {
    name: `${type} - ${baseName}`,
    baseName,
    type,
  };
};

export const flattenPack = (pack: Pack): Pack => {
  const data = flattenPackName(pack.name);

  if (typeof data === "string") {
    return pack;
  } else {
    return {
      name: data.name,
      baseName: data.baseName,
      type: data.type,
      owned: pack.owned,
    } as Pack;
  }
};

export const flattenPacks = (packs: Pack[]): Pack[] => {
  return packs.map((pack: Pack) => flattenPack(pack));
};

const arrHasPack = (arr: Pack[], pack: Pack) => {
  return !!arr.find((p) => p.name === pack.name);
};

export const mergePacks = (original: Pack[], newPacks: Pack[]): Pack[] => {
  const packs = [...original];
  /*
  1) if original doesn't have newPack, add it
  2) if original has pack with name name as newPack:
    2.1) if both are deep equal, ignore
    2.2) if both are not deep equal, merge UAS and SS
   */
  newPacks.forEach((newPack) => {
    if (!arrHasPack(original, newPack)) packs.push(newPack);
    else {
      const originalPack = original.find((p) => p.name === newPack.name);
      if (!originalPack) return;
      if (_.isEqual(originalPack, newPack)) return;

      packs[packs.indexOf(originalPack)] = {
        name: newPack.name,
        baseName: newPack.baseName,
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
