import { QueryEntity } from '@datorama/akita';
import { BossState, BossStore, bossStore } from './boss.store';

export class BossQuery extends QueryEntity<BossState> {
  constructor(protected store: BossStore) {
    super(store);
  }
}

export const bossQuery = new BossQuery(bossStore);
