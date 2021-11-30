<?php declare(strict_types=1);

namespace App\ValueObject;

use App\Entity\Skill;
use JetBrains\PhpStorm\ArrayShape;

class CountedSkill
{
    public function __construct(protected Skill $skill, protected $usage = 1)
    {

    }

    public function increaseUsage($by = 1)
    {
        $this->usage = $this->usage + $by;
    }

    public function getId(): int
    {
        return $this->skill->getId();
    }

    public function getUsage(): int
    {
        return $this->usage;
    }

    #[ArrayShape(['name' => "string", 'usage' => "int"])] public function toArray()
    {
        return [
           'name' => $this->skill->name,
            'usage' => $this->usage,
        ];
    }
}
