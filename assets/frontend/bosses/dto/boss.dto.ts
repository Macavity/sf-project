import { ElementType } from '../../enums/ElementType';
import { StagePartySetupDTO } from '../../zones/dto/stage-party-setup.dto';
import { ZoneDTO } from '../../zones/dto/zone.dto';

export class BossDTO {
  constructor(
    public id: number,
    public name: string,
    public primaryElement: ElementType = ElementType.None,
    public secondaryElement: ElementType = ElementType.None,
    public partySetups: StagePartySetupDTO[] = [],
    public zone: ZoneDTO|undefined = undefined,
  ) {
  }
}

