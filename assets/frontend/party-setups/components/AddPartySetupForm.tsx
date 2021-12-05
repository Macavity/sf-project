import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { bossService } from '../../bosses/boss.service';
import { bossQuery } from '../../bosses/boss.query';
import CardHeader from '@mui/material/CardHeader';
import { Card, CardContent, FormControl, Grid, InputLabel, Select } from '@mui/material';
import { zoneService } from '../../zones/zone.service';
import { zoneQuery } from '../../zones/zone.query';
import MenuItem from '@mui/material/MenuItem';
import { jobQuery } from '../../store/jobs/job.query';
import { jobService } from '../../store/jobs/job.service';

const allBosses = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
];

interface Props {

}

interface IChoice {
    label: string;
    value: number;
}

interface State {
    bossChoices: IChoice[],
    zoneChoices: IChoice[],
    jobChoices: IChoice[],
    zone: number | null,
    boss: number | null,
    stage: number | null,
    char1class: number | string,
}

export class AddPartySetupForm extends React.Component<Props, State> {
    state = {
        bossChoices: [],
        zoneChoices: [],
        jobChoices: [],
        zone: null,
        boss: null,
        stage: null,
        char1class: '',
    };

    constructor(props: Props) {
        super(props);

        bossService.initBosses();
        zoneService.fetchAllZones();
        jobService.initJobs();
    }

    componentDidMount() {
        bossQuery.selectAll().subscribe(bosses => {
            if (bosses && bosses.length) {
                const bossChoices = [
                    ...bosses.map(boss => {
                        return { label: boss.name, value: boss.id };
                    }),
                ];

                this.setState({
                    bossChoices,
                });
            }
        });

        jobQuery.selectAll().subscribe(jobs => {
            this.setState({
                jobChoices: jobs.map(job => ({ label: job.name, value: job.id })),
            });
        });

        zoneQuery.selectAll().subscribe(zones => {
            if (zones && zones.length) {
                const zoneChoices = [
                    ...zones.map(zone => {
                        return { label: zone.name, value: zone.id };
                    }),
                ];

                this.setState({
                    zoneChoices,
                });
            }
        });
    }

    selectJob(event) {
        console.log(event);
    }

    render() {
        return (
            <div className="add-setup-form">
                <Card>
                    <CardHeader title="Propose Setup for Boss"/>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item md={2}>
                                <Autocomplete
                                    disablePortal
                                    options={this.state.bossChoices}
                                    sx={{ width: 300 }}
                                    value={this.state.boss}
                                    renderInput={(params) => <TextField {...params} label="Boss"/>}
                                />
                            </Grid>
                            <Grid item md={2}>
                                <Autocomplete
                                    disablePortal
                                    options={this.state.zoneChoices}
                                    sx={{ width: 300 }}
                                    value={this.state.zone}
                                    renderInput={(params) => <TextField {...params} label="Zone"/>}
                                />
                            </Grid>
                            <Grid item md={8}>
                                <TextField type="number" value={this.state.stage} title="Stage"/>
                            </Grid>
                            <Grid item md={2}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Job</InputLabel>
                                    <Select value={this.state.char1class} label="Job">
                                        {this.state.jobChoices.map((choice: IChoice) => (
                                            <MenuItem key={choice.id} value={choice.id}>{choice.label}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={2}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Job</InputLabel>
                                    <Select value={this.state.char1class} label="Job" onSelect={this.selectJob}>
                                        {this.state.jobChoices.map((choice: IChoice) => (
                                            <MenuItem key={choice.value} value={choice.value}>{choice.label}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                    </CardContent>
                </Card>
            </div>
        );
    }
}
