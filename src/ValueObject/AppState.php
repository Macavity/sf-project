<?php declare(strict_types=1);

namespace App\ValueObject;

use App\Entity\Skill;
use App\Entity\User;
use JetBrains\PhpStorm\Pure;

class AppState
{
    public array $skills;

    public ?string $userName;

    public ?string $userAvatar;

    protected ?User $user;

    /**
     * @param NavEntry[] $navigation
     * @param Skill[] $skills
     */
    public function __construct(
        public array $navigation,
        array $skills,
        public array $jobs,
        public bool  $isUser,
        public bool  $isAdmin,
        ?User        $user = null,
    )
    {
        $this->skills = [];

        foreach ($skills as $skill) {
            $this->skills[] = $skill->toArray();
        }

        if ($user) {
            $this->user = $user;
            $this->userName = $user->getUserIdentifier();
            $this->userAvatar = $this->getUserAvatar();
        }
    }

    #[Pure]
    public function getUserAvatar(): ?string
    {
        if (!$this->user) {
            return null;
        }

        return "https://www.gravatar.com/avatar/" . md5(strtolower(trim($this->user->getEmail()))) . "?d=" . urlencode(
                'identicon'
            ) . "&s=40";
    }
}
