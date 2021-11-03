<?php declare(strict_types=1);

namespace App\Entity;

use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Embeddable;

#[Embeddable]
class EmbedRotation
{
    #[Column(nullable: true, options: ['default' => null])]
    public int $skill1;

    #[Column(nullable: true, options: ['default' => null])]
    public int $skill2;

    #[Column(nullable: true, options: ['default' => null])]
    public int $skill3;

    #[Column(nullable: true, options: ['default' => null])]
    public int $skill4;
}
