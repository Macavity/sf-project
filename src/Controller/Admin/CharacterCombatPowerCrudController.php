<?php

namespace App\Controller\Admin;

use App\Entity\CharacterCombatPower;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class CharacterCombatPowerCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return CharacterCombatPower::class;
    }

    /*
    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id'),
            TextField::new('title'),
            TextEditorField::new('description'),
        ];
    }
    */
}
