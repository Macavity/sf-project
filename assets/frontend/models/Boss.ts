import { PartySetupList, PartySetup } from 'assets/frontend/models/PartySetup';
import { GladiatorSkill } from 'assets/frontend/models/Gladiator';
import { DruidSkill } from 'assets/frontend/models/Druid';
import { HunterSkill } from 'assets/frontend/models/Hunter';
import { AssassinSkill } from 'assets/frontend/models/Assassin';
import { AreaKey } from 'assets/frontend/enums/AreaKey';
import { ElementType } from 'assets/frontend/enums/ElementType';
import { BossType } from 'assets/frontend/enums/BossType';
import { TagType } from 'assets/frontend/models/Tag';
import { MageSkill } from 'assets/frontend/models/Mage';
import { ShamanSkill } from 'assets/frontend/models/Shaman';
import { SkillRotationFactory } from '../factories/skill-rotation.factory';
import { ClassType } from '../enums/ClassType';


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

  public addRotationByValues(
    areaKey: AreaKey,
    stage: number,
    partyLevel: number,
    tank: GladiatorSkill[],
    heal: DruidSkill[] | ShamanSkill[],
    hunter: HunterSkill[] | null = null,
    assassin: AssassinSkill[] | null = null,
    mage: MageSkill[] | null = null,
    tags: TagType[] = [],
  ) {
    const dps = [];
    if (hunter) {
      dps.push(SkillRotationFactory.createFromSkillTypes(ClassType.Hunter, hunter[0], hunter[1], hunter[2], hunter[3]));
    }

    if (assassin) {
      dps.push(SkillRotationFactory.createFromSkillTypes(ClassType.Assassin, assassin[0], assassin[1], assassin[2], assassin[3]));
    }

    if (mage) {
      dps.push(SkillRotationFactory.createFromSkillTypes(ClassType.Mage, mage[0], mage[1], mage[2], mage[3]));
    }

  }

  public routeToBoss(): any {
    return {
      name: 'BossDetail',
      params: {
        bossName: BossType[this.key],
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
