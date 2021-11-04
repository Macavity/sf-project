import { ClassType } from 'assets/frontend/enums/ClassType';
import { AssassinSkill } from 'assets/frontend/models/Assassin';
import { GladiatorSkill } from 'assets/frontend/models/Gladiator';
import { DruidSkill } from 'assets/frontend/models/Druid';
import { HunterSkill } from 'assets/frontend/models/Hunter';
import { MageSkill } from 'assets/frontend/models/Mage';
import { ShamanSkill } from 'assets/frontend/models/Shaman';

export type SkillType = AssassinSkill | GladiatorSkill | DruidSkill | HunterSkill | MageSkill | ShamanSkill;

export interface IJobDTO {
  id: number;
  name: string;
}

export interface ISkillDTO {
  id: number;
  name: string;
  shortName: string;
  job: IJobDTO;
}

export class Skill {
  constructor(
    public key: SkillType,
    public classType: ClassType,
    public shortName: string,
    public icon: string | null = null,
  ) {
  }
}
