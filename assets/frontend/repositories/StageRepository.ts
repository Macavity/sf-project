import { Stage } from 'assets/frontend/models/Stage';
import { ApiService } from '../services/api.service';
import { StageDTO } from '../zones/dto/stage.dto';
import { Boss } from '../models/Boss';
import { RequestQueryBuilder } from '@nestjsx/crud-request';

export class StageRepository {
  public static async findByZone(areaId: number): Promise<Stage[]> {
    // console.log('StageRepository.findByZone', areaId);

    const qb = RequestQueryBuilder.create();
    qb.setJoin(['boss.party_setup']);

    return ApiService
      .get<StageDTO[]>(`/zones/${areaId}/stages?`+qb.query())
      .then((response: StageDTO[]) => {
        return response.map((dto: StageDTO) => {
          return new Stage(
            dto.id,
            0,
            areaId,
            dto.level,
            dto.boss.id,
            new Boss(dto.boss.id, dto.boss.name, dto.boss.primaryElement, dto.boss.secondaryElement),
          );
        });
      });
  }
}
