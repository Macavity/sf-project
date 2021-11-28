import { skillQuery, SkillQuery } from './skill.query';
import { skillStore, SkillStore } from './skill.store';
import { Skill } from '../../models/Skill';
import { Observable } from 'rxjs';
import { notEmpty } from '../../helpers/filter';
import { SkillRepository } from './skill.repository';


export class SkillService {
    constructor(private skillStore: SkillStore, private skillQuery: SkillQuery) {
    }

    initSkills() {
        //console.log('Init Skills');
        this.skillStore.setLoading(true);

        SkillRepository.findAll().then(skillsByJob => {
            this.skillStore.set(skillsByJob);

            //console.log('Set Skills', skillsByJob);

            this.skillStore.setLoading(false);
        });
    }

    find(skillId: number): Observable<Skill | undefined> {
        if (!this.skillQuery.hasEntity(skillId)) {
            console.log('Missing skill => Load');
            this.skillStore.setLoading(true);
            SkillRepository.find(skillId)
                .then((skill: Skill) => {
                    if (skill) {
                        this.skillStore.add(skill);
                    }
                    this.skillStore.setLoading(false);
                });
        }

        return this.skillQuery.selectEntity(skillId);
    }

    findSkillsByIds(skillIds: (number | null)[]): Observable<Skill[] | undefined> {
        // console.log('findSkillsByIds', skillIds.filter(notEmpty));
        return this.skillQuery.selectMany(skillIds.filter(notEmpty));
    }

    findMany(skillIds: number[]) {
        let missingSkills = [];

        for (const skillId of skillIds) {
            if (!this.skillQuery.hasEntity(skillId)) {
                missingSkills.push(skillId);
            }
        }

        if (missingSkills.length) {
            console.group('Load missing skills', missingSkills);
            SkillRepository.findMany(missingSkills)
                .then(skills => {
                    for (const skill of skills) {
                        this.skillStore.add(skill);
                        console.debug('=> Added',skill);
                    }
                    console.groupEnd();
                });
        }

        return this.skillQuery.selectMany(skillIds);
    }
}

export const skillService = new SkillService(skillStore, skillQuery);
