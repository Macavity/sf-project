<?php

namespace App\Repository;

use App\Entity\Skill;
use App\Entity\Stage;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query\Expr\Join;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Stage|null find($id, $lockMode = null, $lockVersion = null)
 * @method Stage|null findOneBy(array $criteria, array $orderBy = null)
 * @method Stage[]    findAll()
 * @method Stage[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class StageRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Stage::class);
    }

    public function getStagesWithPartySetups()
    {
        $qb = $this->createQueryBuilder('s');
        $qb->select('');
    }

     /**
      * @return Stage[] Returns an array of Skill objects
      */
    public function findByZoneId(int $zoneId)
    {
        $query = $this->createQueryBuilder('s')
            ->select('s', 'b')
            ->setParameter('zoneId', $zoneId)
            ->join('s.boss', 'b', Join::WITH, 's.boss = b.id')
            ->andWhere('s.zoneId = :zoneId')
            ->orderBy('s.level', 'ASC')
            ->getQuery();

        return $query->getResult();
    }

    /*
    public function findOneBySomeField($value): ?Skill
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
