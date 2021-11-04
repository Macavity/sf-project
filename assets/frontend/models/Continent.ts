
export enum ContinentKey {
  None,
  Fire,
  Frost,
  Soil,
  Lightning,
}

export class Continent {
  constructor(
    public id: ContinentKey,
    public name: string,
    public slug: string,
  ) {
  }
}
