<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\API\Boss\GetPartySetupsForBossInZone;
use App\Enum\Element;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Mapping\CascadingStrategy;

#[ORM\Entity]
#[ApiResource(itemOperations: [
    'get',
    'get_party_setups' => [
        'method' => 'GET',
        'path' => '/bosses/{id}/party_setups.{_format}',
        'controller' => GetPartySetupsForBossInZone::class,
    ],
])]
class Boss
{
    #[ORM\Id]
    #[ORM\Column(type: 'integer')]
    #[ORM\GeneratedValue]
    #[Groups(['stage-list'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Assert\NotBlank]
    #[Groups(['stage-list'])]
    public string $name;

    #[ORM\Column]
    #[Groups(['stage-list'])]
    public int $primaryElement = Element::NONE;

    #[ORM\Column(nullable: true)]
    #[Groups(['stage-list'])]
    public int $secondaryElement = Element::NONE;

    #[ORM\OneToMany(mappedBy: 'boss', targetEntity: Stage::class, cascade: ['persist', 'remove'])]
    /** @var Stage[] */
    public iterable $stages;

    #[ORM\OneToMany(targetEntity: PartySetup::class, mappedBy: 'boss', cascade: ['persist', 'remove'])]
    /** @var PartySetup[] */
    public iterable $partySetups;

    public function __constructor()
    {
        $this->stages = new ArrayCollection();
        $this->partySetups = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }
}
