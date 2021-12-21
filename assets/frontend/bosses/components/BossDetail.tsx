import { Component } from 'react';
import { PartySetup } from '../../models/PartySetup';
import { bossService } from '../boss.service';
import { bossQuery } from '../boss.query';
import { PartySetupRow } from 'assets/frontend/party-setups/components/PartySetupRow';
import { partySetupService } from '../../party-setups/party-setup.service';
import { partySetupQuery } from '../../party-setups/party-setup.query';
import {
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@mui/material';
import { AddSetupButton } from '../../elements/AddSetupButton';
import { loggerService } from '../../services/logger.service';

declare let window: IWindow;

type LocalProps = {
    bossId: number;
}

type LocalState = {
    partySetups: PartySetup[];
    boss: IBoss | null;
}

export class BossDetail extends Component<LocalProps, LocalState> {
    constructor(props: LocalProps) {
        super(props);

        bossService.loadBoss(this.props.bossId);
        partySetupService.fetchForBoss(this.props.bossId);

        this.state = {
            partySetups: [],
            boss: null,
        };
    }

    getAdminActions() {
        if (!window.frontendState.isUser) {
            return null;
        }

        return (
            <div>
                <AddSetupButton/>
            </div>
        );
    }

    componentDidMount() {
        loggerService.debug('bossQuery.selectEntity', this.props.bossId);
        bossQuery.selectEntity(this.props.bossId)
            .subscribe((boss) => {
                console.log('subscribe', boss);
                if (boss) {
                    console.log('BossQuery.subscribe: Entity set.');
                    this.setState({
                        boss,
                    });
                }
            });
        partySetupQuery
            .selectAll({
                filterBy: entity => entity.bossId === this.props.bossId,
            })
            .subscribe(entities => {
                if (entities.length) {
                    // console.log('PartySetup subscription result', entities);
                    this.setState({
                        partySetups: entities,
                    });
                }
            });
    }

    getEmptyRow() {
        if (this.state.boss && this.state.partySetups.length) {
            return null;
        }

        return (
            <tr>
                <td colSpan={8}>No Data saved yet.</td>
            </tr>
        );
    }

    render() {
        const setups = this.state.partySetups;

        if (!this.state.boss) {
            return (
                <div><CircularProgress/></div>
            );
        }

        const boss = this.state.boss;

        return (
            <Card>
                <CardHeader title={this.state.boss.name}/>
                <CardContent>
                    {this.getAdminActions()}
                    {this.state.boss ? (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Area</TableCell>
                                    <TableCell>Level</TableCell>
                                    <TableCell colSpan={2}>Pet Elements</TableCell>
                                    <TableCell colSpan={4}>Party</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {setups.map((setup, i) => {
                                    return (
                                        <PartySetupRow key={setup.zoneId + '-' + i}
                                                       stageLevel={setup.stage}
                                                       zoneId={setup.zoneId}
                                                       bossName={boss.name}
                                                       bossId={boss.id}
                                                       primaryElement={boss.primaryElement}
                                                       secondaryElement={boss.secondaryElement}
                                        />
                                    );
                                })}
                            </TableBody>
                        </Table>
                    ) : this.getEmptyRow()}
                </CardContent>
            </Card>
        );
    }
}
