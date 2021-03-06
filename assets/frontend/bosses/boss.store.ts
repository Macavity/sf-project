import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface BossState extends EntityState<IBoss, number> {
}

@StoreConfig({ name: 'boss', idKey: 'id' })
export class BossStore extends EntityStore<BossState> {
}

export const bossStore = new BossStore();
