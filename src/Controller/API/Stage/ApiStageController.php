<?php

namespace App\Controller\API\Stage;

use App\Repository\PartySetupRepository;
use App\Repository\StageRepository;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\VarDumper\VarDumper;

#[AsController]
class ApiStageController extends AbstractController
{
    public function __construct(
        private LoggerInterface $logger
    )
    {
    }

    #[Route('/api/stages/zoneId/{zoneId}.{_format}', name: 'api_stages_with_party_setups')]
    public function getStagesWithPartySetups(
        int             $zoneId,
        string          $_format,
        StageRepository $stageRepository,
        PartySetupRepository $partySetupRepository,
    ): Response {
        $stages = $stageRepository->findByZoneId($zoneId);
        $bosses = [];

//        foreach ($stages as $stage) {
//            if(!empty($bosses[$stage->boss->getId()])){
//                $bossSetups = $bosses[$stage->boss->getId()];
//            }
//            else {
//                $bossSetups = $partySetupRepository->findByBoss($stage->boss->getId());
//                $bosses[$stage->boss->getId()] = $bossSetups;
//            }
//
//            $stage->boss->partySetups = $bossSetups;
//            $this->logger->debug('partySetups', ['partySetups' => $partySetups]);
//
//        }

        if ($_format === 'html') {
            VarDumper::dump($stages);
            return new Response('');
        }

        return new JsonResponse($stages);
    }
}
