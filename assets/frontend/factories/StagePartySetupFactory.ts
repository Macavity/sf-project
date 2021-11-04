import { StagePartySetupDTO } from '../zones/dto/stage-party-setup.dto';
import { StagePartySetup } from '../models/StagePartySetup';
import { ClassType } from '../enums/ClassType';
import { SkillRotationFactory } from './skill-rotation.factory';
import { ZoneFactory } from '../zones/zone.factory';


export class StagePartySetupFactory {
  static create(dto: StagePartySetupDTO): StagePartySetup {

    const gladiator = dto.gladiator ? SkillRotationFactory.createFromJobSkillsDTO(ClassType.Gladiator, dto.gladiator) : null;
    const warrior = dto.warrior ? SkillRotationFactory.createFromJobSkillsDTO(ClassType.Warrior, dto.warrior) : null;
    const druid = dto.druid ? SkillRotationFactory.createFromJobSkillsDTO(ClassType.Druid, dto.druid) : null;
    const shaman = dto.shaman ? SkillRotationFactory.createFromJobSkillsDTO(ClassType.Shaman, dto.shaman) : null;
    const assassin = dto.assassin ? SkillRotationFactory.createFromJobSkillsDTO(ClassType.Assassin, dto.assassin) : null;
    const hunter = dto.hunter ? SkillRotationFactory.createFromJobSkillsDTO(ClassType.Hunter, dto.hunter) : null;
    const mage = dto.mage ? SkillRotationFactory.createFromJobSkillsDTO(ClassType.Mage, dto.mage) : null;
    const warlock = dto.warlock ? SkillRotationFactory.createFromJobSkillsDTO(ClassType.Warlock, dto.warlock) : null;

    return new StagePartySetup(
      dto.id,
      ZoneFactory.createFromDTO(dto.zone),
      dto.level,
      gladiator,
      warrior,
      druid,
      shaman,
      assassin,
      hunter,
      mage,
      warlock,
    );
  }

  static createArray(dtos: StagePartySetupDTO[]): StagePartySetup[] {
    const array = [] as StagePartySetup[];

    for (const dto of dtos) {
      array.push(StagePartySetupFactory.create(dto));
    }

    return array;
  }
}
