import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { bossQuery } from "assets/frontend/bosses/boss.query";
import { bossService } from "assets/frontend/bosses/boss.service";
import { loggerService } from "assets/frontend/services/logger.service";
import { jobQuery } from "assets/frontend/store/jobs/job.query";
import React from "react";

interface IBossChoice {
    label: string;
    value: number;
}

interface IProps {
    onChange: (jobName: string | null) => void;
}

export default function JobSelector(props: IProps) {
    const [job, setJob] = React.useState<string | null>(null);
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<string[]>([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        jobQuery.selectAll().subscribe((jobs) => {
            setOptions([...jobs.map((job) => job.name)]);
        });

        return () => {
            active = false;
        };
    }, [loading]);

    return (
        <React.Fragment>
            <Autocomplete
                fullWidth
                open={open}
                value={job}
                onChange={(event, value) => {
                    console.log(event);
                    setJob(value);
                    props.onChange(value);
                }}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                options={options}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Job"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? (
                                        <CircularProgress
                                            color="inherit"
                                            size={20}
                                        />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />
                )}
            />
        </React.Fragment>
    );
}
