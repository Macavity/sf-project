<?php

namespace App\Repository;

use App\Entity\Zone;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query\Expr\Join;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Zone|null find($id, $lockMode = null, $lockVersion = null)
 * @method Zone|null findOneBy(array $criteria, array $orderBy = null)
 * @method Zone[]    findAll()
 * @method Zone[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ZoneRepository extends ServiceEntityRepository
{
    public function getChoices(): array
    {
        $entities = $this->findAll();

        $choices = [];

        foreach ($entities as $entity) {
            dump($entity);
            if ($entity->name && $entity->getId()) {
                $choices[$entity->name] = $entity->getId();
            }
        }

        return $choices;
    }

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Zone::class);
    }

    public function findAllOrdered()
    {
        return $this->findBy([
            'isMystic' => false,
        ], [
            'continent' => 'ASC',
            'position' => 'ASC',
        ]);
    }
}
