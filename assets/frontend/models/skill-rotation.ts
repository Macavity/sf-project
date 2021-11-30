import { ClassType } from '../enums/ClassType';
import { SkillReference } from './skill-reference';

export class SkillRotation {
    private skills = [] as SkillReference[];

    constructor(
        public classType: ClassType,
        public skill1: SkillReference,
        public skill2: SkillReference,
        public skill3: SkillReference,
        public skill4: SkillReference,
    ) {
        this.skills = [skill1, skill2, skill3, skill4];
    }
}
