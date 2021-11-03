<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource]
#[ORM\Entity]
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

    #[ORM\ManyToOne]
    public ?Continent $continent = null;

    #[ORM\OneToMany(targetEntity: Stage::class, mappedBy: 'zone')]
    public iterable $stages;

    #[ORM\OneToMany(targetEntity: Stage::class, mappedBy: 'zone')]
    public iterable $partySetups;

    public function __construct()
    {
        $this->stages = new ArrayCollection();
        $this->partySetups = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }
}
