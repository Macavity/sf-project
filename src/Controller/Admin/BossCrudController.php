<?php

namespace App\Controller\Admin;

use App\Entity\Boss;
use App\Repository\ElementRepository;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\ArrayField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class BossCrudController extends AbstractCrudController
{
    public function __construct(
        private ElementRepository $elementRepository
    ) { }

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
        $elements = $this->elementRepository->getElementChoices();

        return [
            // IdField::new('id'),
            TextField::new('name'),
            ChoiceField::new('primaryElement')->setChoices($elements),
            ChoiceField::new('secondaryElement')->setChoices($elements),
        ];
    }
}
