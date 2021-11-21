import { ApiService } from '../services/api.service';
import { IJobRotation } from './job-rotation.interface';

export class JobRotationRepository {
    public static findAll(): Promise<IJobRotation[]> {
        return ApiService
            .get<IJobRotation[]>('/job_rotations.json');
    }

    public static findByKey(id: number): Promise<IJobRotation> {
        return ApiService.get<IJobRotation>(`/job_rotations/${id}.json`);
    }
}
