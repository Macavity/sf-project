export enum TagType {
  Difficult = 1,
}

export class Tag {
  constructor(
    public type: TagType,
  ) {
  }
}
