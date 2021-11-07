import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { ElementTag } from 'assets/frontend/elements/ElementTag';
import { SkillRotationTags } from 'assets/frontend/elements/SkillRotationTags';
import { ElementType } from 'assets/frontend/enums/ElementType';
import { StagePartySetup } from 'assets/frontend/models/StagePartySetup';
import { SkillService, skillService } from '../../store/skills/skill.service';
import { ApiService } from '../../services/api.service';
import { StagePartySetupFactory } from 'assets/frontend/zones/stage-party-setup.factory';
import { appQuery } from '../../store/app.query';

type LocalProps = {
  stageId: number;
  stageLevel: number;
  zoneId: number;
  bossId: number;
  bossName: string;
  primaryCounterElement: ElementType|null;
  secondaryCounterElement: ElementType|null;
}

type LocalState = {
  stagePartySetups: StagePartySetup[];
}

export class StageRow extends Component<LocalProps, LocalState> {
  state = {
    stagePartySetups: [] as StagePartySetup[],
  };
  private skillService: SkillService;

  constructor(props: LocalProps) {
    super(props);
    this.skillService = skillService;
  }

  componentDidMount() {
    ApiService.getPartySetupsForStage(this.props.bossId, this.props.zoneId, this.props.stageLevel).then(
      setups => {
        const stagePartySetups = StagePartySetupFactory.createArray(setups);
        console.debug(`Party Setups loaded ${this.props.bossName}@${this.props.stageLevel}`, stagePartySetups);

        this.setState({
          stagePartySetups,
        })
      }
    )
  }

  getAdminCol(){
      if(appQuery.isAdmin()){
      return (
        <td>
          <NavLink className="btn btn-secondary btn-sm" to={`/admin#/stages/${this.props.stageId}`} target="_blank">Edit Stage</NavLink>&nbsp;
          <NavLink className="btn btn-secondary btn-sm" to={`/admin#/party_setups/${(this.state.stagePartySetups[0]?.id)}`} target="_blank">Edit Setup</NavLink>
        </td>
      );
    }

    return null;
  }

  render() {

    return (
      <tr className="el-table__row">
        <th scope="row">{this.props.stageLevel}</th>
        <td className="text-nowrap">
          <NavLink to={`/boss/${this.props.bossId}`}>{this.props.bossName}</NavLink>
        </td>
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
        {this.getAdminCol()}
      </tr>
    );
  }
}
