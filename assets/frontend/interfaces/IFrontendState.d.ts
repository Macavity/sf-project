import { ISkillDTO } from '../models/Skill';

interface IFrontendState {
    navigation: INavEntry[];
    skills: ISkillDTO[];
    isAdmin: boolean;
    userName: string|null;
    userAvatar: string|null;
}
