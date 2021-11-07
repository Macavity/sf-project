import { QueryEntity } from '@datorama/akita';
import { SkillState, skillStore, SkillStore } from './skill.store';

export class SkillQuery extends QueryEntity<SkillState> {
  constructor(protected store: SkillStore) {
    super(store);
  }
}

export const skillQuery = new SkillQuery(skillStore);
