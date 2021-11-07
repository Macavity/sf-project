import { Boss } from '../../models/Boss';
import { Component } from 'react';
import { StagePartySetup } from '../../models/StagePartySetup';
import { bossService } from '../boss.service';
import { bossQuery } from '../boss.query';
import { PartySetupRow } from './PartySetupRow';
import { zoneService } from '../../zones/zone.service';


type LocalProps = {
  bossId: number;
}

type LocalState = {
  partySetups: StagePartySetup[];
  boss: Boss | null;
}

export class BossDetail extends Component<LocalProps, LocalState> {
  constructor(props: LocalProps) {
    super(props);

    bossService.loadBossWithPartySetups(this.props.bossId);

    this.state = {
      partySetups: [],
      boss: null,
    };
  }

  componentDidMount() {
    bossQuery.selectEntity(this.props.bossId)
      .subscribe((boss) => {
        if (boss) {
          console.log('BossQuery.subscribe: Entity set.');
          this.setState({
            boss,
            partySetups: boss.rotationList?.entries || [],
          });
          // TODO Load Zone
        }
      });
  }

  getEmptyRow() {
    if (this.state.boss && this.state.partySetups.length) {
      return null;
    }

    return (
      <tr>
        <td colSpan={8}>No Data saved yet.</td>
      </tr>
    );
  }

  render() {
    const setups = this.state.partySetups;

    console.log(setups);

    if (!this.state.boss) {
      return (
        <div>Loading.</div>
      );
    }

    const boss = this.state.boss;

    return (
      <div className="container-fluid">
        <div className="card">
          <div className="card-header">{this.state.boss?.name || 'Loading..'}</div>
          <div className="card-body">
            <table className="table table-hover table-striped">
              <thead>
              <tr>
                <th scope="col">Area</th>
                <th scope="col">Level</th>
                <th scope="col" colSpan={2}>Pet Elements</th>
                <th scope="col" colSpan={4}>Party</th>
              </tr>
              </thead>
              <tbody>
              {this.getEmptyRow()}
              {setups.map((setup, i) => {
                return (
                  <PartySetupRow key={setup.zoneId + '-' + i}
                                 stageLevel={setup.stage}
                                 zoneId={setup.zoneId}
                                 bossName={boss.name}
                                 bossId={boss.id}
                                 primaryCounterElement={boss.primaryCounter}
                                 secondaryCounterElement={boss.secondaryCounter}
                  />
                );
              })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
