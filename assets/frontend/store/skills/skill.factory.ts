import { ISkillDTO, Skill } from '../../models/Skill';
import { extractJobIdFromResourceId } from '../../enums/ClassType';

export class SkillFactory {

    static createFromDTO(dto: ISkillDTO) {
        return new Skill(
            dto.id,
            extractJobIdFromResourceId(dto.job),
            dto.shortName
        );
    }

    static createArrayFromDTOs(dtos: ISkillDTO[]) {
        const skills = [];

        for (const dto of dtos) {
            skills.push(SkillFactory.createFromDTO(dto));
        }

        return skills;
    }

    static extractId(resourceId: string | undefined | null): number {
        if (!resourceId) {
            return 0;
        }
        return Number(resourceId.replace('/api/skills/', ''));
    }
}
