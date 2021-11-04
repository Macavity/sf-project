import { ClassSetup } from 'assets/frontend/models/ClassSetup';
import { ClassType } from 'assets/frontend/enums/ClassType';
import { AreaKey } from 'assets/frontend/enums/AreaKey';


export enum AssassinSkill {
  PoisonCoat = 66,
  Lacerations,
  Shiv,
  Pursuing,
  FatalKnife,
  FanOfKnives,
  ReverberatingSlam,
  CloakOfBush,
  Rupture,
  Ambush,
  RoundhouseKick,
  ScatterBlade,
  DoubleThrowKnives,
  SwiftwindDaggers,
  BounceBounce,
  Pounce,
  Backstab,
  RecklessLunge,
  FishBoneThrowingKnife
}


export const poisonLacShivPursue = [AssassinSkill.PoisonCoat, AssassinSkill.Lacerations, AssassinSkill.Shiv, AssassinSkill.Pursuing];
export const poisonLacShivAmbush = [AssassinSkill.PoisonCoat, AssassinSkill.Lacerations, AssassinSkill.Shiv, AssassinSkill.Ambush];
export const ambushPoisonLacShiv = [AssassinSkill.Ambush, AssassinSkill.PoisonCoat, AssassinSkill.Lacerations, AssassinSkill.Shiv];
export const fanPoisonFatalShiv = [AssassinSkill.FanOfKnives, AssassinSkill.PoisonCoat, AssassinSkill.FatalKnife, AssassinSkill.Shiv];
export const fanFatalDoubleSwiftwind = [AssassinSkill.FanOfKnives, AssassinSkill.FatalKnife, AssassinSkill.DoubleThrowKnives, AssassinSkill.SwiftwindDaggers];


export class AssassinSetup extends ClassSetup {
  constructor(
    public level: number,
    public skill1: AssassinSkill,
    public skill2: AssassinSkill,
    public skill3: AssassinSkill,
    public skill4: AssassinSkill,
  ) {
    super(ClassType.Assassin, level, skill1, skill2, skill3, skill4);
  }

  static getHighestDps(area: AreaKey = AreaKey.HoruFjord): AssassinSkill[] {
    if (area < AreaKey.HoruFjord) {
      return poisonLacShivPursue;
    } else {
      return poisonLacShivPursue;
    }
  }

  public static createFromArray(skills: AssassinSkill[]): AssassinSetup {
    return new AssassinSetup(0, skills[0], skills[1], skills[2], skills[3]);
  }
}
