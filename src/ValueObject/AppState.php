<?php declare(strict_types=1);

namespace App\ValueObject;

use App\Entity\Job;
use App\Entity\Skill;
use App\Entity\User;
use JetBrains\PhpStorm\Pure;
use Paneon\PhpToTypeScript\Annotation\Exclude;
use Paneon\PhpToTypeScript\Annotation\TypeScriptInterface;

/**
 * @TypeScriptInterface
 */
class AppState
{
    public ?string $userName;

    public ?string $userAvatar;

    /**
     * @Exclude
     */
    protected ?User $user;

    /**
     * @var NavEntry[]
     */
    public array $navigation = [];

    /**
     * @var Skill[]
     */
    public array $skills = [];

    /**
     * @var Job[]
     */
    public array $jobs = [];

    public function __construct(
        array         $navigation,
        array         $skills,
        array         $jobs,
        public bool   $isUser,
        public bool   $isAdmin,
        ?User         $user = null,
        public string $frontController = '',
    )
    {
        if ($user) {
            $this->user = $user;
            $this->userName = $user->getUserIdentifier();
            $this->userAvatar = $this->getUserAvatar();
        }
        $this->navigation = $navigation;
        $this->skills = $skills;
        $this->jobs = $jobs;
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
