import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Continent } from '../models/Continent';

export interface ContinentState extends EntityState<Continent, number> {
}

@StoreConfig({ name: 'continent' })
export class ContinentStore extends EntityStore<ContinentState> {

}

export const continentStore = new ContinentStore();
