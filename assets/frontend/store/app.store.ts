import { Store, StoreConfig } from '@datorama/akita';
import { Skill } from '../models/Skill';

export interface AppState {
    gladiatorSkills: Skill[];
    warriorSkills: Skill[];

    shamanSkills: Skill[];
    druidSkills: Skill[];

    warlockSkills: Skill[];
    assassinSkills: Skill[];
    hunterSkills: Skill[];
    mageSkills: Skill[];

    isAdmin: boolean;
}

export function createInitialState(): AppState {
    return {
        gladiatorSkills: [],
        warriorSkills: [],
        shamanSkills: [],
        druidSkills: [],
        warlockSkills: [],
        assassinSkills: [],
        mageSkills: [],
        hunterSkills: [],

        isAdmin: true,
    };
}

@StoreConfig({ name: 'app' })
export class AppStore extends Store<AppState> {
    constructor() {
        super(createInitialState());
    }
}

export const appStore = new AppStore();
