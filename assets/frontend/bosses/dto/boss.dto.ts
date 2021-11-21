import { ElementType } from '../../enums/ElementType';

export class BossDTO {
    constructor(
        public id: number,
        public name: string,
        public primaryElement: ElementType = ElementType.None,
        public secondaryElement: ElementType = ElementType.None,
        public partySetups: string[] = [],
        public stages: string[] = [],
        public zone: string | null = null,
    ) {
    }
}

