import { ApiService } from 'assets/frontend/services/api.service';
import { BossType } from 'assets/frontend/enums/BossType';
import { PartySetupDto } from 'assets/frontend/party-setups/dto/party-setup.dto';
import { IBoss } from 'assets/frontend/interfaces/IBoss';

export class BossRepository {
    public static findAll(): Promise<IBoss[]> {
        return ApiService
            .get<IBoss[]>('/bosses.json')
            .then((bosses: IBoss[]) => {
                return bosses;
            });
    }

    public static findByKey(id: BossType): Promise<IBoss> {
        return ApiService.get<IBoss>(`/bosses/${id}.json`)
            .then(bossData => {
                return bossData;
            });
    }

    public static getPartySetupsForBossInZone(bossId: number, zoneId: number, level: number): Promise<PartySetupDto[]> {
        return ApiService.get<PartySetupDto[]>(`/bosses/${bossId}/zone/${zoneId}/party_setups.json?level=${level}`);
    }
}
