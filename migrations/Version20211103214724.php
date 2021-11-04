<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211103214724 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE party_setup ADD gladiator_skill1 INT DEFAULT NULL, ADD gladiator_skill2 INT DEFAULT NULL, ADD gladiator_skill3 INT DEFAULT NULL, ADD gladiator_skill4 INT DEFAULT NULL, ADD warrior_skill1 INT DEFAULT NULL, ADD warrior_skill2 INT DEFAULT NULL, ADD warrior_skill3 INT DEFAULT NULL, ADD warrior_skill4 INT DEFAULT NULL, ADD druid_skill1 INT DEFAULT NULL, ADD druid_skill2 INT DEFAULT NULL, ADD druid_skill3 INT DEFAULT NULL, ADD druid_skill4 INT DEFAULT NULL, ADD shaman_skill1 INT DEFAULT NULL, ADD shaman_skill2 INT DEFAULT NULL, ADD shaman_skill3 INT DEFAULT NULL, ADD shaman_skill4 INT DEFAULT NULL, ADD assassin_skill1 INT DEFAULT NULL, ADD assassin_skill2 INT DEFAULT NULL, ADD assassin_skill3 INT DEFAULT NULL, ADD assassin_skill4 INT DEFAULT NULL, ADD hunter_skill1 INT DEFAULT NULL, ADD hunter_skill2 INT DEFAULT NULL, ADD hunter_skill3 INT DEFAULT NULL, ADD hunter_skill4 INT DEFAULT NULL, ADD mage_skill1 INT DEFAULT NULL, ADD mage_skill2 INT DEFAULT NULL, ADD mage_skill3 INT DEFAULT NULL, ADD mage_skill4 INT DEFAULT NULL, ADD warlock_skill1 INT DEFAULT NULL, ADD warlock_skill2 INT DEFAULT NULL, ADD warlock_skill3 INT DEFAULT NULL, ADD warlock_skill4 INT DEFAULT NULL');
        $this->addSql('ALTER TABLE skill CHANGE id id VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE party_setup DROP gladiator_skill1, DROP gladiator_skill2, DROP gladiator_skill3, DROP gladiator_skill4, DROP warrior_skill1, DROP warrior_skill2, DROP warrior_skill3, DROP warrior_skill4, DROP druid_skill1, DROP druid_skill2, DROP druid_skill3, DROP druid_skill4, DROP shaman_skill1, DROP shaman_skill2, DROP shaman_skill3, DROP shaman_skill4, DROP assassin_skill1, DROP assassin_skill2, DROP assassin_skill3, DROP assassin_skill4, DROP hunter_skill1, DROP hunter_skill2, DROP hunter_skill3, DROP hunter_skill4, DROP mage_skill1, DROP mage_skill2, DROP mage_skill3, DROP mage_skill4, DROP warlock_skill1, DROP warlock_skill2, DROP warlock_skill3, DROP warlock_skill4');
        $this->addSql('ALTER TABLE skill CHANGE id id VARCHAR(255) CHARACTER SET utf8 NOT NULL COLLATE `utf8_unicode_ci`');
    }
}
