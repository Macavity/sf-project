import { SkillRepository } from '../repositories/SkillRepository';
import { appStore, AppStore } from './app.store';
import { Skill } from '../models/Skill';
import { ClassType } from '../enums/ClassType';

class AppStoreService {
  constructor(private appStore: AppStore) {
  }


}

export const appStoreService = new AppStoreService(appStore);
