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
  bossChoices: IChoice[];
  zoneChoices: IChoice[];
  jobChoices: IChoice[];
  skillChoices: IChoice[];
  zone: number | string | null;
  boss: number | string | null;
  stage: number | null;
  char1class: number | string | null;
  char1skill1: number | string | null;
}

export class AddPartySetupForm extends React.Component<Props, State> {
  state = {
    bossChoices: [{ label: "", value: 0 }],
    zoneChoices: [{ label: "", value: 0 }],
    jobChoices: [{ label: "", value: 0 }],
    skillChoices: [{ label: "", value: 0 }],
    zone: 0,
    boss: 0,
    stage: 1,
    char1class: 0,
    char1skill1: 0,
  };

  constructor(props: Props) {
    super(props);

    zoneService.fetchAllZones();
    jobService.initJobs();
  }

  componentDidMount() {
    jobQuery.selectAll().subscribe((jobs) => {
      this.setState({
        jobChoices: jobs.map((job) => ({ label: job.name, value: job.id })),
      });
    });

    zoneQuery.selectAll().subscribe((zones) => {
      if (zones && zones.length) {
        const zoneChoices = [
          ...zones.map((zone) => {
            return { label: zone.name, value: zone.id };
          }),
        ];

        this.setState({
          zoneChoices,
        });
      }
    });
  }

  render() {
    return (
      <div className="add-setup-form">
        <Card>
          <CardHeader title="Propose Setup for Boss" />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item md={2}>
                <BossSelector />
              </Grid>
              <Grid item md={2}></Grid>
              <Grid item md={8}>
                <TextField
                  type="number"
                  value={this.state.stage}
                  title="Stage"
                />
              </Grid>

              <Grid item md={2}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Job</InputLabel>
                  <Select
                    value={this.state.char1class ?? ""}
                    onChange={(event) => {
                      console.log("Change Job", event.target);
                      this.setState({
                        char1class: Number(event.target.value),
                      });
                    }}
                    label="Job"
                  >
                    {this.state.jobChoices.map((choice: IChoice) => (
                      <MenuItem key={choice.value} value={choice.value}>
                        {choice.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={8}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Skill #1
                  </InputLabel>
                  <Select value={this.state.char1skill1} label="Skill #1">
                    {this.state.skillChoices.map((choice: IChoice) => (
                      <MenuItem key={choice.value} value={choice.value}>
                        {choice.label}
                      </MenuItem>
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
