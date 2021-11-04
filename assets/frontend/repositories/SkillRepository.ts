import { ISkillDTO, Skill } from 'assets/frontend/models/Skill';
import { ClassType } from 'assets/frontend/enums/ClassType';
import { ApiService } from '../services/api.service';

export class SkillRepository {
  static findAll() {
    return ApiService.get<ISkillDTO[]>('/skills')
      .then((skillData) => {
        const skills: Skill[] = [];

        for (const data of skillData) {
          skills.push(new Skill(data.id, data.job.id, data.shortName));
        }
        // for (const data of skillData) {
        //   skills[data.job.id] = skills[data.job.id] || [];
        //   skills[data.job.id].push(
        //     new Skill(data.id, data.job.id, data.shortName),
        //   );
        // }

        return skills;
      });
  }

  static findAllByClass(classType: ClassType): Promise<Skill[]> {
    return ApiService.get<ISkillDTO[]>('/jobs/' + classType + '/skills')
      .then((skillData) => {
        const skills = [];

        for (const data of skillData) {
          skills.push(
            new Skill(data.id, data.job.id, data.shortName),
          );
        }

        return skills;
      });
  }
}
