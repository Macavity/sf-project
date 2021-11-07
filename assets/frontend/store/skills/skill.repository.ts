import { ISkillDTO, Skill } from 'assets/frontend/models/Skill';
import { ClassType } from 'assets/frontend/enums/ClassType';
import { ApiService } from '../../services/api.service';
import { SkillFactory } from './skill.factory';

export class SkillRepository {
    static find(id: number): Promise<Skill> {
        return ApiService.get<ISkillDTO>(`/skills/${id}.json`)
            .then(skillData => {
                return SkillFactory.createFromDTO(skillData);
            });
    }

    static findAll() {
        return ApiService.get<ISkillDTO[]>('/skills.json')
            .then((skillData) => {
                const skills: Skill[] = [];

                for (const data of skillData) {
                    skills.push(SkillFactory.createFromDTO(data));
                }

                return skills;
            });
    }

    static findAllByClass(classType: ClassType): Promise<Skill[]> {
        return ApiService.get<ISkillDTO[]>('/jobs/' + classType + '/skills')
            .then((dtoArray) => {
                return SkillFactory.createArrayFromDTOs(dtoArray)
            });
    }

    static findMany(skillIds: number[]): Promise<Skill[]> {
        const queryElements = [];
        let i = 0;
        for(const queryId of skillIds){
            queryElements.push(`id[${i}]=${queryId}`);
            i++;
        }

        return ApiService.get<ISkillDTO[]>('/skills.json?'+queryElements.join('&'))
            .then(dtoArray => {
                return SkillFactory.createArrayFromDTOs(dtoArray);
            });
    }
}
