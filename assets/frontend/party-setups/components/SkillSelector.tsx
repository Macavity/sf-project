import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { loggerService } from "assets/frontend/services/logger.service";
import { skillQuery } from "assets/frontend/store/skills/skill.query";
import React, { useEffect } from "react";

interface IChoice {
    label: string;
    value: number;
}

interface IProps {
    jobId: number;
    number: number;
}

export default function SkillSelector(props: IProps) {
    const [skill, setSkill] = React.useState<IChoice | null>(null);
    const [skillChoices, setSkillChoices] = React.useState<IChoice[]>([]);
    const loading = skillChoices.length === 0;

    useEffect(() => {
        const entities = skillQuery.getByJob(props.jobId) || [];
        const choices = entities.map((skill) => ({
            label: skill.shortName,
            value: skill.id,
        }));
        setSkillChoices(choices);
    }, [loading, props.jobId]);

    return (
        <Autocomplete
            value={skill}
            onChange={(event, value) => {
                loggerService.debug(
                    `Change Skill #${props.number} to: ` +
                        JSON.stringify(value),
                );
                setSkill(value);
            }}
            isOptionEqualToValue={(option, value) =>
                option.label === value.label
            }
            getOptionLabel={(option) => option.label}
            options={skillChoices}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={`Skill #${props.number}`}
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
    );
}
