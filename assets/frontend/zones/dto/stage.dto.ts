import { BossDTO } from '../../bosses/dto/boss.dto';

export class StageDTO {
  constructor(
    public id: number,
    public level: number,
    public boss: BossDTO,
  ) {

  }
}
