<?php

namespace App\Repository;

use App\Entity\Boss;
use App\Entity\PartySetup;
use App\Enum\JobType;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query\Expr\Join;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method PartySetup|null find($id, $lockMode = null, $lockVersion = null)
 * @method PartySetup|null findOneBy(array $criteria, array $orderBy = null)
 * @method PartySetup[]    findAll()
 * @method PartySetup[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PartySetupRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PartySetup::class);
    }

    /**
     * @return PartySetup[]
     */
    public function findByBoss(?int $bossId): array
    {
        return $this->findBy(['boss' => $bossId]);
    }

    /**
     * @return PartySetup[]
     */
    public function findForBossWithFullRotations(Boss $boss): array
    {
        $qb = $this->createQueryBuilder('ps')
            ->select('ps', 'b')
            ->setParameter('bossId', $boss->getId())
            ->join('ps.boss', 'b', Join::WITH, 'ps.boss = b.id')
//            ->join('ps.gladiatorRotation', 'gl', Join::ON, 'ps.gladiatorRotation = gl.id')
//            ->join('ps.zone', 'z', Join::WITH, 'ps.zone = z.id')
            ->andWhere('b.id = :bossId')
        ;

//        foreach (Job::getJobPrefixes() as $i => $prefix) {
//            $qb
//                ->addSelect($qb->expr())
//                ->leftJoin('ps.'.$prefix.'Rotation', $prefix, Join::LEFT_JOIN, 'ps.'.$prefix.'Rotation = '.$prefix.'.id');
//        }

        $result = $qb->getQuery()->getResult();

        return $result;
    }

    public function findWithSkillsOfJob(string $jobSlug)
    {
        $queryBuilder = $this->createQueryBuilder('ps');
        $query = $queryBuilder
            ->where($queryBuilder->expr()->isNotNull($jobSlug . '_skill1'))
            ->orWhere($queryBuilder->expr()->isNotNull($jobSlug . '_skill2'))
            ->orWhere($queryBuilder->expr()->isNotNull($jobSlug . '_skill3'))
            ->orWhere($queryBuilder->expr()->isNotNull($jobSlug . '_skill4'))
            ->getQuery();

        return $query->getResult();
    }
}
