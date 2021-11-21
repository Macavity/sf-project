<?php

namespace App\Controller;

use App\Entity\PartySetup;
use App\Entity\Skill;
use App\Repository\PartySetupRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class HomeController extends AbstractController
{
    #[Route('/', name: 'home')]
    #[Route('/zones', name: 'zoneList')]
    #[Route('/zone/{id}', name: 'zoneDetail')]
    #[Route('/boss-list', name: 'bossList')]
    #[Route('/boss/{id}', name: 'bossDetail')]
    public function index(): Response
    {
        return $this->render('frontend/index.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }
}
