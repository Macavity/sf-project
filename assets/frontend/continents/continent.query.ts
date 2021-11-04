import { QueryEntity } from '@datorama/akita';
import { ContinentState, continentStore, ContinentStore } from './continent.store';

export class ContinentQuery extends QueryEntity<ContinentState> {
  constructor(protected store: ContinentStore) {
    super(store);
  }
}

export const continentQuery = new ContinentQuery(continentStore);
