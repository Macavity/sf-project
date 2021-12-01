<?php

namespace App\Controller\Admin;

use App\Entity\PartySetup;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class PartySetupCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return PartySetup::class;
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
