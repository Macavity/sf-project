import { Observable } from 'rxjs';
import { zoneStore, ZoneStore } from './zone.store';
import { zoneQuery, ZoneQuery } from './zone.query';
import { ContinentKey } from '../models/Continent';
import { Zone } from '../models/Zone';
import { ZoneRepository } from './zone.repository';


class ZoneService {
  constructor(private zoneStore: ZoneStore, private zoneQuery: ZoneQuery) {
  }

  fetchAllZones() {
    this.zoneStore.setLoading(true);
    ZoneRepository.findAll()
      .then(zones => {
        this.zoneStore.set(zones);
        this.zoneStore.setLoading(false);
      });
  }

  fetchStagesForZone() {

  }

  findZonesForContinent(continentKey: ContinentKey): Observable<Zone[]> {
    return this.zoneQuery.selectAll({
      filterBy: ({ continent }) => continent === continentKey,
    });
  }

  fetchZone(id: number) {
    this.zoneStore.setLoading(true);
    ZoneRepository.find(id)
      .then(zone => {
        this.zoneStore.add(zone);
        this.zoneStore.setLoading(false);
      });
  }
}

export const zoneService = new ZoneService(zoneStore, zoneQuery);
