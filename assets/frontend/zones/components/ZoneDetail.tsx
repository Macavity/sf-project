import { Component } from 'react';
import { Stage } from '../../models/Stage';
import { StageRow } from './StageRow';
import { zoneQuery } from '../zone.query';
import { StageRepository } from '../stage.repository';
import { zoneService } from '../zone.service';
import { appQuery } from '../../store/app.query';
import { FormControlLabel, Switch } from '@mui/material';
import { skillService } from '../../store/skills/skill.service';
import { AddSetupButton } from '../../elements/AddSetupButton';

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

        skillService.initSkills();
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
                <div className="card">
                    <div className="card-header">{this.state.zoneName}</div>
                    <div className="card-body">
                        {this.getAdminActions()}
                        <table className="table table-hover table-striped">
                            <thead>
                            <tr>
                                <th scope="col">Stage</th>
                                <th scope="col">Boss</th>
                                <th scope="col" colSpan={2}>Pet Elements</th>
                                <th scope="col" colSpan={4}>Party</th>
                                {this.state.isAdmin && (<th scope="col">Admin</th>)}
                            </tr>
                            </thead>
                            <tbody>
                            {this.getEmptyRow()}
                            {this.shownStages().map(stage => {
                                return (
                                    <StageRow key={stage.level}
                                              stageId={stage.id}
                                              stageLevel={stage.level}
                                              zoneId={stage.areaKey}
                                              bossName={stage.boss.name}
                                              bossId={stage.boss.id}
                                              primaryCounterElement={stage.boss.primaryCounter}
                                              secondaryCounterElement={stage.boss.secondaryCounter}
                                    />
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
