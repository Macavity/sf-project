<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Common\Filter\SearchFilterInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    order: ['position' => 'ASC'],
)]
#[ORM\Entity]
#[ApiFilter(SearchFilter::class,
    properties: [
        'continent' => SearchFilterInterface::STRATEGY_EXACT,
        'name' => SearchFilterInterface::STRATEGY_PARTIAL,
    ]
)]
class Zone
{
    #[ORM\Id]
    #[ORM\Column(type: 'integer')]
    #[ORM\GeneratedValue]
    private ?int $id = null;

    #[ORM\Column]
    #[Assert\NotBlank]
    public string $name = '';

    #[ORM\Column]
    #[Assert\NotBlank]
    public string $slug = '';

    #[ORM\Column(options: ['default' => 0])]
    public ?int $position = null;

    #[ORM\Column]
    public int $scoreStart = 0;

    #[ORM\Column]
    public int $stageCount = 1000;

    #[ORM\Column]
    public bool $isMystic = false;

    #[ORM\ManyToOne(inversedBy: 'zones')]
    public ?Continent $continent = null;

    #[ORM\OneToMany(mappedBy: 'zone', targetEntity: Stage::class)]
    public iterable $stages;

    #[ORM\OneToMany(mappedBy: 'zone', targetEntity: PartySetup::class)]
    public iterable $partySetups;

    public function __construct()
    {
        $this->stages = new ArrayCollection();
        $this->partySetups = new ArrayCollection();
    }

    public function __toString(): string
    {
        return $this->name;
    }

    public function getId(): ?int
    {
        return $this->id;
    }
}
