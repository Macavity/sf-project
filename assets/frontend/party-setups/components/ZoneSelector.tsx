import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { loggerService } from "assets/frontend/services/logger.service";
import { zoneQuery } from "assets/frontend/zones/zone.query";
import { zoneService } from "assets/frontend/zones/zone.service";
import React from "react";

interface IZoneChoice {
  label: string;
  value: number;
}

export default function ZoneSelector() {
  const [zone, setZone] = React.useState<IZoneChoice | null>(null);
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([] as IZoneChoice[]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    zoneQuery.selectAll().subscribe((zones) => {
      if (zones && zones.length) {
        const zoneChoices = [
          ...zones.map((zone) => {
            return { label: zone.name, value: zone.id };
          }),
        ];

        setOptions([...zoneChoices]);
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
        value={zone}
        onChange={(event, value) => {
          loggerService.debug("Change Zone to: " + JSON.stringify(value));
          setZone(value);
        }}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option.label === value.label}
        getOptionLabel={(option) => option.label}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Zone"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
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
