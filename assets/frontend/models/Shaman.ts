import { ClassSetup } from 'assets/frontend/models/ClassSetup';
import { ClassType } from 'assets/frontend/enums/ClassType';


export enum ShamanSkill {
  ElectricShock = 33,
  Riptide,
  ThunderHeart,
  DrumsOfRain,
  ChainHeal,
  BlessingOfSpirits,
  AncestralProtection,
  FontOfPurge,
  RecoveryTotem,
}

export class ShamanSetup extends ClassSetup {
  constructor(
    public level: number,
    public skill1: ShamanSkill,
    public skill2: ShamanSkill,
    public skill3: ShamanSkill,
    public skill4: ShamanSkill,
  ) {
    super(ClassType.Shaman, level, skill1, skill2, skill3, skill4);
  }

  public static createFromArray(skills: ShamanSkill[]): ShamanSetup {
    return new ShamanSetup(0, skills[0], skills[1], skills[2], skills[3]);
  }
}
