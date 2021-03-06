import { Component } from 'react';
import { extractJobIdFromResourceId } from '../../enums/ClassType';
import { jobRotationService } from '../job-rotation.service';
import { jobRotationQuery } from '../job-rotation.query';
import { JobRotationFactory } from '../../party-setups/job-rotation.factory';
import { SkillTag } from './SkillTag';
import { Stack } from '@mui/material';

type Props = {
    iri: string;
};

type State = {
    job: number | null;
    id: number | null;
    skill1: string | null;
    skill2: string | null;
    skill3: string | null;
    skill4: string | null;
};

export class JobRotationTags extends Component<Props, State> {

    constructor(props: Props) {
        super(props);


        this.state = {
            job: null,
            id: JobRotationFactory.extractId(this.props.iri),
            skill1: null,
            skill2: null,
            skill3: null,
            skill4: null,
        };

        jobRotationService.fetch(this.props.iri);
    }

    componentDidMount() {
        if (this.state.id) {
            jobRotationQuery
                .selectEntity(this.state.id)
                .subscribe(jobRotation => {
                    if (jobRotation) {
                        this.setState({
                            job: extractJobIdFromResourceId(jobRotation.job),
                            skill1: jobRotation.skill1,
                            skill2: jobRotation.skill2,
                            skill3: jobRotation.skill3,
                            skill4: jobRotation.skill4,
                        });
                    }
                });
        }
    }

    render() {
        return (
            <Stack spacing={1} direction="column" sx={{mr: 1}}>
                {this.state.skill1 ? (<SkillTag iri={this.state.skill1}/>) : null}<br/>
                {this.state.skill2 ? (<SkillTag iri={this.state.skill2}/>) : null}<br/>
                {this.state.skill3 ? (<SkillTag iri={this.state.skill3}/>) : null}<br/>
                {this.state.skill4 ? (<SkillTag iri={this.state.skill4}/>) : null}
            </Stack>
        );
    }
}
