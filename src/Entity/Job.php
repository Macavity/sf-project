<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\JobRepository;
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

    public function getId(): ?int
    {
        return $this->id;
    }
}
