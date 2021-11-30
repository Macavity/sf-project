import { IJobSkills } from '../../interfaces/IJobSkills';

export class StagePartySetupDTO {
    constructor(
        public id: number,
        public stageLevel: number,
        public zone: string,
        public gladiator: IJobSkills,
        public warrior: IJobSkills,
        public druid: IJobSkills,
        public shaman: IJobSkills,
        public assassin: IJobSkills,
        public hunter: IJobSkills,
        public mage: IJobSkills,
        public warlock: IJobSkills,
    ) {
    }
}

