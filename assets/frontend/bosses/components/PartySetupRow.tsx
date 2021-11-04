import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { ElementTag } from 'assets/frontend/elements/ElementTag';
import { SkillRotationTags } from 'assets/frontend/elements/SkillRotationTags';
import { ElementType } from 'assets/frontend/enums/ElementType';
import { StagePartySetup } from 'assets/frontend/models/StagePartySetup';
import { SkillService, skillService } from '../../store/skills/skill.service';
import { ApiService } from '../../services/api.service';
import { StagePartySetupFactory } from '../../factories/StagePartySetupFactory';
import { Zone } from '../../models/Zone';

type LocalProps = {
  stageLevel: number;
  zone: Zone;
  bossId: number;
  bossName: string;
  primaryCounterElement: ElementType|null;
  secondaryCounterElement: ElementType|null;
}

type LocalState = {
  stagePartySetups: StagePartySetup[];
}

export class PartySetupRow extends Component<LocalProps, LocalState> {
  state = {
    stagePartySetups: [] as StagePartySetup[],
  };
  private skillService: SkillService;

  constructor(props: LocalProps) {
    super(props);
    this.skillService = skillService;
  }

  componentDidMount() {
    ApiService.getPartySetupsForStage(this.props.bossId, this.props.zone.id, this.props.stageLevel).then(
      setups => {
        const stagePartySetups = StagePartySetupFactory.createArray(setups);

        this.setState({
          stagePartySetups,
        })
      }
    )
  }

  render() {

    return (
      <tr className="el-table__row">
        <th scope="row">
          <NavLink to={`/zone/${this.props.zone.id}`}>{this.props.zone.name}</NavLink>
        </th>
        <th scope="row">{this.props.stageLevel}</th>
        <td width="50">
          <ElementTag element={this.props.primaryCounterElement} key={this.props.stageLevel + '-element-1'} />
        </td>
        <td width="50">
          <ElementTag element={this.props.secondaryCounterElement} key={this.props.stageLevel + '-element-2'} />
        </td>
        <td colSpan={4}>
          {this.state.stagePartySetups.map((stagePartySetup, i) => (
            <div className="stage-party-setup" key={this.props.stageLevel + '-' + i}>
              {stagePartySetup.getOrderedSkillRotations().map((skillRotation, j) => (
                <SkillRotationTags key={this.props.stageLevel + '-skill-rota-' + j}
                                   classType={skillRotation.classType}
                                   skill1={skillRotation.skill1}
                                   skill2={skillRotation.skill2}
                                   skill3={skillRotation.skill3}
                                   skill4={skillRotation.skill4}
                />
              ))}
            </div>
          ))}
        </td>
      </tr>
    );
  }
}
