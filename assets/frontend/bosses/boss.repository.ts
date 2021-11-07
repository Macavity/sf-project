import { ApiService } from '../services/api.service';
import { Boss } from '../models/Boss';
import { BossDTO } from './dto/boss.dto';
import { BossFactory } from './boss.factory';
import { BossType } from '../enums/BossType';

export class BossRepository {
  public static findAll(): Promise<Boss[]> {
    return ApiService
      .get<BossDTO[]>('/bosses.json')
      .then((zoneResponse: BossDTO[]) => {
        return zoneResponse.map(dto => BossFactory.createFromDTO(dto));
      });
  }

  public static findByKey(id: BossType): Promise<Boss> {
    return ApiService.get<BossDTO>(`/bosses/${id}.json`)
      .then(bossData => {
        return BossFactory.createFromDTO(bossData);
      });
  }

  public static findByKeyWithPartySetups(id: BossType): Promise<Boss> {
    return ApiService.get<BossDTO>(`/bosses/${id}.json?join=partySetups&join=partySetups.zone`)
      .then(bossData => {
        return BossFactory.createFromDTO(bossData);
      });
  }

}
