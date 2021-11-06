<?php

namespace App\Repository;

use App\Entity\PartySetup;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
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
}
