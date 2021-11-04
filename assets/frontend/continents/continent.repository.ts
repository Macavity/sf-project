import { ApiService } from '../services/api.service';
import { ContinentDTO } from './dto/continent.dto';
import { Continent } from '../models/Continent';

export class ContinentRepository {
  public static findAll(): Promise<Continent[]> {
    return ApiService.get<ContinentDTO[]>('/continents')
      .then(continents => {
        return continents.map(dto => {
          return new Continent(dto.id, dto.name, dto.slug);
        });
      });
  }
}
