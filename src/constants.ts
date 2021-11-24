import pkg from "./../package.json";

export const EXTENSION_VERSION = pkg.version;

export const NOTIFICATIONS_REQUEST = "NOTIFICATION";

export const UAS_POLYGON_SERIES_LINK =
  "https://assetstore.unity.com/lists/list-44060";
export const UAS_SIMPLE_SERIES_LINK =
  "https://assetstore.unity.com/lists/list-65459";
export const UAS_POLYGON_PURCHASED_XPATH = `//*[@id="main-layout-scroller"]/div/div[1]/div[2]/div/div[2]/div/div/div[2]/div/div/div/div/div/a/div[2]/div[text()="PURCHASED"]/ancestor::a/following-sibling::div/a/div[1]/div[2]/text()[1]`;
export const UAS_SIMPLE_PURCHASED_XPATH = `//*[@id="main-layout-scroller"]/div/div[1]/div[2]/div/div[2]/div/div/div[2]/div/div/div/div/div/a/div[2]/div[text()="PURCHASED"]/ancestor::a/following-sibling::div/a/div[1]/div[2]/text()[1]`;

export const SS_LINK = "https://syntystore.com/apps/downloads/orders/";
export const SS_POLYGON_PURCHASED_XPATH = `//*[@id="synty-store"]/main/div[1]/div/div/div[2]/a/div/div[text()[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'polygon')]]`;
export const SS_SIMPLE_PURCHASED_XPATH = `//*[@id="synty-store"]/main/div[1]/div/div/div[2]/a/div/div[text()[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'simple')]]`;
