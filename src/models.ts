export interface MessageRequest {
  type: string;
  data: any;
}

export interface PersistedData {
  version: string;
  packs: Array<Pack>;
}

export interface Pack {
  name: string;
  baseName: string;
  type: PackType;
  owned: {
    [key in keyof typeof PackOrigin]: boolean;
  };
}

export enum PackType {
  SIMPLE = "Simple",
  POLYGON = "Polygon",
}

export enum PackOrigin {
  UAS,
  SS,
}
