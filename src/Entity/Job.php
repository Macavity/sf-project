<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\JobRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: JobRepository::class)]
#[ApiResource]
class Job
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id;

    #[ORM\Column]
    #[Assert\NotBlank]
    public string $name;

    #[ORM\Column]
    #[Assert\NotBlank]
    public string $slug;

    #[ORM\OneToMany(mappedBy: 'job', targetEntity: Skill::class)]
    /** @var Skill[] */
    public iterable $skills;

    #[ORM\OneToMany(mappedBy: 'job', targetEntity: JobRotation::class, orphanRemoval: true)]
    private $jobRotations;

    #[ORM\OneToMany(mappedBy: 'job', targetEntity: Character::class)]
    private $characters;

    public function __construct()
    {
        $this->jobRotations = new ArrayCollection();
        $this->characters = new ArrayCollection();
    }

    public function __toString(): string
    {
        return $this->name;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection|JobRotation[]
     */
    public function getJobRotations(): Collection
    {
        return $this->jobRotations;
    }

    public function addJobRotation(JobRotation $jobRotation): self
    {
        if (!$this->jobRotations->contains($jobRotation)) {
            $this->jobRotations[] = $jobRotation;
            $jobRotation->setJob($this);
        }

        return $this;
    }

    public function removeJobRotation(JobRotation $jobRotation): self
    {
        if ($this->jobRotations->removeElement($jobRotation)) {
            // set the owning side to null (unless already changed)
            if ($jobRotation->getJob() === $this) {
                $jobRotation->setJob(null);
            }
        }

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
            $character->setJob($this);
        }

        return $this;
    }

    public function removeCharacter(Character $character): self
    {
        if ($this->characters->removeElement($character)) {
            // set the owning side to null (unless already changed)
            if ($character->getJob() === $this) {
                $character->setJob(null);
            }
        }

        return $this;
    }
}
