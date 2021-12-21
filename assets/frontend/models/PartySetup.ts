export class PartySetup {

    constructor(
        public id: number,
        public zoneId: number | null,
        public stage: number,
        public bossId: number,
        public gladiator: string | null = null,
        public warrior: string | null = null,
        public druid: string | null = null,
        public shaman: string | null = null,
        public assassin: string | null = null,
        public hunter: string | null = null,
        public mage: string | null = null,
        public warlock: string | null = null,
    ) {
    }

    public getOrderedSkillRotations(): string[] {
        const allRotations = [this.gladiator, this.warrior, this.assassin, this.hunter, this.warlock, this.mage, this.druid, this.shaman];
        const rotations: string[] = [];

        for (const rota of allRotations) {
            if (rota) {
                rotations.push(rota);
            }
        }

        return rotations;
    }
}

export class PartySetupList {
    constructor(
        public entries: PartySetup[] = [],
    ) {
    }

    public addRotation(entry: PartySetup): PartySetupList {
        this.entries.push(entry);
        return this;
    }
}
