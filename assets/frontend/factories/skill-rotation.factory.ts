import { ClassType } from '../enums/ClassType';
import { SkillType } from '../models/Skill';
import { SkillReference } from '../models/skill-reference';
import { SkillRotation } from '../models/skill-rotation';
import { IJobSkills } from '../zones/dto/stage-party-setup.dto';

export class SkillRotationFactory {
  static createFromSkillTypes(
    classType: ClassType,
    skill1: SkillType,
    skill2: SkillType,
    skill3: SkillType,
    skill4: SkillType,
  ) {
    return new SkillRotation(
      classType,
      new SkillReference(skill1),
      new SkillReference(skill2),
      new SkillReference(skill3),
      new SkillReference(skill4),
    );
  }

  static createFromJobSkillsDTO(classType: ClassType, dto: IJobSkills): SkillRotation | null {
    if (dto.skill1 || dto.skill2 || dto.skill3 || dto.skill4) {
      return new SkillRotation(
        classType,
        new SkillReference(dto.skill1),
        new SkillReference(dto.skill2),
        new SkillReference(dto.skill3),
        new SkillReference(dto.skill4),
      );
    }

    return null;
  }
}
