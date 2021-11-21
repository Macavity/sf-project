import { ZoneDTO } from './dto/zone.dto';
import { Zone } from '../models/Zone';
import { ContinentKey } from '../models/Continent';

export class ZoneFactory {
  static createFromDTO(dto: ZoneDTO): Zone {

    return new Zone(dto.id, dto.continent, dto.name, dto.slug);
  }

  static extractId(resourceId: string): number {
    return Number(resourceId.replace('/api/zones/', ''));
  }
}
