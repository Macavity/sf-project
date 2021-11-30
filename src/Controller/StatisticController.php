<?php

namespace App\Controller;

use App\Entity\PartySetup;
use App\Repository\PartySetupRepository;
use App\Repository\ZoneRepository;
use App\ValueObject\CountedSkill;
use JetBrains\PhpStorm\ArrayShape;
use PHPUnit\Framework\Constraint\Count;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class StatisticController extends AbstractController
{
    public function __construct(
        protected PartySetupRepository $partySetupRepository,
        protected ZoneRepository $zoneRepository,
    ) { }

    #[Route('/stats/zone/{zoneId}')]
    public function statsForZone(
        int                  $zoneId,
    ) {

        $skillsUsage = $this->getCountedSkillsByZone($zoneId);

        usort($skillsUsage, function(CountedSkill $a, CountedSkill $b) { return -($a->getUsage() <=> $b->getUsage());});

        $skillData = [];

        foreach ($skillsUsage as $skillId => $skill) {
            $skillData[$skillId] = $skill->toArray();
        }

        dump($skillData);

        return $this->render('frontend/stats.html.twig', [
            'state' => [
                'skills' => $skillData,
            ],
        ]);
    }

    #[Route('/stats/continent/{continentId}')]
    public function statsForContinent(
        int                  $continentId,
    ) {
        $zones = $this->zoneRepository->findBy(['continent' => $continentId]);
        $partySetupIds = [];

        /** @var CountedSkill[] $skillsUsage */
        $skillsUsage = [];

        foreach($zones as $zone){
            $zoneUsage = $this->getCountedSkillsByZone($zone->getId());

            foreach($zoneUsage as $usage){
                if(isset($skillsUsage[$usage->getId()])){
                    $skillsUsage[$usage->getId()]->increaseUsage($usage->getUsage());
                } else {
                    $skillsUsage[$usage->getId()] = $usage;
                }
            }
        }

        usort($skillsUsage, function(CountedSkill $a, CountedSkill $b) { return -($a->getUsage() <=> $b->getUsage());});

        $skillData = [];

        foreach ($skillsUsage as $skillId => $skill) {
            $skillData[$skillId] = $skill->toArray();
        }

        dump($skillData);

        return $this->render('frontend/stats.html.twig', [
            'state' => [
                'skills' => $skillData,
            ],
        ]);
    }

    public function getCountedSkillsByZone(int $zoneId): array
    {
        $partySetups = $this->partySetupRepository->findBy(['zone' => $zoneId]);

        /** @var CountedSkill[] $skillsUsageCounter */
        $skillsUsageCounter = [];

        foreach ($partySetups as $setup) {
            if (!$setup->hunterRotation) {
                continue;
            }
            for ($i = 1; $i <= 4; $i++) {
                $skillOnSlot = $setup->hunterRotation->getSkillOnSlot($i);
                if ($skillOnSlot) {
                    if (isset($skillsUsageCounter[$skillOnSlot->getId()])) {
                        $skillsUsageCounter[$skillOnSlot->getId()]->increaseUsage();
                    } else {
                        $skillsUsageCounter[$skillOnSlot->getId()] = new CountedSkill($skillOnSlot);
                    }
                }
            }
        }

        return $skillsUsageCounter;
    }
}
