<?php

namespace App\Repository;

use App\Entity\EmbedRotation;
use App\Entity\JobRotation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method JobRotation|null find($id, $lockMode = null, $lockVersion = null)
 * @method JobRotation|null findOneBy(array $criteria, array $orderBy = null)
 * @method JobRotation[]    findAll()
 * @method JobRotation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class JobRotationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, JobRotation::class);
    }

    public function findByEmbedRotation(EmbedRotation $embedRotation): ?JobRotation
    {
        $criteria = [];

        if($embedRotation->skill1){
            $criteria['skill1'] = $embedRotation->skill1;
        }
        if($embedRotation->skill2){
            $criteria['skill2'] = $embedRotation->skill2;
        }
        if($embedRotation->skill3){
            $criteria['skill3'] = $embedRotation->skill3;
        }
        if($embedRotation->skill4){
            $criteria['skill4'] = $embedRotation->skill4;
        }

        return $this->findOneBy($criteria);
    }

    // /**
    //  * @return IJobRotation[] Returns an array of IJobRotation objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('j')
            ->andWhere('j.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('j.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?IJobRotation
    {
        return $this->createQueryBuilder('j')
            ->andWhere('j.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
