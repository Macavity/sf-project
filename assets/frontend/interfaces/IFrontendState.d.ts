import { IJobDTO, ISkillDTO } from '../models/Skill';

interface IFrontendState {
    navigation: INavEntry[];
    skills: ISkillDTO[];
    jobs: IJobDTO[];
    isAdmin: boolean;
    userName: string | null;
    userAvatar: string | null;
}
