import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { loggerService } from "assets/frontend/services/logger.service";
import { jobQuery } from "assets/frontend/store/jobs/job.query";
import { skillQuery } from "assets/frontend/store/skills/skill.query";
import React, { useEffect } from "react";
import JobSelector from "./JobSelector";
import SkillSelector from "./SkillSelector";

interface IChoice {
    label: string;
    value: number;
}

interface Props {}

export default function SkillRotation(props: Props) {
    const [job, setJob] = React.useState<number | null>(null);
    const [skills, setSkills] = React.useState<number | null[]>([
        null,
        null,
        null,
        null,
    ]);

    const handleChangeJob = (jobName: string | null) => {
        if (jobName === null) {
            setJob(null);
            return;
        }

        const jobEntity = jobQuery.getByName(jobName);

        if (jobEntity) {
            loggerService.debug(
                "SkillRotation|Change Job to: " + jobEntity.name,
            );
            setJob(jobEntity.id);
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item md={2}>
                <JobSelector onChange={handleChangeJob} />
            </Grid>
            {job ? (
                <>
                    <Grid item md={2}>
                        <SkillSelector jobId={job} number={1} />
                    </Grid>
                    <Grid item md={2}>
                        <SkillSelector jobId={job} number={2} />
                    </Grid>
                    <Grid item md={2}>
                        <SkillSelector jobId={job} number={3} />
                    </Grid>
                    <Grid item md={2}>
                        <SkillSelector jobId={job} number={4} />
                    </Grid>
                </>
            ) : null}
        </Grid>
    );
}
