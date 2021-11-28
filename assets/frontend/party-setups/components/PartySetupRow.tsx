import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { ElementTag } from 'assets/frontend/elements/ElementTag';
import { ElementType } from 'assets/frontend/enums/ElementType';
import { PartySetup } from 'assets/frontend/models/PartySetup';
import { SkillService, skillService } from '../../store/skills/skill.service';
import { zoneService } from '../../zones/zone.service';
import { zoneQuery } from '../../zones/zone.query';
import { PartySetupFactory } from '../party-setup.factory';
import { partySetupService } from '../party-setup.service';
import { BossRepository } from '../../bosses/boss.repository';
import { JobRotationTags } from '../../job-rotations/components/JobRotationTags';
import { appQuery } from '../../store/app.query';
import { EditSetupButton } from '../../elements/EditSetupButton';
import './party-setup-row.module.scss';

type LocalProps = {
    stageLevel: number;
    zoneId: number;
    bossId: number;
    bossName: string;
    primaryCounterElement: ElementType | null;
    secondaryCounterElement: ElementType | null;
}

type LocalState = {
    stagePartySetups: PartySetup[];
    zoneName: string;
}

export class PartySetupRow extends Component<LocalProps, LocalState> {
    private skillService: SkillService;

    constructor(props: LocalProps) {
        super(props);
        this.skillService = skillService;

        zoneService.fetchZone(this.props.zoneId);
        partySetupService.fetchForStage(this.props.bossId, this.props.zoneId, this.props.stageLevel);
        this.state = {
            stagePartySetups: [] as PartySetup[],
            zoneName: ' ',
        };
    }

    componentDidMount() {
        BossRepository.getPartySetupsForBossInZone(this.props.bossId, this.props.zoneId, this.props.stageLevel).then(
            (setups) => {
                const stagePartySetups = PartySetupFactory.createArray(setups);

                this.setState({
                    stagePartySetups,
                });
            }
        );

        zoneQuery.selectEntity(this.props.zoneId)
            .subscribe(zone => {
                if (zone) {
                    this.setState({
                        zoneName: zone.name,
                    });
                }
            });
    }

    getAdminActions() {
        // if (appQuery.isAdmin()) {
        //     return (
        //         <div className="stage-party-setup__actions">
        //             <EditSetupButton setupId={this.state.stagePartySetups[0]?.id}/>
        //         </div>
        //     );
        // }

        return null;
    }

    render() {
        return (
            <tr className="el-table__row">
                <th scope="row">
                    <NavLink to={`/zone/${this.props.zoneId}`}>{this.state.zoneName}</NavLink>
                </th>
                <th scope="row">{this.props.stageLevel}</th>
                <td width="50">
                    <ElementTag element={this.props.primaryCounterElement} key={this.props.stageLevel + '-element-1'}/>
                </td>
                <td width="50">
                    <ElementTag element={this.props.secondaryCounterElement}
                                key={this.props.stageLevel + '-element-2'}/>
                </td>
                <td colSpan={4}>
                    {this.state.stagePartySetups.map((stagePartySetup, i) => (
                        <div className="stage-party-setup" key={this.props.stageLevel + '-' + i}>
                            <div className="stage-party-setup__skills">
                                {stagePartySetup.getOrderedSkillRotations().map((skillRotation, j) => (
                                    <JobRotationTags key={this.props.stageLevel + '-skill-rota-' + j}
                                                     iri={skillRotation}
                                    />
                                ))}
                            </div>
                            {this.getAdminActions()}
                        </div>
                    ))}
                </td>
            </tr>
        );
    }
}
