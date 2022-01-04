import {IJobDTO, ISkillDTO } from '../models/Skill';

interface IFrontendState {
    navigation: INavEntry[];
    skills: ISkillDTO[];
    isUser: boolean;
    jobs: IJobDTO[];
    isAdmin: boolean;
    userName: string | null;
    userAvatar: string | null;
}
