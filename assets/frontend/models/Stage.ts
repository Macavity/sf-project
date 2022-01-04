import { AreaKey, AreaNames } from 'assets/frontend/enums/AreaKey';

export class Stage {
    public name: string;

    constructor(
        public id: number,
        public areaKey: number,
        public level: number,
        public bossKey: number,
        public boss: IBoss,
    ) {
        this.name = AreaNames[areaKey];
    }

    public getScore(): number {
        return Stage.calcScore(this.areaKey, this.level);
    }

    static calcScore(areaKey: AreaKey, stage: number) {
        const areaKeyScore = areaKey as number * 1000;

        return areaKeyScore + stage;
    }
}
