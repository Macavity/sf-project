import { ClassType } from '../enums/ClassType';
import { Component } from 'react';
import { SkillReference } from '../models/skill-reference';
import { skillService } from '../store/skills/skill.service';

type Props = {
  classType: ClassType;
  skill1: SkillReference;
  skill2: SkillReference;
  skill3: SkillReference;
  skill4: SkillReference;
};

type State = {
  skill1Name: string;
  skill2Name: string;
  skill3Name: string;
  skill4Name: string;
};

export class SkillRotationTags extends Component<Props, State> {

  jobClass = () => {
    switch (this.props.classType) {
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

    throw new Error('SkillRotationTags.jobClass - Not handled class ' + this.props.classType);
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      skill1Name: '',
      skill2Name: '',
      skill3Name: '',
      skill4Name: '',
    };
  }

  componentDidMount() {
    const skills = [
      this.props.skill1.id,
      this.props.skill2.id,
      this.props.skill3.id,
      this.props.skill4.id,
    ];

    skillService.findSkillsByIds(skills)
      .subscribe(skills => {
        if (skills) {
          this.setState({
            skill1Name: skills[0]?.shortName,
            skill2Name: skills[1]?.shortName,
            skill3Name: skills[2]?.shortName,
            skill4Name: skills[3]?.shortName,
          });
        }
      });
  }

  render() {
    const classes = 'badge m-1 ' + this.jobClass();
    return (
      <div className="skill-rotation">
        <span className={classes}>{this.state.skill1Name}</span><br />
        <span className={classes}>{this.state.skill2Name}</span><br />
        <span className={classes}>{this.state.skill3Name}</span><br />
        <span className={classes}>{this.state.skill4Name}</span>
      </div>
    );
  }
}
