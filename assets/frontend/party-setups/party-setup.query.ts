import { QueryEntity } from '@datorama/akita';
import { PartySetupState, partySetupStore, PartySetupStore } from './party-setup.store';

export class PartySetupQuery extends QueryEntity<PartySetupState> {
    constructor(protected store: PartySetupStore) {
        super(store);
    }
}

export const partySetupQuery = new PartySetupQuery(partySetupStore);
