import { StageDTO } from './dto/stage.dto';
import { Stage } from '../models/Stage';
import { BossFactory } from '../bosses/boss.factory';

export class StageFactory {
    static createFromDTO(dto: StageDTO, zoneId: number): Stage {
        return new Stage(
            dto.id,
            zoneId,
            dto.level,
            dto.boss.id,
            dto.boss,
        );
    }
}
