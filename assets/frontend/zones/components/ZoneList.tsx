import { Component } from 'react';
import { Continent } from '../../models/Continent';
import { continentQuery } from '../../continents/continent.query';
import { ZoneListEntry } from './ZoneListEntry';
import { continentService } from '../../continents/continent.service';
import { zoneService } from '../zone.service';

type Props = {};
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
      <div className="container-fluid">
        <div className="row">
          {this.state.continents ? this.state.continents.map(continent => (
            <div className="col" key={'continent-col-'+continent.id}>
              <ZoneListEntry key={continent.id} continent={continent} />
            </div>
          )) : null}
        </div>
      </div>
    );
  }
}
