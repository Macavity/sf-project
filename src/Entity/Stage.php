<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Mapping\CascadingStrategy;

#[ApiResource(normalizationContext: ['groups' => 'stage-list'])]
#[ORM\Entity]
#[ApiFilter(SearchFilter::class, properties: ['id' => 'exact', 'zone' => 'exact'])]
class Stage
{
    #[ORM\Id, ORM\Column, ORM\GeneratedValue]
    #[Groups(['stage-list'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Assert\NotBlank]
    #[Groups(['stage-list'])]
    public int $level;

    #[ORM\ManyToOne(inversedBy: 'stages')]
    #[Groups(['stage-list'])]
    public Zone $zone;

    #[ORM\ManyToOne(inversedBy: 'stages')]
    #[Groups(['stage-list'])]
    public Boss $boss;

    #[ORM\OneToMany(mappedBy: 'stage', targetEntity: PartySetup::class)]
    public iterable $partySetups;

    public function __constructor()
    {
        $this->partySetups = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }
}
