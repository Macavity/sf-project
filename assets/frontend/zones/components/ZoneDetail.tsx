import { Component } from 'react';
import { Stage } from '../../models/Stage';
import { StageRow } from './StageRow';
import { zoneQuery } from '../zone.query';
import { StageRepository } from '../stage.repository';
import { zoneService } from '../zone.service';
import { appQuery } from '../../store/app.query';
import {
    Card,
    CardContent,
    CardHeader,
    FormControlLabel,
    Paper,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import { skillService } from '../../store/skills/skill.service';
import { AddSetupButton } from '../../elements/AddSetupButton';
import { getCounterElement } from '../../factories/element.factory';

type LocalProps = {
    zoneKey: number;
}

type LocalState = {
    zoneName: string;
    stages: Stage[];
    allStages: Stage[];
    filteredStages: Stage[];
    activeRowStage: number;
    isAdmin: boolean;
    onlyLast: boolean;
}

const sortByLevel = (a: Stage, b: Stage) => (a.level > b.level) ? 1 : -1;

export class ZoneDetail extends Component<LocalProps, LocalState> {
    constructor(props: LocalProps) {
        super(props);

        this.state = {
            stages: [] as Stage[],
            filteredStages: [] as Stage[],
            allStages: [] as Stage[],
            zoneName: '',
            activeRowStage: 0,
            isAdmin: appQuery.isAdmin(),
            onlyLast: true,
        };

        zoneService.fetchZone(this.props.zoneKey);
    }

    componentDidMount() {
        if (this.props.zoneKey > 0) {


            StageRepository.findByZone(this.props.zoneKey)
                .then(stages => {
                    console.log('Stages loaded', stages);

                    this.setState({
                        allStages: stages.sort(sortByLevel),
                        filteredStages: this.filteredStages(stages),
                    });

                    this.setState({
                        stages: this.shownStages(),
                    });
                });

            zoneQuery.selectEntity(this.props.zoneKey)
                .subscribe(zoneEntity => {
                    if (zoneEntity) {
                        this.setState({
                            zoneName: zoneEntity.name,
                        });
                    }
                });
        }
    }

    filteredStages(allStages: Stage[]) {

        if (!this.state.onlyLast) {
            return this.state.stages;
        }

        const reversed = [...allStages].reverse();
        const reduced = [] as Stage[];
        const bossIds = [] as number[];

        for (const stage of reversed) {
            if (!bossIds.includes(stage.bossKey)) {
                reduced.push(stage);
                bossIds.push(stage.bossKey);
            }
        }

        return reduced.sort(sortByLevel);
    }

    shownStages() {
        if (this.state.onlyLast) {
            return this.state.filteredStages;
        }

        return this.state.allStages;
    }

    colSpan() {
        return this.state.isAdmin ? 9 : 8;
    }

    getEmptyRow() {
        if (this.state.stages.length) {
            return null;
        }

        return (
            <tr>
                <td colSpan={this.colSpan()}>No Data saved yet.</td>
            </tr>
        );
    }

    toggleFilter = () => {
        this.setState({
            onlyLast: !this.state.onlyLast,
        });
    };

    getAdminActions() {
        if (!this.state.isAdmin) {
            return null;
        }
        return (
            <div>
                <FormControlLabel control={<Switch checked={this.state.onlyLast} onClick={this.toggleFilter}/>}
                                  label="Show only last occurrences"/>
                <AddSetupButton/>
            </div>
        );
    }

    render() {
        return (
            <div className="container-fluid">
                <Card>
                    <CardHeader title={this.state.zoneName}/>
                    <CardContent>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell width={50}>Stage</TableCell>
                                        <TableCell width={100}>Boss</TableCell>
                                        <TableCell width={50} colSpan={2}>Pet Elements</TableCell>
                                        <TableCell colSpan={4} align="left">Party</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.getEmptyRow()}
                                    {this.shownStages().map(stage => {
                                        return (
                                            <StageRow key={stage.level}
                                                      stageId={stage.id}
                                                      stageLevel={stage.level}
                                                      zoneId={stage.areaKey}
                                                      bossName={stage.boss.name}
                                                      bossId={stage.boss.id}
                                                      primaryCounterElement={getCounterElement(stage.boss.primaryElement)}
                                                      secondaryCounterElement={getCounterElement(stage.boss.secondaryElement)}
                                            />
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </div>
        );
    }
}
