<?php

namespace App\Controller\Admin;

use App\Entity\Boss;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\ArrayField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class BossCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Boss::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setSearchFields(['name'])
            ->setDefaultSort(['name' => 'ASC']);
    }

    public function configureFields(string $pageName): iterable
    {
        $primary = ChoiceField::new('primaryElement')->setChoices([
            0 => 'None',
            1 => 'Fire',
            2 => 'Lightning',
            3 => 'Frost',
            4 => 'Earth',
        ]);

        return [
            IdField::new('id'),
            TextField::new('name'),
            $primary,
            ArrayField::new('secondaryElement'),
        ];
    }
}
