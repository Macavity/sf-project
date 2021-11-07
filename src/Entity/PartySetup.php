<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\PartySetupRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PartySetupRepository::class)]
#[ApiResource]
#[ApiFilter(SearchFilter::class, properties: ['id' => 'exact', 'boss' => 'exact'])]
class PartySetup
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id;

    #[ORM\Column]
    public ?int $stageLevel;

    #[ORM\ManyToOne(inversedBy: 'partySetups')]
    public Zone $zone;

    #[ORM\ManyToOne(cascade: ['persist','remove'], inversedBy: 'partySetups')]
    public Boss $boss;

    #[ORM\ManyToOne(cascade: ['persist','remove'], inversedBy: 'partySetups')]
    public ?Stage $stage = null;

    #[ORM\Embedded(class: EmbedRotation::class)]
    public EmbedRotation $gladiator;

    #[ORM\Embedded(class: EmbedRotation::class)]
    public EmbedRotation $warrior;

    #[ORM\Embedded(class: EmbedRotation::class)]
    public EmbedRotation $druid;

    #[ORM\Embedded(class: EmbedRotation::class)]
    public EmbedRotation $shaman;

    #[ORM\Embedded(class: EmbedRotation::class)]
    public EmbedRotation $assassin;

    #[ORM\Embedded(class: EmbedRotation::class)]
    public EmbedRotation $hunter;

    #[ORM\Embedded(class: EmbedRotation::class)]
    public EmbedRotation $mage;

    #[ORM\Embedded(class: EmbedRotation::class)]
    public EmbedRotation $warlock;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getScore(): int {
        return $this->zone->scoreStart + $this->stageLevel;
    }
}
