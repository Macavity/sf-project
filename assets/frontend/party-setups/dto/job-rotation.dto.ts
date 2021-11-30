import { ElementType } from '../../enums/ElementType';
import { ZoneDTO } from '../../zones/dto/zone.dto';
import { SkillDto } from './skill.dto';

export class JobRotationDto {
    constructor(
        public skill1: string|undefined,
        public skill2: string|undefined,
        public skill3: string|undefined,
        public skill4: string|undefined,
        public slug: string = ''
    ) {
    }
}

