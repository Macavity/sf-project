<?php declare(strict_types=1);

namespace App\Enum;

class JobType extends BasicEnum
{
    public const NONE = 0;
    public const GLADIATOR = 1;
    public const DRUID = 2;
    public const WARRIOR = 3;
    public const SHAMAN = 4;
    public const MAGE = 5;
    public const HUNTER = 6;
    public const ASSASSIN = 7;
    public const WARLOCK = 8;

    public static function getJobPrefixes(): array
    {
        return [
            self::GLADIATOR => 'gladiator',
            self::WARRIOR => 'warrior',
            self::SHAMAN => 'shaman',
            self::WARLOCK => 'warlock',
            self::DRUID => 'druid',
            self::HUNTER => 'hunter',
            self::ASSASSIN => 'assassin',
            self::MAGE => 'mage'
        ];
    }
}
