import { QueryEntity } from '@datorama/akita';
import { ZoneState, zoneStore, ZoneStore } from './zone.store';

export class ZoneQuery extends QueryEntity<ZoneState> {
  constructor(protected store: ZoneStore) {
    super(store);
  }
}

export const zoneQuery = new ZoneQuery(zoneStore);
