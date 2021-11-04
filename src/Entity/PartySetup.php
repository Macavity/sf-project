<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\PartySetupRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PartySetupRepository::class)]
#[ApiResource]
class PartySetup
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id;

    #[ORM\Column]
    public ?int $stageLevel;

    #[ORM\ManyToOne]
    public Zone $zone;

    #[ORM\ManyToOne(inversedBy: 'partySetups')]
    public Boss $boss;

    #[ORM\Embedded(class: EmbedRotation::class)]
    public $gladiator;

    #[ORM\Embedded(class: EmbedRotation::class)]
    public $warrior;

    #[ORM\Embedded(class: EmbedRotation::class)]
    public $druid;

    #[ORM\Embedded(class: EmbedRotation::class)]
    public $shaman;

    #[ORM\Embedded(class: EmbedRotation::class)]
    public $assassin;

    #[ORM\Embedded(class: EmbedRotation::class)]
    public $hunter;

    #[ORM\Embedded(class: EmbedRotation::class)]
    public $mage;

    #[ORM\Embedded(class: EmbedRotation::class)]
    public $warlock;

    public function getId(): ?int
    {
        return $this->id;
    }
}
