import { IBoss } from '../../interfaces/IBoss';

export class StageDTO {
    constructor(
        public id: number,
        public level: number,
        public boss: IBoss,
    ) {

    }
}
