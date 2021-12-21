<?php

namespace App\Controller\Admin;

use App\Entity\JobRotation;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\Filters;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class JobRotationCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return JobRotation::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            AssociationField::new('job'),
            AssociationField::new('skill1'),
            AssociationField::new('skill2'),
            AssociationField::new('skill3'),
            AssociationField::new('skill4'),
            TextField::new('description'),
        ];
    }

    public function configureFilters(Filters $filters): Filters
    {
        return $filters
            ->add('job')
            ->add('skill1')
            ->add('skill2')
            ->add('skill3')
            ->add('skill4');
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setSearchFields(['job.name', 'skill1.name']);
    }
}
