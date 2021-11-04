import { Component } from 'react';
import { Link } from 'react-router-dom';
import { ElementTag } from '../../elements/ElementTag';
import { bossQuery } from '../boss.query';
import { bossService } from '../boss.service';
import { Boss } from '../../models/Boss';

interface Props {

}

interface State {
  bosses: Boss[];
  isLoading: boolean;
}

export class BossList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    bossService.initBosses();
    this.state = {
      bosses: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    console.group('BossList.componentDidMount');
    bossQuery.selectAll()
      .subscribe(bosses => {
        console.log('bosses', bosses);
        this.setState({ bosses });
        this.setState({ isLoading: false });
        console.groupEnd();
      });
  }

  render() {
    const bosses = this.state.bosses;

    return (
      <div className="container-fluid">
        <div className="card">
          <div className="card-header">Boss List</div>
          <div className="card-body">
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Filter" aria-label="Filter" />
            </form>
            {this.state.isLoading ? (
              <div className="d-flex align-items-center">
                <strong>Loading...</strong>
                <div className="spinner-border ms-auto" role="status" aria-hidden="true" />
              </div>
            ) : null}
            <table className="table">
              <thead>
              <tr>
                <th scope="col">Boss</th>
                <th scope="col" colSpan={2}>Pet Elements</th>
              </tr>
              </thead>
              <tbody>
              {bosses.map(boss => (
                <tr className="el-table__row">
                  <td className="text-nowrap">
                    <Link to={""}>{boss.name}</Link>
                  </td>
                  <td width="50">
                    {boss.primaryElement ? (<ElementTag element={boss.primaryElement} />) : null}
                  </td>
                  <td width="50">
                    {boss.secondaryElement ? (<ElementTag element={boss.secondaryElement} />) : null}
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

