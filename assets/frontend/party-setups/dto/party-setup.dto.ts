export class PartySetupDto {
    constructor(
        public id: number,
        public stageLevel: number,
        public zone: string | undefined, /* IRI */
        public boss: string, /* IRI */
        public gladiatorRotation: string | undefined,
        public warriorRotation: string | undefined,
        public shamanRotation: string | undefined,
        public druidRotation: string | undefined,
        public assassinRotation: string | null,
        public hunterRotation: string | null,
        public mageRotation: string | null,
        public warlockRotation: string | null,
    ) {
    }
}

