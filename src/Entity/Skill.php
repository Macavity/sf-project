<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\SkillRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SkillRepository::class)]
#[ApiResource]
class Skill
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private $id;

    #[ORM\Column]
    public string $name;

    #[ORM\Column]
    public string $shortName;

    #[ORM\ManyToOne]
    public Job $job;

    public function getId(): ?int
    {
        return $this->id;
    }
}
