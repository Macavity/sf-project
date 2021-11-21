import { ClassType } from '../enums/ClassType';
import { SkillReference } from '../models/skill-reference';

export function extractJobRotationIdFromIRI(iri: string): number{
    return Number(iri.replace('/api/job_rotations/', ''));
}

export interface IJobRotation {
    id: number;
    slug: string;
    job: string;
    skill1: string,
    skill2: string,
    skill3: string,
    skill4: string,
}

/**
 * @deprecated
 */
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
}
