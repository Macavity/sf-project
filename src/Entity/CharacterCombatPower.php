<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CharacterCombatPowerRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CharacterCombatPowerRepository::class)]
#[ApiResource]
class CharacterCombatPower
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\ManyToOne(targetEntity: Character::class, inversedBy: 'characterCombatPowers')]
    #[ORM\JoinColumn(nullable: false)]
    private $char;

    #[ORM\Column(type: 'integer')]
    private int $value;

    #[ORM\Column(type: 'datetime')]
    private $createdOn;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    private $createdBy;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOwner(): ?Character
    {
        return $this->owner;
    }

    public function setOwner(?Character $owner): self
    {
        $this->owner = $owner;

        return $this;
    }

    public function getValue(): ?int
    {
        return $this->value;
    }

    public function setValue(int $value): self
    {
        $this->value = $value;

        return $this;
    }

    public function getCreatedOn(): ?\DateTimeInterface
    {
        return $this->createdOn;
    }

    public function setCreatedOn(\DateTimeInterface $createdOn): self
    {
        $this->createdOn = $createdOn;

        return $this;
    }

    public function getCreatedBy(): ?User
    {
        return $this->createdBy;
    }

    public function setCreatedBy(?User $createdBy): self
    {
        $this->createdBy = $createdBy;

        return $this;
    }
}
