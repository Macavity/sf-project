import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { ElementTag } from 'assets/frontend/elements/ElementTag';
import { ElementType } from 'assets/frontend/enums/ElementType';
import { PartySetup } from 'assets/frontend/models/PartySetup';
import { appQuery } from '../../store/app.query';
import { BossRepository } from '../../bosses/boss.repository';
import { PartySetupFactory } from '../../party-setups/party-setup.factory';
import { EditStageButton } from '../../elements/EditStageButton';
import { EditSetupButton } from '../../elements/EditSetupButton';
import { JobRotationTags } from '../../job-rotations/components/JobRotationTags';
import { Link, TableCell, TableRow } from '@mui/material';

type LocalProps = {
    stageId: number;
    stageLevel: number;
    zoneId: number;
    bossId: number;
    bossName: string;
    primaryCounterElement: ElementType | null;
    secondaryCounterElement: ElementType | null;
    variant?: 'stage' | 'boss';
}

type LocalState = {
    stagePartySetups: PartySetup[];
}

const FETCH_STAGE = `
query FetchStage($id: ) {
    stage(id:"")
}
`;

export class StageRow extends Component<LocalProps, LocalState> {
    state = {
        stagePartySetups: [] as PartySetup[],
    };

    componentDidMount() {
        BossRepository.getPartySetupsForBossInZone(this.props.bossId, this.props.zoneId, this.props.stageLevel).then(
            (setups) => {
                const stagePartySetups = PartySetupFactory.createArray(setups);
                console.debug(`Party Setups loaded ${this.props.bossName}@${this.props.stageLevel}`, stagePartySetups);

                this.setState({
                    stagePartySetups,
                });
            }
        );
    }

    getAdminCol() {
        // if (appQuery.isAdmin()) {
        //     return (
        //         <td>
        //             <EditStageButton stageId={this.props.stageId}/>
        //             &nbsp;
        //             <EditSetupButton setupId={this.state.stagePartySetups[0]?.id}/>
        //         </td>
        //     );
        // }

        return null;
    }

    render() {

        return (
            <TableRow sx={{verticalAlign: 'top'}}>
                <TableCell component="th">{this.props.stageLevel}</TableCell>
                <TableCell>
                    <Link href={`/boss/${this.props.bossId}`}>{this.props.bossName}</Link>
                </TableCell>
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
                            {stagePartySetup.getOrderedSkillRotations().map((skillRotation, j) => (
                                <JobRotationTags key={this.props.stageLevel + '-skill-rota-' + j}
                                                 iri={skillRotation}
                                />
                            ))}
                        </div>
                    ))}
                </TableCell>
            </TableRow>
        );
    }
}
