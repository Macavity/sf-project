<?php

namespace App\Controller\Admin;

use App\Entity\Boss;
use App\Entity\Character;
use App\Entity\User;
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

        yield MenuItem::section('Game');
        yield MenuItem::linkToRoute('React Admin', 'fab fa-react', 'react_admin');
        yield MenuItem::linkToCrud('Bosses', 'fa fa-bug', Boss::class);

        yield MenuItem::section('Teams');
        yield MenuItem::linkToCrud('Characters', 'fa fa-person', Character::class);

        yield MenuItem::section('Admin');
        yield MenuItem::linkToCrud('Users', 'fa fa-user', User::class);
    }
}
