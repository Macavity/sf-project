<?php

namespace App\Controller\Admin;

use App\Entity\PartySetup;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
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
        yield AssociationField::new('zone');
        yield NumberField::new('stageLevel')->setRequired(false);
        yield AssociationField::new('boss')->setRequired(true);

        if ($pageName === Crud::PAGE_INDEX) {
            yield BooleanField::new('gladiatorRotation', 'Gladiator');
            yield BooleanField::new('warriorRotation', 'Warrior');
            yield BooleanField::new('druidRotation', 'Druid');
            yield BooleanField::new('shamanRotation', 'Shaman');
            yield BooleanField::new('assassinRotation', 'Assa');
            yield BooleanField::new('hunterRotation', 'Hunter');
            yield BooleanField::new('warlockRotation', 'Warlock');
            yield BooleanField::new('mageRotation', 'Mage');
        } else {
            yield AssociationField::new('gladiatorRotation', 'Gladiator');
            yield AssociationField::new('warriorRotation', 'Warrior');
            yield AssociationField::new('druidRotation', 'Druid');
            yield AssociationField::new('shamanRotation', 'Shaman');
            yield AssociationField::new('assassinRotation', 'Assa');
            yield AssociationField::new('hunterRotation', 'Hunter');
            yield AssociationField::new('warlockRotation', 'Warlock');
            yield AssociationField::new('mageRotation', 'Mage');
        }

    }

    public function configureFilters(Filters $filters): Filters
    {
        return $filters
            ->add('boss')
            ->add('zone');
    }
}
