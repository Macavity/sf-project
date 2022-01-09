<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Enum\JobType as JobType;
use App\Repository\PartySetupRepository;
use Doctrine\ORM\Mapping as ORM;
use Exception;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: PartySetupRepository::class)]
#[ApiResource()]
#[ApiFilter(OrderFilter::class, properties: [
    'slug.name' => 'ASC',
])]
#[ApiFilter(SearchFilter::class, properties: [
    'id' => 'exact',
    'boss' => 'exact',
    'zone' => 'exact',
])]
class PartySetup
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id;

    #[ORM\Column(nullable: true)]
    public ?int $stageLevel = null;

    #[ORM\ManyToOne(inversedBy: 'partySetups')]
    private ?Zone $zone = null;

    #[ORM\ManyToOne(cascade: ['persist'], inversedBy: 'partySetups')]
    public Boss $boss;

    #[ORM\ManyToOne(cascade: ['persist'], inversedBy: 'partySetups')]
    public ?Stage $stage = null;

    #[ORM\ManyToOne(cascade: ['persist'])]
    public ?JobRotation $gladiatorRotation = null;

    #[ORM\ManyToOne(cascade: ['persist'])]
    public ?JobRotation $warriorRotation = null;

    #[ORM\ManyToOne(cascade: ['persist'])]
    public ?JobRotation $druidRotation = null;

    #[ORM\ManyToOne(cascade: ['persist'])]
    public ?JobRotation $shamanRotation = null;

    #[ORM\ManyToOne(cascade: ['persist'])]
    public ?JobRotation $assassinRotation = null;

    #[ORM\ManyToOne(cascade: ['persist'])]
    public ?JobRotation $hunterRotation = null;

    #[ORM\ManyToOne(cascade: ['persist'])]
    public ?JobRotation $warlockRotation = null;

    #[ORM\ManyToOne(cascade: ['persist'])]
    public ?JobRotation $mageRotation = null;

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

    public function getScore(): int
    {
        if (!$this->zone) {
            return 0;
        }

        return $this->zone->scoreStart + $this->stageLevel;
    }

    public function getEmbedByJobId(int $jobType): ?EmbedRotation
    {
        switch ($jobType) {
            case JobType::GLADIATOR:
                return $this->gladiator;
            case JobType::WARRIOR:
                return $this->warrior;
            case JobType::DRUID:
                return $this->druid;
            case JobType::SHAMAN:
                return $this->shaman;
            case JobType::ASSASSIN:
                return $this->assassin;
            case JobType::WARLOCK:
                return $this->warlock;
            case JobType::HUNTER:
                return $this->hunter;
            case JobType::MAGE:
                return $this->mage;
        }

        throw new Exception('Unrecognized job type');
    }

    public function getRotationByJobType(int $jobType): ?JobRotation
    {
        switch ($jobType) {
            case JobType::GLADIATOR:
                return $this->gladiatorRotation;
            case JobType::WARRIOR:
                return $this->warriorRotation;
            case JobType::DRUID:
                return $this->druidRotation;
            case JobType::SHAMAN:
                return $this->shamanRotation;
            case JobType::ASSASSIN:
                return $this->assassinRotation;
            case JobType::WARLOCK:
                return $this->warlockRotation;
            case JobType::HUNTER:
                return $this->hunterRotation;
            case JobType::MAGE:
                return $this->mageRotation;
        }

        throw new Exception('Unrecognized job type');
    }

    public function getZone(): ?Zone
    {
        return $this->zone;
    }

    public function setZone(?Zone $zone): void
    {
        $this->zone = $zone;
    }
}
