import { Component } from 'react';
import { zoneService } from '../zone.service';
import { Continent } from '../../models/Continent';
import { Zone } from '../../models/Zone';
import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material';

type MyProps = {
    continent: Continent;
};

type MyState = {
    zones: Zone[];
};

export class ZoneListEntry extends Component<MyProps, MyState> {
    state: MyState = {
        zones: [],
    };

    constructor(props: MyProps) {
        super(props);

        this.state = {
            zones: [],
        };
    }

    componentDidMount() {
        zoneService
            .findZonesForContinent(this.props.continent.resourceId)
            .subscribe(zones => {
                this.setState({ zones });
            });
    }

    render() {
        return (
            <Card variant="outlined">
                <CardHeader title={this.props.continent.name}/>
                <CardContent>
                    {this.state.zones ? (
                        <Grid container>
                            {this.state.zones.map((zone) => (
                                <Grid item xs={12} key={'zone-row-' + zone.key} sx={{m:1}}>
                                    <Button variant="contained" size="medium" href={`/zone/${zone.key}`}>
                                        {zone.name}
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    ) : null}
                </CardContent>
            </Card>
        );
    }
}
