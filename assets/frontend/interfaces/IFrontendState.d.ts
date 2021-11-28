import { ISkillDTO } from '../models/Skill';

interface IFrontendState {
    skills: ISkillDTO[];
    isAdmin: boolean;
}
