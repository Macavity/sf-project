import { ZoneDTO } from './dto/zone.dto';
import { Zone } from '../models/Zone';
import { ContinentKey } from '../models/Continent';

export class ZoneFactory {
  static createFromDTO(dto: ZoneDTO): Zone {
    return new Zone(dto.id, dto.continent?.id || ContinentKey.None, dto.name, dto.slug);
  }
}
