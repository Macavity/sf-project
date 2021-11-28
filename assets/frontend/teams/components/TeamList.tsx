import { Component } from 'react';
import { Link } from 'react-router-dom';
import { ElementTag } from '../../elements/ElementTag';
import { CircularProgress } from '@mui/material';

interface Props {}
interface State {
    isLoading: boolean;
}

export class TeamList extends Component<Props, State>{
    componentDidMount() {

    }

    render(){
        return (
            <div className="card">
                <div className="card-header">My Teams</div>
                <div className="card-body">
                    {this.state.isLoading ? (
                        <div className="d-flex align-items-center">
                            <CircularProgress/>
                        </div>
                    ) : null}
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Leader</th>
                            <th scope="col" colSpan={3}>Members</th>
                            <th>&nbsp;</th>
                        </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
