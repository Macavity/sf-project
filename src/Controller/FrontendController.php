<?php

namespace App\Controller;

use App\Entity\PartySetup;
use App\Entity\Skill;
use App\Repository\PartySetupRepository;
use App\Repository\SkillRepository;
use App\ValueObject\AppState;
use App\ValueObject\NavEntry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class FrontendController extends AbstractController
{
    public function __construct(
        protected SkillRepository $skillRepository,
    ) { }


    #[Route('/', name: 'home')]
    #[Route('/zone/{id}', name: 'zoneDetail')]
    #[Route('/boss-list', name: 'bossList')]
    #[Route('/boss/{id}', name: 'bossDetail')]
    #[Route('/my-teams', name: 'myTeams')]
    public function index(): Response
    {
        if(!$this->getUser()){
            return $this->redirectToRoute('app_login');
        }

        $navItems = [
            new NavEntry('Continents', 'home', '/'),
            new NavEntry('Bosses', 'bossList', '/boss-list'),
        ];

        if($this->isGranted('ROLE_USER')){
            $navItems[] = new NavEntry('My Teams', 'myTeams', '/my-teams');
        }

        if($this->isGranted('ROLE_ADMIN')){
            $navItems[] = new NavEntry('[Backoffice]', 'admin', '/admin');
            $navItems[] = new NavEntry('[RA]', 'react_admin', '/admin/react');
        }

        $appState = new AppState(
            $this->fetchSkills(),
            $this->isGranted('ROLE_ADMIN'),
        );

        return $this->render('frontend/index.html.twig', [
            'navItems' => $navItems,
            'state' => $appState,
        ]);
    }

    private function fetchSkills()
    {
        $skills = $this->skillRepository->findAll();

        return $skills;
    }

}
