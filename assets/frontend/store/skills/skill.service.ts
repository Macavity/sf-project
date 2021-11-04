import { SkillRepository } from '../../repositories/SkillRepository';
import { skillQuery, SkillQuery } from './skill.query';
import { skillStore, SkillStore } from './skill.store';
import { Skill } from '../../models/Skill';
import { Observable } from 'rxjs';
import { notEmpty } from '../../helpers/filter';


export class SkillService {
  constructor(private skillStore: SkillStore, private skillQuery: SkillQuery) {
  }

  initSkills() {
    this.skillStore.setLoading(true);

    SkillRepository.findAll().then(skillsByJob => {
      // for(const skillEntity of skillsByJob){
      //   this.skillStore.add(skillEntity);
      // }
      this.skillStore.set(skillsByJob);
      console.log('Set Skills', skillsByJob);

      this.skillStore.setLoading(false);
    });
  }

  findSkillById(skillId: number): Observable<Skill | undefined> {
    return this.skillQuery.selectEntity(skillId);
  }

  findSkillsByIds(skillIds: (number|null)[]): Observable<Skill[] | undefined> {
    return this.skillQuery.selectMany(skillIds.filter(notEmpty));
  }
}

export const skillService = new SkillService(skillStore, skillQuery);
