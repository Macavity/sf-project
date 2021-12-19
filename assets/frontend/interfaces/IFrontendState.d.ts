import {ISkillDTO} from '../models/Skill';

interface IFrontendState {
    navigation: INavEntry[];
    skills: ISkillDTO[];
    isUser: boolean;
    isAdmin: boolean;
    userName: string | null;
    userAvatar: string | null;
}
