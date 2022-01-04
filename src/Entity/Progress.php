<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ProgressRepository;
use DateTime;
use DateTimeInterface;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProgressRepository::class)]
#[ApiResource]
class Progress
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id;

    #[ORM\ManyToOne(targetEntity: Character::class, inversedBy: 'progress')]
    #[ORM\JoinColumn(nullable: false)]
    private Character $char;

    #[ORM\ManyToOne(targetEntity: Zone::class)]
    private Zone $zone;

    #[ORM\Column(nullable: false)]
    private int $levelInZone;

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

    public function getScore(): int
    {
        return $this->zone->scoreStart + $this->levelInZone;
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

    public function setProgress(Zone $zone, int $level): self
    {
        $this->zone = $zone;
        $this->levelInZone = $level;

        return $this;
    }

    public function setCreatedAt(?DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;
        return $this;
    }

    public function getCreatedAt(): ?DateTimeInterface
    {
        return $this->createdAt;
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
