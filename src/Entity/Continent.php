<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource]
#[ORM\Entity]
class Continent
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

    #[ORM\OneToMany(mappedBy: 'continent', targetEntity: Zone::class, cascade: ['persist', 'remove'])]
    /** @var Zone[] */
    public iterable $zones;

    public function __construct() {
        $this->zones = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }
}
