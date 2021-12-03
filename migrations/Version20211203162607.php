<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211203162607 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE season ADD region_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE season ADD CONSTRAINT FK_F0E45BA998260155 FOREIGN KEY (region_id) REFERENCES region (id)');
        $this->addSql('CREATE INDEX IDX_F0E45BA998260155 ON season (region_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE season DROP FOREIGN KEY FK_F0E45BA998260155');
        $this->addSql('DROP INDEX IDX_F0E45BA998260155 ON season');
        $this->addSql('ALTER TABLE season DROP region_id');
    }
}
