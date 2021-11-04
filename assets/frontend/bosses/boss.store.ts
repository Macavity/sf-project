import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Boss } from '../models/Boss';

export interface BossState extends EntityState<Boss, number> {
}

@StoreConfig({ name: 'zone', idKey: 'key' })
export class BossStore extends EntityStore<BossState> {
}

export const bossStore = new BossStore();
