<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\SkillRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SkillRepository::class)]
#[ApiFilter(SearchFilter::class, properties: ['id' => 'exact'])]
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

    #[ORM\ManyToOne(inversedBy: 'skills')]
    public Job $job;

    public function getId(): ?int
    {
        return $this->id;
    }
}
