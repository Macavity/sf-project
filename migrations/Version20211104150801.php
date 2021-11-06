<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211104150801 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE party_setup ADD stage_id INT DEFAULT NULL AFTER zone_id');
        $this->addSql('ALTER TABLE party_setup ADD CONSTRAINT FK_3AD8769F2298D193 FOREIGN KEY (stage_id) REFERENCES stage (id)');
        $this->addSql('CREATE INDEX IDX_3AD8769F2298D193 ON party_setup (stage_id)');
        $this->addSql('ALTER TABLE skill CHANGE id id VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE party_setup DROP FOREIGN KEY FK_3AD8769F2298D193');
        $this->addSql('DROP INDEX IDX_3AD8769F2298D193 ON party_setup');
        $this->addSql('ALTER TABLE party_setup DROP stage_id');
        $this->addSql('ALTER TABLE skill CHANGE id id VARCHAR(255) CHARACTER SET utf8 NOT NULL COLLATE `utf8_unicode_ci`');
    }
}
