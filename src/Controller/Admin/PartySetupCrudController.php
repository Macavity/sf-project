<?php

namespace App\Controller\Admin;

use App\Entity\PartySetup;
use EasyCorp\Bundle\EasyAdminBundle\Config\Filters;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class PartySetupCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return PartySetup::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            AssociationField::new('zone'),
            NumberField::new('stageLevel'),
            AssociationField::new('boss'),
            BooleanField::new('gladiatorRotation', 'Gladiator'),
            BooleanField::new('warriorRotation', 'Warrior'),
            BooleanField::new('druidRotation', 'Druid'),
            BooleanField::new('shamanRotation', 'Shaman'),
            BooleanField::new('assassinRotation', 'Assa'),
            BooleanField::new('hunterRotation', 'Hunter'),
            BooleanField::new('warlockRotation', 'Warlock'),
            BooleanField::new('mageRotation', 'Mage'),
        ];
    }

    public function configureFilters(Filters $filters): Filters
    {
        return $filters
            ->add('boss')
            ->add('zone');
    }
}
