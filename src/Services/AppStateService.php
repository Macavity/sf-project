<?php

namespace App\Services;

use App\Entity\User;
use App\Repository\JobRepository;
use App\Repository\SkillRepository;
use App\ValueObject\AppState;
use App\ValueObject\NavEntry;
use EasyCorp\Bundle\EasyAdminBundle\Security\AuthorizationChecker;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class AppStateService
{
    protected AppState $appState;

    protected ?User $user = null;

    public function __construct(
        protected NormalizerInterface $normalizer,
        protected AuthorizationChecker $authorizationChecker,
        protected SkillRepository $skillRepository,
        protected JobRepository $jobRepository,
    ) {

    }

    public function getAppState()
    {
        return new AppState(
            $this->getNavItems(),
            $this->fetchSkills(),
            $this->fetchJobs(),
            $this->authorizationChecker->isGranted('ROLE_ADMIN'),
            $this->user,
        );
    }

    private function fetchJobs()
    {
        $jobs = $this->jobRepository->findAll();

        return $this->normalizer->normalize($jobs);
    }

    private function fetchSkills(): array
    {
        $skillEntities = $this->skillRepository->findAll();

        return $this->normalizer->normalize($skillEntities);
    }

    public function getNavItems(): array
    {
        $navItems = [
            new NavEntry('Continents', 'home', '/'),
            new NavEntry('Bosses', 'bossList', '/boss-list'),
        ];

        if ($this->authorizationChecker->isGranted('ROLE_USER')) {
            $navItems[] = new NavEntry('My Characters', 'myCharacters', '/my-characters');
        }

        if ($this->authorizationChecker->isGranted('ROLE_ADMIN')) {
            $navItems[] = new NavEntry('[Backoffice]', 'admin', '/admin');
            $navItems[] = new NavEntry('[RA]', 'react_admin', '/admin/react');
        }

        return $navItems;
    }

    public function setUser(?User $user): AppStateService
    {
        $this->user = $user;
        return $this;
    }
}
