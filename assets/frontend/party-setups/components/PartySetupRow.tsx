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
import './party-setup-row.module.scss';
import { Link, TableCell, TableRow } from '@mui/material';

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
            <TableRow sx={{ verticalAlign: 'top' }}>
                <TableCell component="th" scope="row">
                    <Link href={`/zone/${this.props.zoneId}`}>{this.state.zoneName}</Link>
                </TableCell>
                <TableCell scope="row">{this.props.stageLevel}</TableCell>
                <TableCell width="50">
                    <ElementTag element={this.props.primaryCounterElement} key={this.props.stageLevel + '-element-1'}/>
                </TableCell>
                <TableCell width="50">
                    <ElementTag element={this.props.secondaryCounterElement}
                                key={this.props.stageLevel + '-element-2'}/>
                </TableCell>
                <TableCell colSpan={4}>
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
                </TableCell>
            </TableRow>
        );
    }
}
