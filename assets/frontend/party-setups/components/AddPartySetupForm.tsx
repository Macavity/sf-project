import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { bossService } from "../../bosses/boss.service";
import { bossQuery } from "../../bosses/boss.query";
import CardHeader from "@mui/material/CardHeader";
import {
    Card,
    CardContent,
    FormControl,
    Grid,
    InputLabel,
    Select,
} from "@mui/material";
import { zoneService } from "../../zones/zone.service";
import { zoneQuery } from "../../zones/zone.query";
import MenuItem from "@mui/material/MenuItem";
import { jobQuery } from "../../store/jobs/job.query";
import { jobService } from "../../store/jobs/job.service";
import BossSelector from "./BossSelector";
import ZoneSelector from "./ZoneSelector";
import JobSelector from "./JobSelector";
import SkillRotation from "./SkillRotation";

const allBosses = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
];

interface Props {}

interface IChoice {
    label: undefined | string;
    value: number;
}

interface State {
    jobChoices: IChoice[];
    skillChoices: IChoice[];
    stage: number | null;
    char1class: number | string | null;
    char1skill1: number | string | null;
}

export class AddPartySetupForm extends React.Component<Props, State> {
    state = {
        jobChoices: [{ label: "", value: 0 }],
        skillChoices: [{ label: "", value: 0 }],
        stage: 1,
        char1class: 0,
        char1skill1: 0,
    };

    constructor(props: Props) {
        super(props);

        bossService.initBosses();
        zoneService.fetchAllZones();
        jobService.initJobs();
    }

    render() {
        return (
            <div className="add-setup-form">
                <Card>
                    <CardHeader title="Propose Setup for Boss" />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item md={5}>
                                <BossSelector />
                            </Grid>
                            <Grid item md={5}>
                                <ZoneSelector />
                            </Grid>
                            <Grid item md={2}>
                                <TextField
                                    type="number"
                                    value={this.state.stage}
                                    title="Stage"
                                />
                            </Grid>
                            <Grid item md={12}>
                                <SkillRotation />
                            </Grid>
                            <Grid item sm={12}>
                                <SkillRotation />
                            </Grid>
                            <Grid item sm={12}>
                                <SkillRotation />
                            </Grid>
                            <Grid item sm={12}>
                                <SkillRotation />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
        );
    }
}
