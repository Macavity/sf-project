<?php declare(strict_types=1);

namespace App\ValueObject;

use Symfony\Component\Routing\Route;

class NavEntry {

    public function __construct(
        public string $label,
        public string $route,
        public string $url,
    ) {

    }
}
