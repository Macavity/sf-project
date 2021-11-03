<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Enum\Element;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Mapping\CascadingStrategy;

#[ApiResource]
#[ORM\Entity]
class Boss
{
    #[ORM\Id]
    #[ORM\Column(type: 'integer')]
    #[ORM\GeneratedValue]
    private ?int $id = null;

    #[ORM\Column]
    #[Assert\NotBlank]
    public string $name;

    #[ORM\Column]
    public int $primaryElement = Element::NONE;

    #[ORM\Column(nullable: true)]
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
