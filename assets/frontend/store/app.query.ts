import { AppState, appStore, AppStore } from './app.store';
import { Query } from '@datorama/akita';

export class AppQuery extends Query<AppState> {

  constructor(protected store: AppStore) {
    super(store);
  }

  isAdmin(){
    return this.store.getValue().isAdmin;
  }
}

export const appQuery = new AppQuery(appStore);
