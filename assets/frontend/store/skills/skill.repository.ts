import { Skill } from "assets/frontend/models/Skill";
import { ApiService } from "../../services/api.service";
import { SkillFactory } from "./skill.factory";
import { frontendState } from "../../services/fe-state.service";

export const NoSkill = new Skill(0, 0, "None");

export class SkillRepository {
    static find(id: number): Promise<Skill> {
        if (id === 0) {
            return Promise.resolve(NoSkill);
        }

        return ApiService.get<ISkill>(`/skills/${id}.json`).then(
            (skillData) => {
                return SkillFactory.createFromDTO(skillData);
            },
        );
    }

    static findAll() {
        const skillData = frontendState.skills;
        const skills = [];

        for (const data of skillData) {
            skills.push(SkillFactory.createFromDTO(data));
        }

        return Promise.resolve(skills);

        // return ApiService.get<ISkillDTO[]>('/skills.json')
        //     .then((skillData) => {
        //         const skills: Skill[] = [];
        //
        //         for (const data of skillData) {
        //             skills.push(SkillFactory.createFromDTO(data));
        //         }
        //
        //         return skills;
        //     });
    }

    static findMany(skillIds: number[]): Promise<Skill[]> {
        const queryElements = [];
        let i = 0;
        for (const queryId of skillIds) {
            queryElements.push(`id[${i}]=${queryId}`);
            i++;
        }

        return ApiService.get<ISkill[]>(
            "/skills.json?" + queryElements.join("&"),
        ).then((dtoArray) => {
            return SkillFactory.createArrayFromDTOs(dtoArray);
        });
    }
}
