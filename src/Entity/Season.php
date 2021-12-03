<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\SeasonRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SeasonRepository::class)]
#[ApiResource]
class Season
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'integer')]
    private int $number;

    #[ORM\ManyToOne(targetEntity: Region::class, inversedBy: 'seasons')]
    private Region $region;

    #[ORM\OneToMany(mappedBy: 'season', targetEntity: Character::class)]
    private $characters;

    #[ORM\Column(type: 'boolean', options: ['default' => false])]
    private bool $finished;

    public function __construct()
    {
        $this->characters = new ArrayCollection();
    }

    public function __toString(): string
    {
        return $this->region->getName() . ' ' . $this->number;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNumber(): ?int
    {
        return $this->number;
    }

    public function setNumber(int $number): self
    {
        $this->number = $number;

        return $this;
    }

    /**
     * @return Collection|Character[]
     */
    public function getCharacters(): Collection
    {
        return $this->characters;
    }

    public function addCharacter(Character $character): self
    {
        if (!$this->characters->contains($character)) {
            $this->characters[] = $character;
            $character->setSeason($this);
        }

        return $this;
    }

    public function removeCharacter(Character $character): self
    {
        if ($this->characters->removeElement($character)) {
            // set the owning side to null (unless already changed)
            if ($character->getSeason() === $this) {
                $character->setSeason(null);
            }
        }

        return $this;
    }

    public function getFinished(): ?bool
    {
        return $this->finished;
    }

    public function setFinished(bool $finished): self
    {
        $this->finished = $finished;

        return $this;
    }

    public function setRegion(Region $region): self
    {
        $this->region = $region;
        return $this;
    }

    public function getRegion(): Region
    {
        return $this->region;
    }
}
