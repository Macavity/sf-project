import { Zone } from 'assets/frontend/models/Zone';
import { ZoneDTO } from './dto/zone.dto';
import { ZoneFactory } from './zone.factory';
import { ApiService } from '../services/api.service';

export class ZoneRepository {
  public static findAll(): Promise<Zone[]> {
    return ApiService
      .get<ZoneDTO[]>('/zones.json')
      .then((zoneResponse: ZoneDTO[]) => {
        return zoneResponse.map(dto => ZoneFactory.createFromDTO(dto));
      });
  }

  public static find(id: number): Promise<Zone> {
    return ApiService
      .get<ZoneDTO>(`/zones/${id}.json`)
      .then((dto: ZoneDTO) => {
        return ZoneFactory.createFromDTO(dto);
      });
  }
}
