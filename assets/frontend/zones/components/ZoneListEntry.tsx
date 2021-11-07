import { Component } from 'react';
import { zoneService } from '../zone.service';
import { NavLink } from 'react-router-dom';
import { Continent } from '../../models/Continent';
import { Zone } from '../../models/Zone';

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
      <div className="card">
        <div className="card-header">{this.props.continent.name}</div>
        <div className="card-body">
          {this.state.zones ? (
            <table className="table">
              <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Actions</th>
              </tr>
              </thead>
              <tbody>
              {this.state.zones.map((zone) => (
                <tr key={'zone-row-'+zone.key}>
                  <td>{zone.name}</td>
                  <td>
                    <NavLink className="btn btn-primary" to={`/zone/${zone.key}`}>Show</NavLink>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          ) : (
            <div>Loading</div>
          )}
        </div>
      </div>
    );
  }
}
