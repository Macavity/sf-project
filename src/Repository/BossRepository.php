<?php

namespace App\Repository;

use App\Entity\Boss;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query\Expr\Join;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Boss|null find($id, $lockMode = null, $lockVersion = null)
 * @method Boss|null findOneBy(array $criteria, array $orderBy = null)
 * @method Boss[]    findAll()
 * @method Boss[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BossRepository extends ServiceEntityRepository
{
    public function getChoices(): array
    {
        $entities = $this->findAll();

        $choices = [];

        foreach ($entities as $entity) {
            $choices[$entity->name] = $entity->getId();
        }

        return $choices;
    }

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Boss::class);
    }
}
