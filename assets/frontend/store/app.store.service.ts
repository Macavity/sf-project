import { appStore, AppStore } from './app.store';

class AppStoreService {
    constructor(private appStore: AppStore) {
    }

    initJobs() {
        
    }
}

export const appStoreService = new AppStoreService(appStore);
