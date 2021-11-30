import { ApiService } from '../services/api.service';
import { Boss } from '../models/Boss';
import { BossDTO } from './dto/boss.dto';
import { BossFactory } from './boss.factory';
import { BossType } from '../enums/BossType';
import { PartySetupDto } from '../party-setups/dto/party-setup.dto';

export class BossRepository {
    public static findAll(): Promise<Boss[]> {
        return ApiService
            .get<BossDTO[]>('/bosses.json')
            .then((zoneResponse: BossDTO[]) => {
                return zoneResponse.map(dto => BossFactory.createFromDTO(dto));
            });
    }

    public static findByKey(id: BossType): Promise<Boss> {
        return ApiService.get<BossDTO>(`/bosses/${id}.json`)
            .then(bossData => {
                return BossFactory.createFromDTO(bossData);
            });
    }

    public static getPartySetupsForBossInZone(bossId: number, zoneId: number, level: number): Promise<PartySetupDto[]> {
        if(typeof zoneId !== 'number'){
            debugger;
        }

        return ApiService.get<PartySetupDto[]>(`/bosses/${bossId}/zone/${zoneId}/party_setups.json?level=${level}`);
    }
}
