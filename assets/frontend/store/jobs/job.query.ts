import { QueryEntity } from "@datorama/akita";
import { loggerService } from "assets/frontend/services/logger.service";
import { JobState, JobStore, jobStore } from "./job.store";

export class JobQuery extends QueryEntity<JobState> {
    constructor(protected store: JobStore) {
        super(store);
    }

    getByName(name: string): IJob | null {
        const results = this.getAll().filter((entity) => entity.name === name);

        if (results.length) {
            return results[0];
        }

        loggerService.error(`JobQuery.getByName(${name}) returned no result.`);

        return null;
    }
}

export const jobQuery = new JobQuery(jobStore);
