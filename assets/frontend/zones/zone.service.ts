import { Observable } from 'rxjs';
import { zoneStore, ZoneStore } from './zone.store';
import { zoneQuery, ZoneQuery } from './zone.query';
import { Zone } from '../models/Zone';
import { ZoneRepository } from './zone.repository';
import { loggerService } from '../services/logger.service';


class ZoneService {
    constructor(private zoneStore: ZoneStore, private zoneQuery: ZoneQuery) {
    }

    fetchAllZones() {
        this.zoneStore.setLoading(true);
        ZoneRepository.findAll()
            .then(zones => {
                loggerService.debug('✅ Initialized all Zones.');
                this.zoneStore.set(zones);
                this.zoneStore.setLoading(false);
            });
    }

    findZonesForContinent(continentResourceId: string): Observable<Zone[]> {
        return this.zoneQuery.selectAll({
            filterBy: ({ continent }) => {
                return continent === continentResourceId;
            },
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
