<?php

namespace App\Factory;

use App\Entity\EmbedRotation;
use App\Entity\Job;
use App\Entity\JobRotation;
use App\Repository\SkillRepository;

class JobRotationFactory
{
    public function __construct(private SkillRepository $skillRepository) { }

    public function createFromEmbeddedRotation(EmbedRotation $embedRotation, Job $job): JobRotation
    {
        $skills = [
            1 => null,
            2 => null,
            3 => null,
            4 => null,
        ];

        for ($i = 1; $i <= 4; $i++) {
            $skillOnSlot = $embedRotation->getSkillOnSlot($i);

            if ($skillOnSlot) {
                $skills[$i] = $this->skillRepository->find($skillOnSlot);
            }
        }

        $jobRotation = new JobRotation();
        $jobRotation->setJob($job);
        $jobRotation->setSkill1($skills[1]);
        $jobRotation->setSkill2($skills[2]);
        $jobRotation->setSkill3($skills[3]);
        $jobRotation->setSkill4($skills[4]);

        return $jobRotation;
    }
}
