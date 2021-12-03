<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ProgressRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProgressRepository::class)]
#[ApiResource]
class Progress
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id;

    #[ORM\ManyToOne(targetEntity: Character::class, inversedBy: 'progress')]
    #[ORM\JoinColumn(nullable: false)]
    private Character $char;

    #[ORM\ManyToOne(targetEntity: Zone::class)]
    private Zone $zone;

    #[ORM\ManyToOne(targetEntity: Stage::class)]
    private Stage $stage;

    private int $score = 0;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOwner(): ?Character
    {
        return $this->owner;
    }

    public function setOwner(?Character $owner): self
    {
        $this->owner = $owner;

        return $this;
    }
}
