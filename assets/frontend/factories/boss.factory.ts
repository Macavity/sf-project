import { Boss } from '../models/Boss';
import { PartySetupList } from '../models/StagePartySetup';
import { BossDTO } from '../bosses/dto/boss.dto';

export class BossFactory {
  static createFromJson(jsonObject: BossDTO): Boss {
    return new Boss(jsonObject.id, jsonObject.name, jsonObject.primaryElement, jsonObject.secondaryElement, new PartySetupList());
  }

  static createArrayFromJson(jsonObjects: BossDTO[]): Boss[] {
    return jsonObjects.map(obj => BossFactory.createFromJson(obj));
  }
}
