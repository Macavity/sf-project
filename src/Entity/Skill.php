<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Common\Filter\SearchFilterInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\SkillRepository;
use Doctrine\DBAL\FetchMode;
use Doctrine\ORM\Mapping as ORM;
use JetBrains\PhpStorm\ArrayShape;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: SkillRepository::class)]
#[ApiFilter(SearchFilter::class, properties: [
    'id' => SearchFilterInterface::STRATEGY_EXACT,
    'job' => SearchFilterInterface::STRATEGY_EXACT,
    'name' => SearchFilterInterface::STRATEGY_PARTIAL
])]
#[ApiResource(
    attributes: [
        "pagination_items_per_page" => 200
    ],
    order: ['name' => 'ASC'],
)]
class Skill
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id;

    #[ORM\Column]
    public string $name;

    #[ORM\Column]
    public string $shortName;

    #[ORM\ManyToOne(fetch: 'EAGER', inversedBy: 'skills')]
    public Job $job;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLabel(): string
    {
        return $this->name . '(' . substr($this->job->name, 0, 1) . ')';
    }

    #[ArrayShape(['id' => "int|null", 'name' => "string", 'shortName' => "string", 'job' => "int|null"])] public function toArray(): array
    {
        return [
            'id' => $this->getId(),
            'name' => $this->name,
            'shortName' => $this->shortName,
            'job' => '/api/jobs/'.$this->job->getId(),
        ];
    }
}
