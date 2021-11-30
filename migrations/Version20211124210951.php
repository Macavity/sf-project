<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211124210951 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('SET FOREIGN_KEY_CHECKS=0;');
        $this->addSql('ALTER TABLE job_rotation DROP FOREIGN KEY FK_4E3B3D8A4EEB88EE');
        $this->addSql('ALTER TABLE job_rotation DROP FOREIGN KEY FK_4E3B3D8A5C5E2700');
        $this->addSql('ALTER TABLE job_rotation DROP FOREIGN KEY FK_4E3B3D8AE4E24065');
        $this->addSql('ALTER TABLE job_rotation DROP FOREIGN KEY FK_4E3B3D8A793578DC');

        $this->addSql('ALTER TABLE job_rotation CHANGE skill1_id skill1_id INT DEFAULT NULL, CHANGE skill2_id skill2_id INT DEFAULT NULL, CHANGE skill3_id skill3_id INT DEFAULT NULL, CHANGE skill4_id skill4_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE skill CHANGE id id INT AUTO_INCREMENT NOT NULL');

        $this->addSql('ALTER TABLE job_rotation ADD CONSTRAINT FK_4E3B3D8A4EEB88EE FOREIGN KEY (skill1_id) REFERENCES skill (id)');
        $this->addSql('ALTER TABLE job_rotation ADD CONSTRAINT FK_4E3B3D8A5C5E2700 FOREIGN KEY (skill2_id) REFERENCES skill (id)');
        $this->addSql('ALTER TABLE job_rotation ADD CONSTRAINT FK_4E3B3D8AE4E24065 FOREIGN KEY (skill3_id) REFERENCES skill (id)');
        $this->addSql('ALTER TABLE job_rotation ADD CONSTRAINT FK_4E3B3D8A793578DC FOREIGN KEY (skill4_id) REFERENCES skill (id)');
        $this->addSql('SET FOREIGN_KEY_CHECKS=1;');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE job_rotation CHANGE skill1_id skill1_id VARCHAR(255) CHARACTER SET utf8 DEFAULT NULL COLLATE `utf8_unicode_ci`, CHANGE skill2_id skill2_id VARCHAR(255) CHARACTER SET utf8 DEFAULT NULL COLLATE `utf8_unicode_ci`, CHANGE skill3_id skill3_id VARCHAR(255) CHARACTER SET utf8 DEFAULT NULL COLLATE `utf8_unicode_ci`, CHANGE skill4_id skill4_id VARCHAR(255) CHARACTER SET utf8 DEFAULT NULL COLLATE `utf8_unicode_ci`');
        $this->addSql('ALTER TABLE skill CHANGE id id VARCHAR(255) CHARACTER SET utf8 NOT NULL COLLATE `utf8_unicode_ci`');
    }
}
