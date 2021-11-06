<?php

namespace App\Controller\API\Boss;

use App\Repository\BossRepository;
use App\Repository\PartySetupRepository;
use App\Repository\ZoneRepository;
use Doctrine\ORM\PersistentCollection;
use Exception;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

#[AsController]
class GetPartySetupsForBossInZone extends AbstractController
{
    /**
     * @throws Exception
     */
    public function __invoke(
        int                  $id,
        Request              $request,
        BossRepository       $bossRepository,
        PartySetupRepository $partySetupRepository,
        ZoneRepository       $zoneRepository,
        LoggerInterface      $logger,
    ) {
        $requestedLevel = (int) $request->get('level', null);
        $requestedZone = (int) $request->get('zoneId', null);

        if (!$requestedLevel || !$requestedZone) {
            throw new BadRequestException();
        }

        $boss = $bossRepository->find($id);

        if (!$boss) {
            throw new NotFoundHttpException("Boss ${$id} not found.");
        }

        $exactMatch = $partySetupRepository
            ->findBy([
                         'zoneId' => $requestedZone,
                         'stageLevel' => $requestedLevel,
                     ]);

        if ($exactMatch) {
            return $exactMatch;
        }

        $logger->debug('No exact matches found for {boss} in {requestedZone} @ {requestedLevel}', [
            'boss' => $boss,
            'requestedZone' => $requestedZone,
            'requestedLevel' => $requestedLevel,
        ]);

        $zone = $zoneRepository->find($requestedZone);
        $targetScore = $zone->scoreStart + $requestedLevel;

        /** @var PersistentCollection $partySetups */
        $partySetups = $boss->partySetups;

        foreach (array_reverse($partySetups->toArray()) as $rotation) {
            if (!$rotation->zone) {
                throw new Exception('Missing zoneId in rotation: ' . $rotation->getId(), 500);
            }

            $rotationScore = $rotation->getScore();

            if($rotationScore <= $targetScore){
                return [$rotation];
            }
        }

        return [];
    }
}
