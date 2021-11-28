import { Component } from 'react';
import { ClassType } from '../../enums/ClassType';
import { skillQuery } from '../../store/skills/skill.query';
import { SkillFactory } from '../../store/skills/skill.factory';
import { skillService } from '../../store/skills/skill.service';

type Props = {
    iri: string|null;
};

type State = {
    job: number | null;
    id: number;
    shortName: string;
};

export class SkillTag extends Component<Props, State> {

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

        throw new Error('SkillTag.jobClass - Not handled class ' + this.state.job);
    };

    constructor(props: Props) {
        super(props);


        this.state = {
            job: null,
            id: SkillFactory.extractId(this.props.iri),
            shortName: '',
        };

        if(this.props.iri !== null){
            skillService.find(this.state.id);
        }
    }

    componentDidMount() {
        skillService.find(this.state.id);
        skillQuery
            .selectEntity(this.state.id)
            .subscribe(skill => {
                if (skill) {
                    this.setState({
                        job: skill.classType,
                        shortName: skill.shortName
                    });
                }
            });
    }

    render() {
        const classes = 'badge m-1 ' + this.jobClass();
        return this.props.iri === null
            ? null
            : (<span className={classes}>{this.state.shortName}</span>);
    }
}
