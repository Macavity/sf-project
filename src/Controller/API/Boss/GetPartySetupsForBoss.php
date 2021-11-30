<?php

namespace App\Controller\API\Boss;

use App\Entity\Job;
use App\Entity\JobRotation;
use App\Entity\PartySetup;
use App\Enum\JobType;
use App\Repository\BossRepository;
use App\Repository\PartySetupRepository;
use App\Repository\ZoneRepository;
use Doctrine\ORM\PersistentCollection;
use Exception;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

#[AsController]
class GetPartySetupsForBoss extends AbstractController
{
    /**
     * @throws Exception
     */
    public function __invoke(
        int $id,
        Request $request,
        BossRepository $bossRepository,
        PartySetupRepository $partySetupRepository,
        LoggerInterface $logger,
        NormalizerInterface $normalizer,
    ) {
        $boss = $bossRepository->find($id);
        $partySetups = $partySetupRepository->findForBossWithFullRotations($boss);

        $jobPrefixes = JobType::getJobPrefixes();
        $responseArray = [];

        foreach($partySetups as $partySetup){
            $zone = $partySetup->getZone();

            dump($partySetup->gladiatorRotation->getSkill1());


            foreach(JobType::getConstants() as $jobKey){
                if($jobKey === 0){
                    continue;
                }

                /** @var JobRotation|null $rotation */
                $rotation = $partySetup->getRotationByJobType($jobKey);

                if($rotation){
                    $context = [];
                    for($i = 1; $i <= 4; $i++){
                        if($rotation->getSkillOnSlot($i)){
                            $context[] = $rotation->getSkillOnSlot($i)->getLabel();
                        }
                    }

                    $logger->debug($jobPrefixes[$jobKey], $context);


                }

            }
        }

        return array_reverse($partySetups);
    }
}
