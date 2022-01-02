<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\JobRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Paneon\PhpToTypeScript\Annotation as PTS;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @PTS\TypeScriptInterface
 */
#[ORM\Entity(repositoryClass: JobRepository::class)]
#[ApiResource]
class Job
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    /** @PTS\Type("number") */
    private ?int $id;

    #[ORM\Column]
    #[Assert\NotBlank]
    public string $name;

    #[ORM\Column]
    #[Assert\NotBlank]
    public string $slug;

    #[ORM\OneToMany(mappedBy: 'job', targetEntity: Skill::class)]
    /**
     * @var Skill[]
     * @PTS\Type("string[]")
     */
    public iterable $skills;

    #[ORM\OneToMany(mappedBy: 'job', targetEntity: JobRotation::class, orphanRemoval: true)]
    /**
     * @var JobRotation[]
     * @PTS\Type("string[]")
     */
    private iterable $jobRotations;

    public function __construct()
    {
        $this->jobRotations = new ArrayCollection();
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
}
