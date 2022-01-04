import { Component } from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';

interface Props {
}

interface State {
}

export class CharacterList extends Component<Props, State> {
    render() {
        return (
            <div className="card">
                <Card>
                    <CardHeader title="My Characters"/>
                    <CardContent>
                        <p>In Progress</p>
                    </CardContent>
                </Card>
            </div>
        );
    }
}
