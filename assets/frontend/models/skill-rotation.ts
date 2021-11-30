import { ClassType } from '../enums/ClassType';
import { GladiatorSkill } from './Gladiator';
import { DruidSkill } from './Druid';
import { ShamanSkill } from './Shaman';
import { AssassinSkill } from './Assassin';
import { HunterSkill } from './Hunter';
import { SkillReference } from './skill-reference';

export class SkillRotation {
    private skills = [] as SkillReference[];
    private skillNames = [] as string[];

    constructor(
        public classType: ClassType,
        public skill1: SkillReference,
        public skill2: SkillReference,
        public skill3: SkillReference,
        public skill4: SkillReference,
    ) {
        this.skills = [skill1, skill2, skill3, skill4];
    }

    /** @deprecated */
    static getSkillEnum(classType: ClassType): any {
        switch (classType) {
            case ClassType.Gladiator:
                return GladiatorSkill;
            case ClassType.Druid:
                return DruidSkill;
            case ClassType.Shaman:
                return ShamanSkill;
            case ClassType.Assassin:
                return AssassinSkill;
            case ClassType.Hunter:
                return HunterSkill;
        }

        throw new Error('SkillRotation.getSkillEnum: Unknown class: ' + ClassType[classType]);
    }
}
