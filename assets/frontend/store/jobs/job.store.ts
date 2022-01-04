import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { IJob } from '../../interfaces/IJob';

export interface JobState extends EntityState<IJob, number> {
}

@StoreConfig({ name: 'job' })
export class JobStore extends EntityStore<JobState> {
}

export const jobStore = new JobStore();
