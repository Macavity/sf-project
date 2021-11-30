import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { IJobRotation } from './job-rotation.interface';

export interface JobRotationState extends EntityState<IJobRotation, number> {
}

@StoreConfig({ name: 'job_rotation' })
export class JobRotationStore extends EntityStore<JobRotationState> {

}

export const jobRotationStore = new JobRotationStore();
