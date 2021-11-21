import { Pack, PackOrigin, PackType } from "./models";
import { UAS_POLYGON_PURCHASED_XPATH, UAS_SIMPLE_PURCHASED_XPATH, SS_POLYGON_PURCHASED_XPATH, SS_SIMPLE_PURCHASED_XPATH } from "./constants";

export const getPackOriginName = (origin: PackOrigin) => {
  return origin === PackOrigin.SS
    ? "Synty Store"
    : "Unity Asset Store";
}

export const getPackTypeName = (type: PackType) => {
  return type === PackType.POLYGON
    ? "Polygon Series"
    : "Simple Serires";
}

export const getUASPacksName = (type: PackType): Array<Pack> => {
  const packNames = type === PackType.POLYGON
    ? getElementsByXPath(UAS_POLYGON_PURCHASED_XPATH)
    : getElementsByXPath(UAS_SIMPLE_PURCHASED_XPATH);

  return packNames.map((pack) => {
    return {
      name: pack,
      type: type,
      owned: {
        UAS: true,
        SS: false
      }
    }
  })
}

export const getSSPacksName = (): Array<Pack> => {
  const polygon = getElementsByXPath(SS_POLYGON_PURCHASED_XPATH).map((pack) => {
    return {
      name: pack,
      type: PackType.POLYGON,
      owned: {
        UAS: false,
        SS: true
      }
    }
  });

  const simple = getElementsByXPath(SS_SIMPLE_PURCHASED_XPATH).map((pack) => {
    return {
      name: pack,
      type: PackType.SIMPLE,
      owned: {
        UAS: false,
        SS: true
      }
    }
  });

  return polygon.concat(simple);
}

export const getElementsByXPath = (path: string) => {
  const query = document.evaluate(path, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

  const result: Array<string> = [];

  for (let i = 0; i < query.snapshotLength; i++) {
    const item = query.snapshotItem(i);

    if (item && item.textContent) {
      result.push(item.textContent.replace("- Low Poly 3D Art by Synty", "").trim());
    }
  }

  return result;
}