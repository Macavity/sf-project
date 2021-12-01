import { PartySetup, PartySetupList } from 'assets/frontend/models/PartySetup';
import { ElementType } from 'assets/frontend/enums/ElementType';
import { BossType } from 'assets/frontend/enums/BossType';

export class Boss {
    constructor(
        public id: BossType,
        public name: string,
        public primaryElement: ElementType = ElementType.None,
        public secondaryElement: ElementType = ElementType.None,
        public rotationList: PartySetupList = new PartySetupList(),
    ) {
    }

    /** @deprecated */
    get key() {
        return this.id;
    }

    public addRotation(rotation: PartySetup) {
        this.rotationList.addRotation(rotation);
    }

    public routeToBoss(): object {
        return {
            name: 'BossDetail',
            params: {
                bossName: BossType[this.id],
            },
        };
    }

    public get primaryCounter(): ElementType | null {
        if (this.primaryElement) {
            return Boss.getCounterToElement(this.primaryElement);
        }

        return null;
    }

    public get secondaryCounter(): ElementType | null {
        if (this.secondaryElement) {
            return Boss.getCounterToElement(this.secondaryElement);
        }

        return null;
    }

    public counterElements(): ElementType[] {
        const counters = [];

        if (this.primaryElement) {
            counters.push(Boss.getCounterToElement(this.primaryElement));
        }
        if (this.secondaryElement) {
            counters.push(Boss.getCounterToElement(this.secondaryElement));
        }

        return counters;
    }

    private static getCounterToElement(element: ElementType): ElementType {
        switch (element) {
            case ElementType.Fire:
                return ElementType.Frost;
            case ElementType.Earth:
                return ElementType.Lightning;
            case ElementType.Frost:
                return ElementType.Earth;
            case ElementType.Lightning:
                return ElementType.Fire;
        }

        throw new Error('Unknown ElementType.');
    }
}
