import { ApiService } from '../services/api.service';
import { BossType } from '../enums/BossType';
import { PartySetup } from '../models/PartySetup';
import { PartySetupDto } from './dto/party-setup.dto';
import { PartySetupFactory } from './party-setup.factory';

export class PartySetupRepository {
    public static findAll(): Promise<PartySetup[]> {
        return ApiService
            .get<PartySetupDto[]>('/party_setups.json')
            .then((zoneResponse: PartySetupDto[]) => {
                return zoneResponse.map(dto => PartySetupFactory.create(dto));
            });
    }

    public static findByKey(id: BossType): Promise<PartySetup> {
        return ApiService.get<PartySetupDto>(`/party_setups/${id}.json`)
            .then(bossData => {
                return PartySetupFactory.create(bossData);
            });
    }

    public static findByKeyWithPartySetups(id: BossType): Promise<PartySetup[]> {
        return ApiService.get<PartySetupDto[]>(`/party_setups.json?boss=${id}`)
            .then(partySetups => {
                return partySetups.map(partySetup => {
                    return PartySetupFactory.create(partySetup);
                });
            });
    }

}
