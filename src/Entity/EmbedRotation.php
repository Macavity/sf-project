<?php declare(strict_types=1);

namespace App\Entity;

use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Embeddable;

#[Embeddable]
class EmbedRotation
{
    #[Column(nullable: true, options: ['default' => null])]
    public ?int $skill1 = null;

    #[Column(nullable: true, options: ['default' => null])]
    public ?int $skill2 = null;

    #[Column(nullable: true, options: ['default' => null])]
    public ?int $skill3 = null;

    #[Column(nullable: true, options: ['default' => null])]
    public ?int $skill4 = null;

    public function getSkillOnSlot(int $slot)
    {
        if ($slot === 1) {
            return $this->skill1;
        } elseif ($slot === 2) {
            return $this->skill2;
        } elseif ($slot === 3) {
            return $this->skill3;
        } else {
            return $this->skill4;
        }
    }

//    public function getSkill1(): string
//    {
//        return '/api/skills/' . $this->skill1;
//    }
//
//    public function getSkill2(): string
//    {
//        return '/api/skills/' . $this->skill2;
//    }
//
//    public function getSkill3(): string
//    {
//        return '/api/skills/' . $this->skill3;
//    }
//
//    public function getSkill4(): string
//    {
//        return '/api/skills/' . $this->skill4;
//    }
}
