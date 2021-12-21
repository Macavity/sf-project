import { BossQuery, bossQuery } from './boss.query';
import { BossStore, bossStore } from './boss.store';
import { BossRepository } from './boss.repository';
import { loggerService } from '../services/logger.service';
import { BossType } from '../enums/BossType';

class BossService {

    private _allBossesLoaded = false;

    constructor(private bossStore: BossStore, private bossQuery: BossQuery) {
    }

    initBosses() {
        if (this._allBossesLoaded) {
            loggerService.debug('Bosses already loaded');
            return;
        }

        this.bossStore.setLoading(true);

        BossRepository.findAll()
            .then((bosses: IBoss[]) => {
                loggerService.debug('✅ Initialized all Bosses.');
                this.bossStore.set(bosses);
                this._allBossesLoaded = true;
                this.bossStore.setLoading(false);
            });
    }

    routeToBoss(boss: IBoss): object {
        return {
            name: 'BossDetail',
            params: {
                bossName: BossType[boss.id],
            },
        };
    }

    loadBoss(bossId: number) {
        loggerService.debug('Load Boss', bossId);
        this.bossStore.setLoading(true);
        BossRepository.findByKey(bossId)
            .then((boss: IBoss) => {
                loggerService.debug('Load Boss => ', boss);
                this.bossStore.add(boss);
                this.bossStore.setLoading(false);
            });
    }

    get allBossesLoaded(): boolean {
        return this._allBossesLoaded;
    }
}

export const bossService = new BossService(bossStore, bossQuery);
