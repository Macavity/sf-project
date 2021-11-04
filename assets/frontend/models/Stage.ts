import { AreaKey, AreaNames } from 'assets/frontend/enums/AreaKey';
import { ContinentKey } from 'assets/frontend/models/Continent';
import { Boss } from 'assets/frontend/models/Boss';
import { BossType } from 'assets/frontend/enums/BossType';

export class Stage {
  public name: string;

  constructor(
    public id: number,
    public continent: ContinentKey,
    public areaKey: number,
    public level: number,
    public bossKey: BossType,
    public boss: Boss,
  ) {
    this.name = AreaNames[areaKey];
  }

  public getScore(): number {
    return Stage.calcScore(this.areaKey, this.level);
  }

  static calcScore(areaKey: AreaKey, stage: number) {
    const areaKeyScore = areaKey as number * 1000;

    return areaKeyScore + stage;
  }
}
