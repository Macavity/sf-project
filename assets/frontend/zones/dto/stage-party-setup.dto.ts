import { ZoneDTO } from './zone.dto';

export interface IJobSkills {
  skill1?: number;
  skill2?: number;
  skill3?: number;
  skill4?: number;
}

export class StagePartySetupDTO {
  constructor(
    public id: number,
    public level: number,
    public zone: ZoneDTO,
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

