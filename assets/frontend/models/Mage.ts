import { ClassSetup } from 'assets/frontend/models/ClassSetup';
import { ClassType } from 'assets/frontend/enums/ClassType';
import { AreaKey } from 'assets/frontend/enums/AreaKey';


export enum MageSkill {
  Scorch=42,
  FireBlast,
  PurificationWave,
  Serenity,
  LightningBlast
}

export class MageSetup extends ClassSetup {
  constructor(
    public level: number,
    public skill1: MageSkill,
    public skill2: MageSkill,
    public skill3: MageSkill,
    public skill4: MageSkill,
  ) {
    super(ClassType.Hunter, level, skill1, skill2, skill3, skill4);
  }

  static getHighestDps(area: AreaKey = AreaKey.HoruFjord): MageSkill[] {
    if(area < AreaKey.HoruFjord){
      return [];
    } else {
      return [];
    }
  }

  static createFromArray(skills: MageSkill[]): MageSetup {
    return new MageSetup(0, skills[0], skills[1], skills[2], skills[3]);
  }
}
