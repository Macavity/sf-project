import { loggerService } from '../../services/logger.service';
import { jobStore, JobStore } from './job.store';
import { jobQuery, JobQuery } from './job.query';
import { frontendState } from '../../services/fe-state.service';


export class JobService {
    constructor(private store: JobStore, private query: JobQuery) {
    }

    initJobs() {
        if (this.store.getValue()?.ids?.length) {
            loggerService.debug('Jobs already initialized');
            return;
        }

        this.store.setLoading(true);
        this.store.set(frontendState.jobs);
        this.store.setLoading(false);
        loggerService.debug('✅ Initialized all Jobs');
    }
}

export const jobService = new JobService(jobStore, jobQuery);
