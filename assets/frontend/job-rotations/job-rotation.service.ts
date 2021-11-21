import { jobRotationStore, JobRotationStore } from './job-rotation.store';
import { jobRotationQuery, JobRotationQuery } from './job-rotation.query';
import { JobRotationRepository } from './job-rotation.repository';
import { extractJobRotationIdFromIRI } from './job-rotation.interface';


class JobRotationService {
    constructor(private store: JobRotationStore, private query: JobRotationQuery) {
    }

    fetch(iri: string) {
        const id = extractJobRotationIdFromIRI(iri);
        this.store.setLoading(true);
        JobRotationRepository.findByKey(id)
            .then((rotation) => {
                this.store.add(rotation);
                this.store.setLoading(false);
            });
    }
}

export const jobRotationService = new JobRotationService(jobRotationStore, jobRotationQuery);
