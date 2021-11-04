import { ContinentDTO } from '../../continents/dto/continent.dto';

export class ZoneDTO {
  constructor(
    public id: number,
    public position: number,
    public slug: string,
    public name: string,
    public scoreStart: number,
    public continent: ContinentDTO|undefined,
  ) {

  }
}

