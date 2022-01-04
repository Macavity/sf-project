import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { bossQuery } from "assets/frontend/bosses/boss.query";
import { loggerService } from "assets/frontend/services/logger.service";
import React from "react";

interface IBossChoice {
    label: string;
    value: number;
}

export default function BossSelector() {
    const [boss, setBoss] = React.useState<IBossChoice | null>(null);
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<IBossChoice[]>([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        bossQuery.selectAll().subscribe((bosses) => {
            if (bosses && bosses.length) {
                const bossChoices = [
                    ...bosses.map((boss) => {
                        return { label: boss.name, value: boss.id };
                    }),
                ];

                setOptions([...bossChoices]);
            }
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
                value={boss}
                onChange={(event, value) => {
                    loggerService.debug(
                        "Change Boss to: " + JSON.stringify(value),
                    );
                    setBoss(value);
                }}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                isOptionEqualToValue={(option, value) =>
                    option.label === value.label
                }
                getOptionLabel={(option) => option.label}
                options={options}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Boss"
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
