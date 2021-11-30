<?php

namespace App\Controller\Admin;

use App\Entity\Boss;
use App\Entity\Character;
use App\Entity\Continent;
use App\Entity\Job;
use App\Entity\JobRotation;
use App\Entity\PartySetup;
use App\Entity\Skill;
use App\Entity\Stage;
use App\Entity\Team;
use App\Entity\User;
use App\Entity\Zone;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractDashboardController
{
    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {
        return parent::index();
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Ulala Backend');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToRoute('Homepage', 'fa fa-home', 'home');
        yield MenuItem::linktoDashboard('Dashboard', 'fa fa-chart-line');
        yield MenuItem::linkToRoute('React Admin', 'fab fa-react', 'react_admin');

        yield MenuItem::section('Map');
        yield MenuItem::linkToCrud('Bosses', 'fa fa-bug', Boss::class);
        yield MenuItem::linkToCrud('Continents', 'fa fa-globe-americas', Continent::class);
        yield MenuItem::linkToCrud('Zones', 'fa fa-map', Zone::class);
        yield MenuItem::linkToCrud('Stages', 'fa fa-map-marked-alt', Stage::class);
        yield MenuItem::linkToCrud('Party Setup', 'fa fa-sliders-h', PartySetup::class);

        yield MenuItem::section('Jobs');
        yield MenuItem::linkToCrud('Jobs', 'fa fa-user', Job::class);
        yield MenuItem::linkToCrud('Skill', 'fa fa-user-cog', Skill::class);
        yield MenuItem::linkToCrud('Skill Rotation', 'fa fa-users-cog', JobRotation::class);

        yield MenuItem::section('Teams');
        yield MenuItem::linkToCrud('Characters', 'fa fa-user', Character::class);
        yield MenuItem::linkToCrud('Teams', 'fa fa-users', Team::class);

        yield MenuItem::section('Admin');
        yield MenuItem::linkToCrud('Users', 'fa fa-user', User::class);
    }
}
