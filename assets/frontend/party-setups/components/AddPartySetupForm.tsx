import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { bossService } from '../../bosses/boss.service';
import { bossQuery } from '../../bosses/boss.query';
import { Boss } from '../../models/Boss';

const allBosses = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
];

interface Props {

}

interface State {
    bosses: Boss[],
}

export class AddPartySetupForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        bossService.initBosses();
    }

    componentDidMount() {
        bossQuery.selectAll().subscribe(bosses => {
            if (bosses && bosses.length) {
                this.setState({
                    bosses,
                });
            }
        });
    }

    render() {
        return (
            <div className="add-setup-form">
                <Autocomplete
                    disablePortal
                    options={allBosses}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Boss"/>}
                />
            </div>
        );
    }
}
