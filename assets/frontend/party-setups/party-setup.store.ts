import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { PartySetup } from '../models/PartySetup';

export interface PartySetupState extends EntityState<PartySetup, number> {
}

@StoreConfig({ name: 'party_setup' })
export class PartySetupStore extends EntityStore<PartySetupState> {
}

export const partySetupStore = new PartySetupStore();
