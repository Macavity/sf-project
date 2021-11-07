<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211103213907 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE boss (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, primary_element INT NOT NULL, secondary_element INT DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE continent (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, slug VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE job (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, slug VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE party_setup (id INT AUTO_INCREMENT NOT NULL, zone_id INT DEFAULT NULL, boss_id INT DEFAULT NULL, stage_level INT NOT NULL, INDEX IDX_3AD8769F9F2C3FAB (zone_id), INDEX IDX_3AD8769F261FB672 (boss_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE skill (id VARCHAR(255) NOT NULL, job_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, short_name VARCHAR(255) NOT NULL, INDEX IDX_5E3DE477BE04EA9 (job_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE stage (id INT AUTO_INCREMENT NOT NULL, zone_id INT DEFAULT NULL, boss_id INT DEFAULT NULL, level INT NOT NULL, INDEX IDX_C27C93699F2C3FAB (zone_id), INDEX IDX_C27C9369261FB672 (boss_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE zone (id INT AUTO_INCREMENT NOT NULL, continent_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, slug VARCHAR(255) NOT NULL, position INT DEFAULT 0 NOT NULL, score_start INT NOT NULL, INDEX IDX_A0EBC007921F4C77 (continent_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE party_setup ADD CONSTRAINT FK_3AD8769F9F2C3FAB FOREIGN KEY (zone_id) REFERENCES zone (id)');
        $this->addSql('ALTER TABLE party_setup ADD CONSTRAINT FK_3AD8769F261FB672 FOREIGN KEY (boss_id) REFERENCES boss (id)');
        $this->addSql('ALTER TABLE skill ADD CONSTRAINT FK_5E3DE477BE04EA9 FOREIGN KEY (job_id) REFERENCES job (id)');
        $this->addSql('ALTER TABLE stage ADD CONSTRAINT FK_C27C93699F2C3FAB FOREIGN KEY (zone_id) REFERENCES zone (id)');
        $this->addSql('ALTER TABLE stage ADD CONSTRAINT FK_C27C9369261FB672 FOREIGN KEY (boss_id) REFERENCES boss (id)');
        $this->addSql('ALTER TABLE zone ADD CONSTRAINT FK_A0EBC007921F4C77 FOREIGN KEY (continent_id) REFERENCES continent (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE party_setup DROP FOREIGN KEY FK_3AD8769F261FB672');
        $this->addSql('ALTER TABLE stage DROP FOREIGN KEY FK_C27C9369261FB672');
        $this->addSql('ALTER TABLE zone DROP FOREIGN KEY FK_A0EBC007921F4C77');
        $this->addSql('ALTER TABLE skill DROP FOREIGN KEY FK_5E3DE477BE04EA9');
        $this->addSql('ALTER TABLE party_setup DROP FOREIGN KEY FK_3AD8769F9F2C3FAB');
        $this->addSql('ALTER TABLE stage DROP FOREIGN KEY FK_C27C93699F2C3FAB');
        $this->addSql('DROP TABLE boss');
        $this->addSql('DROP TABLE continent');
        $this->addSql('DROP TABLE job');
        $this->addSql('DROP TABLE party_setup');
        $this->addSql('DROP TABLE skill');
        $this->addSql('DROP TABLE stage');
        $this->addSql('DROP TABLE zone');
    }
}
