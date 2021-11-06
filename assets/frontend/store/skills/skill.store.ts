import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Skill } from '../../models/Skill';

export interface SkillState extends EntityState<Skill, number> {
}

@StoreConfig({ name: 'skill' })
export class SkillStore extends EntityStore<SkillState> {
}

export const skillStore = new SkillStore();
