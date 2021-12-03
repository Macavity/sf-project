<?php

namespace App\Controller\Admin;

use App\Entity\Character;
use App\Repository\JobRepository;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class CharacterCrudController extends AbstractCrudController
{
    public function __construct(private JobRepository $jobRepository) { }

    public static function getEntityFqcn(): string
    {
        return Character::class;
    }


    public function configureFields(string $pageName): iterable
    {
        $jobs = $this->jobRepository->getJobChoices();

        return [
//            IdField::new('id'),
            TextField::new('name'),
            AssociationField::new('job'),
            AssociationField::new('season'),
            AssociationField::new('owner'),
            AssociationField::new('createdBy'),
        ];
    }
}
