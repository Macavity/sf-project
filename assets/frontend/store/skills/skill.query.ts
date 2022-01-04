import { QueryEntity } from "@datorama/akita";
import { Skill } from "assets/frontend/models/Skill";
import { SkillState, skillStore, SkillStore } from "./skill.store";

export class SkillQuery extends QueryEntity<SkillState> {
    constructor(protected store: SkillStore) {
        super(store);
    }

    getByJob(jobId: number): Skill[] | null {
        return this.getAll().filter((skill) => skill.classType === jobId);
    }
}

export const skillQuery = new SkillQuery(skillStore);
