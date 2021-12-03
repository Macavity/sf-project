<?php

namespace App\Command;

use App\Repository\ZoneRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:stage-scores',
    description: 'Calculate stage scores',
)]
class CalculateStageScores extends Command
{
    public function __construct(
        private ZoneRepository $zoneRepository,
        private EntityManagerInterface $em,
        string $name = null,
    ) {
        parent::__construct($name);
    }

    protected function execute(
        InputInterface $input,
        OutputInterface $output,
    ): int {
        $io = new SymfonyStyle($input, $output);

        $allZones = $this->zoneRepository->findAllOrdered();

        $currentScore = 1;

        foreach ($allZones as $zone) {
            $zone->scoreStart = $currentScore;
            $io->writeln('Zone: ' . str_pad($zone->name, 20, '') . ' - Score: ' . $zone->scoreStart);
            $currentScore += $zone->stageCount;
            $this->em->flush();
        }

        $io->success('Completed calculation of scores.');

        return Command::SUCCESS;
    }
}
