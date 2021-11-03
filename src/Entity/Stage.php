<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Mapping\CascadingStrategy;

#[ApiResource]
#[ORM\Entity]
class Stage
{
    #[ORM\Id, ORM\Column, ORM\GeneratedValue]
    private ?int $id = null;

    #[ORM\Column]
    #[Assert\NotBlank]
    public int $level;

    #[ORM\ManyToOne]
    public Zone $zone;

    #[ORM\ManyToOne]
    public Boss $boss;

    public function __constructor()
    {
        $this->partySetups = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }
}
