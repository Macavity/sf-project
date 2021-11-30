import { Stage } from 'assets/frontend/models/Stage';
import { ApiService } from '../services/api.service';
import { RequestQueryBuilder } from '@nestjsx/crud-request';
import { StageFactory } from './stage.factory';
import { StageDTO } from './dto/stage.dto';

export class StageRepository {
    public static async findByZone(areaId: number): Promise<Stage[]> {
        // console.log('StageRepository.findByZone', areaId);

        const qb = RequestQueryBuilder.create();
        qb.setJoin(['boss.party_setup']);


        return ApiService
            .get<StageDTO[]>(`/stages.json?zone=${areaId}`)
            .then((response: StageDTO[]) => {
                return response.map((dto: StageDTO) => {
                    return StageFactory.createFromDTO(dto, areaId);
                });
            });
    }
}
