<?php

namespace App\Command;

use App\Entity\JobRotation;
use App\Entity\PartySetup;
use App\Enum\JobType as JobType;
use App\Factory\JobRotationFactory;
use App\Repository\JobRepository;
use App\Repository\JobRotationRepository;
use App\Repository\PartySetupRepository;
use App\Repository\SkillRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:normalize-rotations',
    description: 'Add a short description for your command',
)]
class NormalizeRotationsCommand extends Command
{
    public function __construct(
        private PartySetupRepository   $partySetupRepository,
        private JobRotationRepository  $jobRotationRepository,
        private SkillRepository        $skillRepository,
        private EntityManagerInterface $em,
        private JobRotationFactory     $jobRotationFactory,
        private JobRepository          $jobRepository,
        string                         $name = null,
    ) {
        parent::__construct($name);
    }

    protected function configure(): void
    {
        $this
            ->addArgument('arg1', InputArgument::OPTIONAL, 'Argument description')
            ->addOption('option1', null, InputOption::VALUE_NONE, 'Option description');
    }

    protected function execute(
        InputInterface  $input,
        OutputInterface $output,
    ): int {
        $io = new SymfonyStyle($input, $output);


        $jobs = $this->jobRepository->findAll();


        /** @var PartySetup[] $setups */
        $setups = $this->partySetupRepository->findAll();
        $io->writeln(count($setups) . ' Setups');
        $changedEntries = 0;
        $addedEntries = 0;

        foreach ($setups as $partySetup) {
            $io->writeln('Party Setups: ' . $partySetup->getId());
            foreach ($jobs as $job) {
                $jobType = JobType::getEnumByKey($job->getId());
                $logPrefix = '|- ' . str_pad($job->slug, 10, ' ');

                $embedRotation = $partySetup->getEmbedByJobId($jobType);
                if (!$embedRotation || (!$embedRotation->skill1 && !$embedRotation->skill2 && !$embedRotation->skill3 && !$embedRotation->skill4)) {
                    $io->writeln($logPrefix . ' - Skip because empty');
                    continue;
                }

                /** @var JobRotation|null $jobRotation */
                $jobRotation = $this->jobRotationRepository->findByEmbedRotation($embedRotation);

                if (!$jobRotation) {
                    $addedEntries++;
                    $io->write($logPrefix . ' - Create new Rotation ');
                    $jobRotation = $this->jobRotationFactory->createFromEmbeddedRotation(
                        $embedRotation,
                        $job
                    );
                    $io->write(json_encode($jobRotation));
                } else {
                    $current = $partySetup->getRotationByJobType($jobType);

                    if ($current !== null && $current->getId() === $jobRotation->getId()) {
                        $io->writeln($logPrefix . ' - already connected.');
                        continue;
                    }
                    $io->write($logPrefix . ' - connect existing rotation');
                }
                switch ($jobType) {
                    case JobType::GLADIATOR:
                        $partySetup->gladiatorRotation = $jobRotation;
                        break;
                    case JobType::WARRIOR:
                        $partySetup->warriorRotation = $jobRotation;
                        break;
                    case JobType::DRUID:
                        $partySetup->druidRotation = $jobRotation;
                        break;
                    case JobType::SHAMAN:
                        $partySetup->shamanRotation = $jobRotation;
                        break;
                    case JobType::ASSASSIN:
                        $partySetup->assassinRotation = $jobRotation;
                        break;
                    case JobType::WARLOCK:
                        $partySetup->warlockRotation = $jobRotation;
                        break;
                    case JobType::HUNTER:
                        $partySetup->hunterRotation = $jobRotation;
                        break;
                    case JobType::MAGE:
                        $partySetup->mageRotation = $jobRotation;
                        break;
                }

                $this->em->flush();
                $io->write(' - Saved' . PHP_EOL);
            }
            $io->writeln('-- Flushed --');
        }

        $io->writeln($addedEntries . ' entries added.');
        $io->success('Successful migration');

        return Command::SUCCESS;
    }
}
