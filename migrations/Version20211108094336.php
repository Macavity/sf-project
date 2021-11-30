<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211108094336 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE job_rotation (id INT AUTO_INCREMENT NOT NULL, job_id INT NOT NULL, skill1_id VARCHAR(255) DEFAULT NULL, skill2_id VARCHAR(255) DEFAULT NULL, skill3_id VARCHAR(255) DEFAULT NULL, skill4_id VARCHAR(255) DEFAULT NULL, description LONGTEXT DEFAULT NULL, INDEX IDX_4E3B3D8ABE04EA9 (job_id), INDEX IDX_4E3B3D8A4EEB88EE (skill1_id), INDEX IDX_4E3B3D8A5C5E2700 (skill2_id), INDEX IDX_4E3B3D8AE4E24065 (skill3_id), INDEX IDX_4E3B3D8A793578DC (skill4_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE job_rotation ADD CONSTRAINT FK_4E3B3D8ABE04EA9 FOREIGN KEY (job_id) REFERENCES job (id)');
        $this->addSql('ALTER TABLE job_rotation ADD CONSTRAINT FK_4E3B3D8A4EEB88EE FOREIGN KEY (skill1_id) REFERENCES skill (id)');
        $this->addSql('ALTER TABLE job_rotation ADD CONSTRAINT FK_4E3B3D8A5C5E2700 FOREIGN KEY (skill2_id) REFERENCES skill (id)');
        $this->addSql('ALTER TABLE job_rotation ADD CONSTRAINT FK_4E3B3D8AE4E24065 FOREIGN KEY (skill3_id) REFERENCES skill (id)');
        $this->addSql('ALTER TABLE job_rotation ADD CONSTRAINT FK_4E3B3D8A793578DC FOREIGN KEY (skill4_id) REFERENCES skill (id)');
        $this->addSql('ALTER TABLE party_setup ADD gladiator_rotation_id INT DEFAULT NULL, ADD warrior_rotation_id INT DEFAULT NULL, ADD druid_rotation_id INT DEFAULT NULL, ADD shaman_rotation_id INT DEFAULT NULL, ADD assassin_rotation_id INT DEFAULT NULL, ADD hunter_rotation_id INT DEFAULT NULL, ADD warlock_rotation_id INT DEFAULT NULL, ADD mage_rotation_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE party_setup ADD CONSTRAINT FK_3AD8769FF94AF44E FOREIGN KEY (gladiator_rotation_id) REFERENCES job_rotation (id)');
        $this->addSql('ALTER TABLE party_setup ADD CONSTRAINT FK_3AD8769F2B86609B FOREIGN KEY (warrior_rotation_id) REFERENCES job_rotation (id)');
        $this->addSql('ALTER TABLE party_setup ADD CONSTRAINT FK_3AD8769F5FDA26EA FOREIGN KEY (druid_rotation_id) REFERENCES job_rotation (id)');
        $this->addSql('ALTER TABLE party_setup ADD CONSTRAINT FK_3AD8769FADA98D5 FOREIGN KEY (shaman_rotation_id) REFERENCES job_rotation (id)');
        $this->addSql('ALTER TABLE party_setup ADD CONSTRAINT FK_3AD8769F699626FD FOREIGN KEY (assassin_rotation_id) REFERENCES job_rotation (id)');
        $this->addSql('ALTER TABLE party_setup ADD CONSTRAINT FK_3AD8769F57AAF2EC FOREIGN KEY (hunter_rotation_id) REFERENCES job_rotation (id)');
        $this->addSql('ALTER TABLE party_setup ADD CONSTRAINT FK_3AD8769FD6BE4143 FOREIGN KEY (warlock_rotation_id) REFERENCES job_rotation (id)');
        $this->addSql('ALTER TABLE party_setup ADD CONSTRAINT FK_3AD8769FCABDC34E FOREIGN KEY (mage_rotation_id) REFERENCES job_rotation (id)');
        $this->addSql('CREATE INDEX IDX_3AD8769FF94AF44E ON party_setup (gladiator_rotation_id)');
        $this->addSql('CREATE INDEX IDX_3AD8769F2B86609B ON party_setup (warrior_rotation_id)');
        $this->addSql('CREATE INDEX IDX_3AD8769F5FDA26EA ON party_setup (druid_rotation_id)');
        $this->addSql('CREATE INDEX IDX_3AD8769FADA98D5 ON party_setup (shaman_rotation_id)');
        $this->addSql('CREATE INDEX IDX_3AD8769F699626FD ON party_setup (assassin_rotation_id)');
        $this->addSql('CREATE INDEX IDX_3AD8769F57AAF2EC ON party_setup (hunter_rotation_id)');
        $this->addSql('CREATE INDEX IDX_3AD8769FD6BE4143 ON party_setup (warlock_rotation_id)');
        $this->addSql('CREATE INDEX IDX_3AD8769FCABDC34E ON party_setup (mage_rotation_id)');
        $this->addSql('ALTER TABLE skill CHANGE id id VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE party_setup DROP FOREIGN KEY FK_3AD8769FF94AF44E');
        $this->addSql('ALTER TABLE party_setup DROP FOREIGN KEY FK_3AD8769F2B86609B');
        $this->addSql('ALTER TABLE party_setup DROP FOREIGN KEY FK_3AD8769F5FDA26EA');
        $this->addSql('ALTER TABLE party_setup DROP FOREIGN KEY FK_3AD8769FADA98D5');
        $this->addSql('ALTER TABLE party_setup DROP FOREIGN KEY FK_3AD8769F699626FD');
        $this->addSql('ALTER TABLE party_setup DROP FOREIGN KEY FK_3AD8769F57AAF2EC');
        $this->addSql('ALTER TABLE party_setup DROP FOREIGN KEY FK_3AD8769FD6BE4143');
        $this->addSql('ALTER TABLE party_setup DROP FOREIGN KEY FK_3AD8769FCABDC34E');
        $this->addSql('DROP TABLE job_rotation');
        $this->addSql('DROP INDEX IDX_3AD8769FF94AF44E ON party_setup');
        $this->addSql('DROP INDEX IDX_3AD8769F2B86609B ON party_setup');
        $this->addSql('DROP INDEX IDX_3AD8769F5FDA26EA ON party_setup');
        $this->addSql('DROP INDEX IDX_3AD8769FADA98D5 ON party_setup');
        $this->addSql('DROP INDEX IDX_3AD8769F699626FD ON party_setup');
        $this->addSql('DROP INDEX IDX_3AD8769F57AAF2EC ON party_setup');
        $this->addSql('DROP INDEX IDX_3AD8769FD6BE4143 ON party_setup');
        $this->addSql('DROP INDEX IDX_3AD8769FCABDC34E ON party_setup');
        $this->addSql('ALTER TABLE party_setup DROP gladiator_rotation_id, DROP warrior_rotation_id, DROP druid_rotation_id, DROP shaman_rotation_id, DROP assassin_rotation_id, DROP hunter_rotation_id, DROP warlock_rotation_id, DROP mage_rotation_id');
        $this->addSql('ALTER TABLE skill CHANGE id id VARCHAR(255) CHARACTER SET utf8 NOT NULL COLLATE `utf8_unicode_ci`');
    }
}
