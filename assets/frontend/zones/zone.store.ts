import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Zone } from '../models/Zone';

export interface ZoneState extends EntityState<Zone, number> {
}

@StoreConfig({ name: 'zone', idKey: 'key' })
export class ZoneStore extends EntityStore<ZoneState> {
}

export const zoneStore = new ZoneStore();
