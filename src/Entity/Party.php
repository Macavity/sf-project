<?php

namespace App\Entity;

use App\Repository\PartyRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PartyRepository::class)]
class Party
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\OneToOne(targetEntity: Character::class, cascade: ['persist'])]
    #[ORM\JoinColumn(nullable: false)]
    private $leader;

    #[ORM\OneToMany(mappedBy: 'party', targetEntity: Character::class)]
    private $members;

    public function __construct()
    {
        $this->members = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLeader(): ?Character
    {
        return $this->leader;
    }

    public function setLeader(Character $leader): self
    {
        $this->leader = $leader;

        return $this;
    }

    /**
     * @return Collection|Character[]
     */
    public function getMembers(): Collection
    {
        return $this->members;
    }

    public function addMember(Character $member): self
    {
        if (!$this->members->contains($member)) {
            $this->members[] = $member;
            $member->setParty($this);
        }

        return $this;
    }

    public function removeMember(Character $member): self
    {
        if ($this->members->removeElement($member)) {
            // set the owning side to null (unless already changed)
            if ($member->getParty() === $this) {
                $member->setParty(null);
            }
        }

        return $this;
    }
}
