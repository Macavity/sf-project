import { BossDTO } from './dto/boss.dto';
import { Boss } from '../models/Boss';
import { StagePartySetupFactory } from 'assets/frontend/zones/stage-party-setup.factory';

export class BossFactory {
  static createFromDTO(dto: BossDTO): Boss {
    const boss = new Boss(dto.id, dto.name, dto.primaryElement, dto.secondaryElement);

    if(typeof dto.partySetups !== 'undefined' && dto.partySetups.length){
      for(const setupDTO of dto.partySetups){
        boss.addRotation(StagePartySetupFactory.create(setupDTO));
      }
    }

    return boss;
  }

  static extractId(resourceId: string): number {
    return Number(resourceId.replace('/api/boss/', ''));
  }

}
