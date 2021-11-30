import { PartySetupDto } from './dto/party-setup.dto';
import { PartySetup } from '../models/PartySetup';
import { ZoneFactory } from '../zones/zone.factory';
import { BossFactory } from '../bosses/boss.factory';

export class PartySetupFactory {
    static create(dto: PartySetupDto): PartySetup {

        // const gladiator = JobRotationFactory.create(ClassType.Gladiator, dto.gladiatorRotation);
        // const warrior = JobRotationFactory.create(ClassType.Warrior, dto.warriorRotation);
        // const druid = JobRotationFactory.create(ClassType.Druid, dto.druidRotation);
        // const shaman = JobRotationFactory.create(ClassType.Shaman, dto.shamanRotation);
        // const assassin = JobRotationFactory.create(ClassType.Assassin, dto.assassinRotation);
        // const hunter = JobRotationFactory.create(ClassType.Hunter, dto.hunterRotation);
        // const mage = JobRotationFactory.create(ClassType.Mage, dto.mageRotation);
        // const warlock = JobRotationFactory.create(ClassType.Warlock, dto.warlockRotation);

        return new PartySetup(
            dto.id,
            ZoneFactory.extractId(dto.zone),
            dto.stageLevel,
            BossFactory.extractId(dto.boss),
            dto.gladiatorRotation,
            dto.warriorRotation,
            dto.druidRotation,
            dto.shamanRotation,
            dto.assassinRotation,
            dto.hunterRotation,
            dto.mageRotation,
            dto.warlockRotation,
        );
    }

    static extractId(resourceId: string): number {
        return Number(resourceId.replace('/api/boss/', ''));
    }

    static createArray(dtos: PartySetupDto[]) {
        const array = [] as PartySetup[];

        for (const dto of dtos) {
            array.push(PartySetupFactory.create(dto));
        }

        return array;
    }
}
