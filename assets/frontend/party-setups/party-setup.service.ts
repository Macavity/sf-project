import { partySetupStore, PartySetupStore } from './party-setup.store';
import { partySetupQuery, PartySetupQuery } from './party-setup.query';
import { PartySetupRepository } from './party-setup.repository';
import { BossRepository } from '../bosses/boss.repository';
import { PartySetupDto } from './dto/party-setup.dto';


class PartySetupService {
    constructor(private partySetupStore: PartySetupStore, private partySetupQuery: PartySetupQuery) {
    }

    fetchForBoss(bossId: number) {
        this.partySetupStore.setLoading(true);
        PartySetupRepository.findByKeyWithPartySetups(bossId)
            .then((partySetups) => {
                for (const partySetup of partySetups) {
                    partySetup.bossId = bossId;
                    this.partySetupStore.add(partySetup);
                }
                this.partySetupStore.setLoading(false);
            });
    }

    fetchForStage(bossId: number, zoneId: number, level: number): Promise<PartySetupDto[]> {
        // api/bosses/21/party_setups?zoneId=42&level=72
        return BossRepository.getPartySetupsForBossInZone(bossId, zoneId, level);
    }
}

export const partySetupService = new PartySetupService(partySetupStore, partySetupQuery);
