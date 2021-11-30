import { ClassType } from '../enums/ClassType';
import { SkillRotation } from '../models/skill-rotation';
import { SkillReference } from '../models/skill-reference';
import { SkillFactory } from '../store/skills/skill.factory';
import { JobRotationDto } from './dto/job-rotation.dto';
import { IJobRotation } from '../job-rotations/job-rotation.interface';

export class JobRotationFactory {

    static create(classType: ClassType, dto: JobRotationDto | null | undefined): SkillRotation | null {
        if (!dto) {
            return null;
        }

        if (dto.skill1 || dto.skill2 || dto.skill3 || dto.skill4) {
            return new SkillRotation(
                classType,
                new SkillReference(SkillFactory.extractId(dto.skill1)),
                new SkillReference(SkillFactory.extractId(dto.skill2)),
                new SkillReference(SkillFactory.extractId(dto.skill3)),
                new SkillReference(SkillFactory.extractId(dto.skill4)),
            );
        }

        return null;
    }

    static extractSkillIds(jobRotation: IJobRotation): number[] {
        const ids = [];

        for(const iri of [jobRotation.skill1, jobRotation.skill2, jobRotation.skill3, jobRotation.skill4]){
            if(iri){
                ids.push(SkillFactory.extractId(iri));
            }
        }

        return ids;
    }

    static extractId(resourceId: string | null): number | null {
        if (resourceId === null) {
            return null;
        }

        return Number(resourceId.replace('/api/job_rotations/', ''));
    }
}
