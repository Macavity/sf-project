import { Component } from 'react';
import { ClassType, extractJobIdFromResourceId } from '../../enums/ClassType';
import { jobRotationService } from '../job-rotation.service';
import { jobRotationQuery } from '../job-rotation.query';
import { skillQuery } from '../../store/skills/skill.query';
import { JobRotationFactory } from '../../party-setups/job-rotation.factory';
import { extractJobRotationIdFromIRI } from '../job-rotation.interface';

type Props = {
    iri: string;
};

type State = {
    job: number | null;
    id: number | null;
    skill1Name: string;
    skill2Name: string;
    skill3Name: string;
    skill4Name: string;
    skillIds: number[];
};

export class JobRotationTags extends Component<Props, State> {

    jobClass = () => {
        if (!this.state.job) {
            return '';
        }
        switch (this.state.job) {
            case ClassType.Gladiator:
                return 'bg-gladiator';
            case ClassType.Warrior:
                return 'bg-warrior';
            case ClassType.Druid:
                return 'bg-druid';
            case ClassType.Shaman:
                return 'bg-shaman';
            case ClassType.Assassin:
                return 'bg-assassin';
            case ClassType.Hunter:
                return 'bg-hunter';
            case ClassType.Mage:
                return 'bg-mage';
        }

        throw new Error('SkillRotationTags.jobClass - Not handled class ' + this.state.job);
    };

    constructor(props: Props) {
        super(props);


        this.state = {
            job: null,
            id: JobRotationFactory.extractId(this.props.iri),
            skill1Name: 'Loading',
            skill2Name: 'Loading',
            skill3Name: 'Loading',
            skill4Name: 'Loading',
            skillIds: [],
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
                            skillIds: JobRotationFactory.extractSkillIds(jobRotation),
                        });

                        skillQuery.selectMany(this.state.skillIds)
                            .subscribe(skills => {
                                if (!skills || skills.length === 0) {
                                    return;
                                }
                                if (typeof skills[0]?.shortName !== 'string') {
                                    console.warn('Unexpected skill content', skills);
                                }

                                this.setState({
                                    skill1Name: skills[0]?.shortName,
                                    skill2Name: skills[1]?.shortName,
                                    skill3Name: skills[2]?.shortName,
                                    skill4Name: skills[3]?.shortName,
                                });
                            });
                    }
                });
        }
    }

    render() {
        const classes = 'badge m-1 ' + this.jobClass();
        return (
            <div className="skill-rotation">
                <span className={classes}>{this.state.skill1Name}</span><br/>
                <span className={classes}>{this.state.skill2Name}</span><br/>
                <span className={classes}>{this.state.skill3Name}</span><br/>
                <span className={classes}>{this.state.skill4Name}</span>
            </div>
        );
    }
}
