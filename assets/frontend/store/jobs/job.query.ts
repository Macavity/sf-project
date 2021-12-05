import { QueryEntity } from '@datorama/akita';
import { JobState, JobStore, jobStore } from './job.store';

export class JobQuery extends QueryEntity<JobState> {
    constructor(protected store: JobStore) {
        super(store);
    }
}

export const jobQuery = new JobQuery(jobStore);
