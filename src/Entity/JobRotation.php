<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Common\Filter\SearchFilterInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\JobRotationRepository;
use Doctrine\ORM\Mapping as ORM;
use Paneon\PhpToTypeScript\Annotation\TypeScriptInterface;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @TypeScriptInterface
 */
#[ORM\Entity(repositoryClass: JobRotationRepository::class)]
#[ORM\UniqueConstraint(name: 'skill_combination', columns: [
    'skill1_id',
    'skill2_id',
    'skill3_id',
    'skill4_id',
])]
#[ApiFilter(SearchFilter::class, properties: [
    'id' => SearchFilterInterface::STRATEGY_EXACT,
    'job' => SearchFilterInterface::STRATEGY_EXACT,
    'skill1' => SearchFilterInterface::STRATEGY_EXACT,
    'skill2' => SearchFilterInterface::STRATEGY_EXACT,
    'skill3' => SearchFilterInterface::STRATEGY_EXACT,
    'skill4' => SearchFilterInterface::STRATEGY_EXACT,
])]
#[ApiFilter(OrderFilter::class, properties: ['id', 'skill1.name', 'skill2.name', 'skill3.name', 'skill4.name', 'slug'])]
#[ApiResource(
    paginationItemsPerPage: 100,
)]
class JobRotation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Job::class, inversedBy: 'jobRotations')]
    #[ORM\JoinColumn(nullable: false)]
    private Job $job;

    #[ORM\Column(type: 'text', nullable: true)]
    private ?string $description = null;

    #[ORM\ManyToOne(targetEntity: Skill::class)]
    #[Groups('partySetup')]
    private ?Skill $skill1 = null;

    #[ORM\ManyToOne(targetEntity: Skill::class)]
    #[Groups('partySetup')]
    private ?Skill $skill2 = null;

    #[ORM\ManyToOne(targetEntity: Skill::class)]
    #[Groups('partySetup')]
    private ?Skill $skill3 = null;

    #[ORM\ManyToOne(targetEntity: Skill::class)]
    #[Groups('partySetup')]
    private ?Skill $skill4 = null;

    #[Groups('partySetup')]
    public function getSlug(): string
    {
        $skillNames = [];
        for ($i = 1; $i <= 4; $i++) {
            $skillOnSlot = $this->getSkillOnSlot($i);
            if ($skillOnSlot === null) {
                $skillNames[] = 'None';
            } else {
                $skillNames[] = $skillOnSlot->shortName;
            }
        }

        return join(" ", $skillNames);
    }

    public function getSkillOnSlot(int $slot): ?Skill
    {
        if ($slot === 1) {
            return $this->skill1;
        } elseif ($slot === 2) {
            return $this->skill2;
        } elseif ($slot === 3) {
            return $this->skill3;
        } else {
            return $this->skill4;
        }
    }

    public function __toString(): string
    {
        return $this->getSlug();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getJob(): ?Job
    {
        return $this->job;
    }

    public function setJob(?Job $job): self
    {
        $this->job = $job;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getSkill1(): ?Skill
    {
        return $this->skill1;
    }

    public function setSkill1(?Skill $skill1): self
    {
        $this->skill1 = $skill1;

        return $this;
    }

    public function getSkill2(): ?Skill
    {
        return $this->skill2;
    }

    public function setSkill2(?Skill $skill2): self
    {
        $this->skill2 = $skill2;

        return $this;
    }

    public function getSkill3(): ?Skill
    {
        return $this->skill3;
    }

    public function setSkill3(?Skill $skill3): self
    {
        $this->skill3 = $skill3;

        return $this;
    }

    public function getSkill4(): ?Skill
    {
        return $this->skill4;
    }

    public function setSkill4(?Skill $skill4): self
    {
        $this->skill4 = $skill4;

        return $this;
    }
}
