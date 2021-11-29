import { Component } from 'react';
import { Continent } from '../../models/Continent';
import { continentQuery } from '../../continents/continent.query';
import { ZoneListEntry } from './ZoneListEntry';
import { continentService } from '../../continents/continent.service';
import { zoneService } from '../zone.service';
import { Grid } from '@mui/material';

interface Props {

}

type State = {
    continents: Continent[];
};

export class ZoneList extends Component<Props, State> {
    state = {
        continents: [] as Continent[],
    };

    constructor(props: Props) {
        super(props);

        continentService.fetchAllContinents();
        zoneService.fetchAllZones();

        this.state = {
            continents: [],
        };
    }

    componentDidMount() {
        continentQuery.selectAll()
            .subscribe(continents => {
                this.setState({ continents });
            });
    }

    render() {
        return (
            <Grid container spacing={2} sx={{
                p: {
                    xs: 0,
                    md: 2,
                }
            }}>
                {this.state.continents ? this.state.continents.map(continent => (
                    <Grid item xs={12} md={6} lg={3} key={'continent-col-' + continent.id}>
                        <ZoneListEntry key={continent.id} continent={continent}/>
                    </Grid>
                )) : null}
            </Grid>
        );
    }
}
