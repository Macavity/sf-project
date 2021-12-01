<?php

namespace App\Repository;

use App\Entity\Job;
use App\Enum\Element;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use JetBrains\PhpStorm\ArrayShape;

class ElementRepository
{
    public function getElementChoices(): array
    {
        $elements = $this->findAll();

        $choices = [];

        foreach ($elements as $key => $label) {
            $choices[$label] = $key;
        }

        return $choices;
    }

    #[ArrayShape([Element::NONE => "string", Element::FIRE => "string", Element::EARTH => "string", Element::FROST => "string", Element::LIGHTNING => "string"])] public function findAll(): array
    {
        return [
            Element::NONE => 'None',
            Element::FIRE => 'Fire',
            Element::EARTH => 'Earth',
            Element::FROST => 'Frost',
            Element::LIGHTNING => 'Lightning',
        ];
    }
}
