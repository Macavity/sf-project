import { ElementType } from '../enums/ElementType';

export function getCounterElement(element: ElementType | null) {
    if (element === null) {
        return null;
    }
    switch (element) {
        case ElementType.Fire:
            return ElementType.Frost;
        case ElementType.Earth:
            return ElementType.Lightning;
        case ElementType.Frost:
            return ElementType.Earth;
        case ElementType.Lightning:
            return ElementType.Fire;
        case ElementType.None:
            return ElementType.None;
    }

    throw new Error('Unknown ElementType: ' + element);
}
