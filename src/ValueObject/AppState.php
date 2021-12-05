<?php declare(strict_types=1);

namespace App\ValueObject;

use App\Entity\Skill;
use App\Entity\User;

class AppState
{
    public ?string $userName;

    public ?string $userAvatar;

    protected ?User $user;

    /**
     * @param NavEntry[] $navigation
     * @param Skill[]    $skills
     */
    public function __construct(
        public array $navigation,
        public array $skills,
        public array $jobs,
        public bool $isAdmin,
        ?User $user = null,
    ) {
        if ($user) {
            $this->user = $user;
            $this->userName = $user->getUserIdentifier();
            $this->userAvatar = $this->getUserAvatar();
        }
    }

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
