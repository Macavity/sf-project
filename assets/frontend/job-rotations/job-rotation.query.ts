import { QueryEntity } from '@datorama/akita';
import { JobRotationState, JobRotationStore, jobRotationStore } from './job-rotation.store';

export class JobRotationQuery extends QueryEntity<JobRotationState> {
    constructor(protected store: JobRotationStore) {
        super(store);
    }
}

export const jobRotationQuery = new JobRotationQuery(jobRotationStore);
