import { Component } from 'react';
import { ClassType } from '../../enums/ClassType';
import { skillQuery } from '../../store/skills/skill.query';
import { SkillFactory } from '../../store/skills/skill.factory';
import { skillService } from '../../store/skills/skill.service';
import { Chip } from '@mui/material';
import { SxProps } from '@mui/system';

type Props = {
    iri: string | null;
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

    getJobColor() {
        switch (this.state.job) {
            case ClassType.Gladiator:
                return 'crimson';
            case ClassType.Warrior:
                return '#f86e88';
            case ClassType.Druid:
                return 'green';
            case ClassType.Shaman:
                return '#0eba7e';
            case ClassType.Assassin:
                return 'gold';
            case ClassType.Hunter:
                return 'goldenrod';
            case ClassType.Mage:
                return '#1686d5';
        }
    }

    getStyles = () => {
        const styles: SxProps = {
            borderRadius: 1,
            m: 0,
            mb: 1,
            color: 'white',
            backgroundColor: this.getJobColor(),
        };

        return styles;
    };

    constructor(props: Props) {
        super(props);


        this.state = {
            job: null,
            id: SkillFactory.extractId(this.props.iri),
            shortName: '',
        };

        if (this.props.iri !== null) {
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
        return this.props.iri === null
            ? <Chip label="None" size="small"/>
            : (<Chip sx={this.getStyles()}
                     size="small"
                     label={this.state.shortName}/>);
    }
}
