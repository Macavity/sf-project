import { Store, StoreConfig } from '@datorama/akita';
import { Skill } from '../models/Skill';
import { Boss } from '../models/Boss';

export interface AppState {
  gladiatorSkills: Skill[];
  warriorSkills: Skill[];

  shamanSkills: Skill[];
  druidSkills: Skill[];

  warlockSkills: Skill[];
  assassinSkills: Skill[];
  hunterSkills: Skill[];
  mageSkills: Skill[];

  bosses: Boss[];

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

    bosses: [],

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
