import { AreaKey, AreaNames } from 'assets/frontend/enums/AreaKey';
import { Stage } from 'assets/frontend/models/Stage';
import { ClassType } from '../enums/ClassType';
import { SkillRotation } from './skill-rotation';
import { Zone } from './Zone';

export class StagePartySetup {

  constructor(
    public id: number,
    public zoneId: number,
    public stage: number,
    public gladiator: SkillRotation | null = null,
    public warrior: SkillRotation | null = null,
    public druid: SkillRotation | null = null,
    public shaman: SkillRotation | null = null,
    public assassin: SkillRotation | null = null,
    public hunter: SkillRotation | null = null,
    public mage: SkillRotation | null = null,
    public warlock: SkillRotation | null = null,
  ) {
  }

  public getOrderedSkillRotations(): SkillRotation[] {
    const allRotations = [this.gladiator, this.warrior, this.assassin, this.hunter, this.warlock, this.mage, this.druid, this.shaman];
    const rotations: SkillRotation[] = [];

    for (const rota of allRotations) {
      if (rota) {
        rotations.push(rota);
      }
    }

    // if (rotations.length > 4) {
    //   throw new Error('Amount of classes in PartySetup exceeds 4: ' + this.areaName + ' ' + this.stage);
    // }

    return rotations;
  }
}

export class PartySetupList {
  constructor(
    public entries: StagePartySetup[] = [],
  ) {
  }

  public addRotation(entry: StagePartySetup): PartySetupList {
    this.entries.push(entry);
    return this;
  }
}
