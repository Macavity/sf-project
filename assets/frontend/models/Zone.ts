import { ContinentKey } from 'assets/frontend/models/Continent';
import { Stage } from 'assets/frontend/models/Stage';

export class Zone {
  public stages: Stage[];

  constructor(
    public id: number,
    public continent: string,
    public name: string,
    public slug: string = '',
  ) {
    this.stages = [];
  }

  get key(){
    return this.id;
  }

  public getStages(): Stage[] {
    return this.stages;
  }
}
