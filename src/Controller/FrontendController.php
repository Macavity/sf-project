<?php

namespace App\Controller;

use App\Entity\PartySetup;
use App\Entity\Skill;
use App\Entity\User;
use App\Repository\JobRepository;
use App\Repository\PartySetupRepository;
use App\Repository\SkillRepository;
use App\Services\AppStateService;
use App\ValueObject\AppState;
use App\ValueObject\NavEntry;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class FrontendController extends AbstractController
{
    public function __construct(
        protected SkillRepository $skillRepository,
        protected JobRepository   $jobRepository,
        protected AppStateService $appStateService,
    )
    {
    }


    #[Route('/', name: 'home')]
    #[Route('/zone/{id}', name: 'zoneDetail')]
    #[Route('/boss-list', name: 'bossList')]
    #[Route('/boss/{id}', name: 'bossDetail')]
    #[Route('/my-characters', name: 'myCharacters')]
    #[Route('/add-setup', name: 'addSetup')]
    public function index(Request $request): Response
    {
        $this->appStateService->setRequest($request);

        /**
         * @var User|null $user
         */
        $user = $this->getUser();

        if ($user) {
            $this->appStateService->setUser($user);
        }

        /*if (!$user) {
            return $this->redirectToRoute('app_login');
        }*/
        $appState = $this->appStateService->getAppState();
        dump($appState);

        return $this->render('frontend/index.html.twig', [
            'state' => $appState,
        ]);
    }

}
