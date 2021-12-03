<?php declare(strict_types=1);

namespace App\Entity;

use App\Repository\CharacterRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CharacterRepository::class)]
#[ORM\Table(name: '`character`')]
class Character
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private int $id;

    #[ORM\Column(type: 'string')]
    private string $name;

    #[ORM\ManyToOne(targetEntity: Job::class, inversedBy: 'characters')]
    #[ORM\JoinColumn(nullable: false)]
    private Job $job;

    #[ORM\ManyToOne(targetEntity: Party::class, inversedBy: 'members')]
    private Party $party;

    #[ORM\ManyToOne(targetEntity: User::class)]
    private ?User $owner;

    #[ORM\ManyToOne(targetEntity: User::class)]
    private ?User $createdBy;

    #[ORM\ManyToOne(targetEntity: Season::class, inversedBy: 'characters')]
    private ?Season $season;

    #[ORM\OneToMany(mappedBy: 'char', targetEntity: CharacterCombatPower::class, orphanRemoval: true)]
    private $characterCombatPowers;

    #[ORM\OneToMany(mappedBy: 'char', targetEntity: Progress::class, orphanRemoval: true)]
    private $progress;

    public function __construct()
    {
        $this->characterCombatPowers = new ArrayCollection();
        $this->progress = new ArrayCollection();
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

    public function getParty(): ?Party
    {
        return $this->party;
    }

    public function setParty(?Party $party): self
    {
        $this->party = $party;

        return $this;
    }

    public function setName(string $name): Character
    {
        $this->name = $name;
        return $this;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getSeason(): ?Season
    {
        return $this->season;
    }

    public function setSeason(?Season $season): self
    {
        $this->season = $season;

        return $this;
    }

    public function getCharacterCombatPowers(): Collection
    {
        return $this->characterCombatPowers;
    }

    public function addCharacterCombatPower(CharacterCombatPower $characterCombatPower): self
    {
        if (!$this->characterCombatPowers->contains($characterCombatPower)) {
            $this->characterCombatPowers[] = $characterCombatPower;
            $characterCombatPower->setOwner($this);
        }

        return $this;
    }

    public function removeCharacterCombatPower(CharacterCombatPower $characterCombatPower): self
    {
        if ($this->characterCombatPowers->removeElement($characterCombatPower)) {
            // set the owning side to null (unless already changed)
            if ($characterCombatPower->getOwner() === $this) {
                $characterCombatPower->setOwner(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Progress[]
     */
    public function getProgress(): Collection
    {
        return $this->progress;
    }

    public function addProgress(Progress $progress): self
    {
        if (!$this->progress->contains($progress)) {
            $this->progress[] = $progress;
            $progress->setOwner($this);
        }

        return $this;
    }

    public function removeProgress(Progress $progress): self
    {
        if ($this->progress->removeElement($progress)) {
            // set the owning side to null (unless already changed)
            if ($progress->getOwner() === $this) {
                $progress->setOwner(null);
            }
        }

        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): self
    {
        $this->owner = $owner;

        return $this;
    }

    public function setCharacterCombatPowers(ArrayCollection $characterCombatPowers): Character
    {
        $this->characterCombatPowers = $characterCombatPowers;
        return $this;
    }

    public function getCreatedBy(): ?User
    {
        return $this->createdBy;
    }

    public function setCreatedBy(?User $createdBy): Character
    {
        $this->createdBy = $createdBy;
        return $this;
    }
}
