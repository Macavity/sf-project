import { BossQuery, bossQuery } from './boss.query';
import { Boss } from '../models/Boss';
import { BossStore, bossStore } from './boss.store';
import { BossRepository } from './boss.repository';


class BossService {

    private _allBossesLoaded = false;

    constructor(private bossStore: BossStore, private bossQuery: BossQuery) {
    }

    initBosses() {
        if (this._allBossesLoaded) {
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
        this.bossStore.setLoading(true);
        BossRepository.findByKey(bossId)
            .then((boss: Boss) => {
                this.bossStore.add(boss);
                this.bossStore.setLoading(false);
            });
    }

    get allBossesLoaded(): boolean {
        return this._allBossesLoaded;
    }
}

export const bossService = new BossService(bossStore, bossQuery);
