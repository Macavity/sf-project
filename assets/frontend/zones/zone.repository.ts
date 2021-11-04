import { Zone } from 'assets/frontend/models/Zone';
import { ZoneDTO } from './dto/zone.dto';
import { ZoneFactory } from './zone.factory';
import { ApiService } from '../services/api.service';

export class ZoneRepository {
  public static findAll(): Promise<Zone[]> {
    return ApiService
      .get<ZoneDTO[]>('/zones/')
      .then((zoneResponse: ZoneDTO[]) => {
        return zoneResponse.map(dto => ZoneFactory.createFromDTO(dto));
      });
  }

  public static find(id: number): Promise<Zone> {
    return ApiService
      .get<ZoneDTO>('/zones/'+id)
      .then((dto: ZoneDTO) => {
        return ZoneFactory.createFromDTO(dto);
      });
  }
}
