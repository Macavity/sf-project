import { ElementType } from 'assets/frontend/enums/ElementType';

export interface IBoss {
    id: number;
    name: string;
    primaryElement: ElementType;
    secondaryElement: ElementType;
    stages: string[];
    partySetups: string[];
    zone;
}
