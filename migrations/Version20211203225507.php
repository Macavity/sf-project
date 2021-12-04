<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211203225507 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(
            'ALTER TABLE character_combat_power ADD created_by_id INT NOT NULL, ADD created_on DATETIME NOT NULL'
        );
        $this->addSql(
            'ALTER TABLE character_combat_power ADD CONSTRAINT FK_FACBA160B03A8386 FOREIGN KEY (created_by_id) REFERENCES user (id)'
        );
        $this->addSql('CREATE INDEX IDX_FACBA160B03A8386 ON character_combat_power (created_by_id)');
        $this->addSql('ALTER TABLE progress ADD zone_id INT DEFAULT NULL, ADD stage_id INT DEFAULT NULL');
        $this->addSql(
            'ALTER TABLE progress ADD CONSTRAINT FK_2201F2469F2C3FAB FOREIGN KEY (zone_id) REFERENCES zone (id)'
        );
        $this->addSql(
            'ALTER TABLE progress ADD CONSTRAINT FK_2201F2462298D193 FOREIGN KEY (stage_id) REFERENCES stage (id)'
        );
        $this->addSql('CREATE INDEX IDX_2201F2469F2C3FAB ON progress (zone_id)');
        $this->addSql('CREATE INDEX IDX_2201F2462298D193 ON progress (stage_id)');
        $this->addSql(
            'ALTER TABLE zone ADD is_mystic TINYINT(1) NOT NULL, CHANGE stage_count stage_count INT DEFAULT 120 NOT NULL'
        );
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE character_combat_power DROP FOREIGN KEY FK_FACBA160B03A8386');
        $this->addSql('DROP INDEX IDX_FACBA160B03A8386 ON character_combat_power');
        $this->addSql('ALTER TABLE character_combat_power DROP created_by_id, DROP created_on');
        $this->addSql('ALTER TABLE progress DROP FOREIGN KEY FK_2201F2469F2C3FAB');
        $this->addSql('ALTER TABLE progress DROP FOREIGN KEY FK_2201F2462298D193');
        $this->addSql('DROP INDEX IDX_2201F2469F2C3FAB ON progress');
        $this->addSql('DROP INDEX IDX_2201F2462298D193 ON progress');
        $this->addSql('ALTER TABLE progress DROP zone_id, DROP stage_id');
        $this->addSql('ALTER TABLE zone DROP is_mystic, CHANGE stage_count stage_count INT DEFAULT 120 NOT NULL');
    }
}
