<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CharacterCombatPowerRepository;
use DateTime;
use DateTimeInterface;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CharacterCombatPowerRepository::class)]
#[ApiResource]
#[ORM\HasLifecycleCallbacks]
class CharacterCombatPower
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private int $id;

    #[ORM\ManyToOne(targetEntity: Character::class, inversedBy: 'characterCombatPowers')]
    #[ORM\JoinColumn(nullable: false)]
    private Character $char;

    #[ORM\Column(type: 'integer')]
    private int $value;

    #[ORM\Column(type: 'datetime', nullable: false)]
    private ?DateTimeInterface $createdAt;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $createdBy;

    #[ORM\PrePersist]
    public function prePersist(): void
    {
        $dateTimeNow = new DateTime('now');

        $this->setCreatedAt($dateTimeNow);
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCharacter(): ?Character
    {
        return $this->char;
    }

    public function setCharacter(?Character $owner): self
    {
        $this->char = $owner;

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

    public function getCreatedAt(): ?DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

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
