import { ClassSetup } from 'assets/frontend/models/ClassSetup';
import { ClassType } from 'assets/frontend/enums/ClassType';
import { AreaKey } from 'assets/frontend/enums/AreaKey';


export enum HunterSkill {
  ArrowBarrage = 47,
  HawkCallSheen,
  HawkCallGal,
  SteadyShot,
  NumbingShot,
  ExplosiveShot,
  BoarsRush,
  StormShot,
  BurningShot,
  WeakPointShot,
  HawkCallPan,
  AimedShot,
  ScatterShot,
  MultiShot,
  Volley,
  PiercingShot,
  QuickShot,
  LunarShot,
  SunderArmorShot
}

export const hunterSheenGalWeakStorm = [HunterSkill.HawkCallSheen, HunterSkill.HawkCallGal, HunterSkill.WeakPointShot, HunterSkill.StormShot];
export const hunterSheenBoarWeakStorm = [HunterSkill.HawkCallSheen, HunterSkill.BoarsRush, HunterSkill.WeakPointShot, HunterSkill.StormShot];
export const sheenGalWeakBoar = [HunterSkill.HawkCallSheen, HunterSkill.HawkCallGal, HunterSkill.WeakPointShot, HunterSkill.BoarsRush];
export const hunterSheenGalWeakPan = [HunterSkill.HawkCallSheen, HunterSkill.HawkCallGal, HunterSkill.WeakPointShot, HunterSkill.HawkCallPan];
export const hunterSheenGalWeakSteady = [HunterSkill.HawkCallSheen, HunterSkill.HawkCallGal, HunterSkill.WeakPointShot, HunterSkill.SteadyShot];
export const pierceBoarQuickAimed = [HunterSkill.PiercingShot, HunterSkill.BoarsRush, HunterSkill.QuickShot, HunterSkill.AimedShot];

export class HunterSetup extends ClassSetup {
  constructor(
    public level: number,
    public skill1: HunterSkill,
    public skill2: HunterSkill,
    public skill3: HunterSkill,
    public skill4: HunterSkill,
  ) {
    super(ClassType.Hunter, level, skill1, skill2, skill3, skill4);
  }

  static getSingleTarget(area: AreaKey): HunterSkill[] {
    if(area >= AreaKey.BababoCoast){
      return [HunterSkill.HawkCallSheen, HunterSkill.HawkCallGal, HunterSkill.WeakPointShot, HunterSkill.StormShot];
    }

    return [];
  }

  static getHighestDps(area: AreaKey = AreaKey.HoruFjord): HunterSkill[] {
    if (area < AreaKey.HoruFjord) {
      return hunterSheenBoarWeakStorm;
    } else {
      return pierceBoarQuickAimed;
    }
  }

  static getAoE(area: AreaKey): HunterSkill[] {
    if(area === AreaKey.BababoCoast){
      return [
        HunterSkill.ArrowBarrage,
        HunterSkill.BurningShot,
        HunterSkill.ExplosiveShot,
        HunterSkill.MultiShot,
      ]
    }

    return [];
  }

  static createFromArray(skills: HunterSkill[]): HunterSetup {
    return new HunterSetup(0, skills[0], skills[1], skills[2], skills[3]);
  }
}
