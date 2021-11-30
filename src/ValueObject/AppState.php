<?php declare(strict_types=1);

namespace App\ValueObject;

use App\Entity\Skill;

class AppState {
    public array $skills;

    /**
     * @param Skill[] $skills
     */
    public function __construct(
        array $skills,
        public bool $isAdmin,
    ) {
        $this->skills = [];

        foreach($skills as $skill){
            $this->skills[] = $skill->toArray();
        }
    }
}
