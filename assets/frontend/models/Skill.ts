import { ClassType } from 'assets/frontend/enums/ClassType';
import { AssassinSkill } from 'assets/frontend/models/Assassin';
import { GladiatorSkill } from 'assets/frontend/models/Gladiator';
import { DruidSkill } from 'assets/frontend/models/Druid';
import { HunterSkill } from 'assets/frontend/models/Hunter';
import { MageSkill } from 'assets/frontend/models/Mage';
import { ShamanSkill } from 'assets/frontend/models/Shaman';

export type SkillType = AssassinSkill | GladiatorSkill | DruidSkill | HunterSkill | MageSkill | ShamanSkill;

/**
 * @deprecated Use ISkill instead
 */
export interface ISkillDTO {
    id: number;
    name: string;
    shortName: string;
    job: string;
}

export class Skill {
    constructor(
        public id: number,
        public classType: ClassType,
        public shortName: string,
        public icon: string | null = null,
    ) {
    }
}
