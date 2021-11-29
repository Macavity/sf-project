import { Component } from 'react';
import { Link } from 'react-router-dom';
import { ElementTag } from '../../elements/ElementTag';
import { bossQuery } from '../boss.query';
import { bossService } from '../boss.service';
import { Boss } from '../../models/Boss';
import {
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Container,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@mui/material';

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
                <Card>
                    <CardHeader title="Boss List"/>
                    <CardContent>
                        {this.state.isLoading ? (
                            <Container>
                                <strong>Loading...</strong><br/>
                                <CircularProgress/>
                            </Container>
                        ) : (
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Boss</TableCell>
                                        <TableCell colSpan={2}>Pet Elements</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {bosses.map((boss, n) => (
                                        <TableRow key={`boss-row-${n}`}>
                                            <TableCell>
                                                <Link to={`/boss/${boss.id}`}>{boss.name}</Link>
                                            </TableCell>
                                            <TableCell width="50">
                                                {boss.primaryElement ? (
                                                    <ElementTag element={boss.primaryElement}/>) : null}
                                            </TableCell>
                                            <TableCell width="50">
                                                {boss.secondaryElement ? (
                                                    <ElementTag element={boss.secondaryElement}/>) : null}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
                <div className="card">
                    <div className="card-header">Boss List</div>
                    <div className="card-body">

                    </div>
                </div>
            </div>
        );
    }
}

