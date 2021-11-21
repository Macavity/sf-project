import { BossDTO } from './dto/boss.dto';
import { Boss } from '../models/Boss';

export class BossFactory {
  static createFromDTO(dto: BossDTO): Boss {
    // if(typeof dto.partySetups !== 'undefined' && dto.partySetups.length){
    //   for(const setupDTO of dto.partySetups){
    //     boss.addRotation(StagePartySetupFactory.create(setupDTO));
    //   }
    // }

    return new Boss(dto.id, dto.name, dto.primaryElement, dto.secondaryElement);
  }

  static extractId(resourceId: string): number {
    return Number(resourceId.replace('/api/boss/', ''));
  }

}
