import { BossQuery, bossQuery } from './boss.query';
import { Boss } from '../models/Boss';
import { BossStore, bossStore } from './boss.store';
import { BossRepository } from './boss.repository';
import { loggerService } from '../services/logger.service';


class BossService {

    private _allBossesLoaded = false;

    constructor(private bossStore: BossStore, private bossQuery: BossQuery) {
    }

    initBosses() {
        if (this._allBossesLoaded) {
            console.debug('Bosses already loaded');
            return;
        }

        this.bossStore.setLoading(true);

        BossRepository.findAll()
            .then((bosses: Boss[]) => {
                this.bossStore.set(bosses);
                this._allBossesLoaded = true;
                this.bossStore.setLoading(false);
            });
    }

    loadBoss(bossId: number) {
        loggerService.debug('Load Boss', bossId);
        this.bossStore.setLoading(true);
        BossRepository.findByKey(bossId)
            .then((boss: Boss) => {
                loggerService.debug('Load Boss => ', boss);
                loggerService.debug(boss);
                this.bossStore.add(boss);
                this.bossStore.setLoading(false);
            });
    }

    get allBossesLoaded(): boolean {
        return this._allBossesLoaded;
    }
}

export const bossService = new BossService(bossStore, bossQuery);
