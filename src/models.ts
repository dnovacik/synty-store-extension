export interface MessageRequest {
  type: string;
  data: any;
}

export interface PacksData {
  packs: Array<Pack>;
}

export interface Pack {
  name: string;
  type: PackType;
  owned: {
    [key in keyof typeof PackOrigin]: boolean
  }
}

export enum PackType {
  SIMPLE,
  POLYGON
}

export enum PackOrigin {
  UAS,
  SS
}