<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211203150744 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE character_combat_power (id INT AUTO_INCREMENT NOT NULL, char_id INT NOT NULL, value INT NOT NULL, INDEX IDX_FACBA1603FF12EF9 (char_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE progress (id INT AUTO_INCREMENT NOT NULL, char_id INT NOT NULL, INDEX IDX_2201F2463FF12EF9 (char_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE region (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE season (id INT AUTO_INCREMENT NOT NULL, number INT NOT NULL, finished TINYINT(1) DEFAULT \'0\' NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE `utf8_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE character_combat_power ADD CONSTRAINT FK_FACBA1603FF12EF9 FOREIGN KEY (char_id) REFERENCES `character` (id)');
        $this->addSql('ALTER TABLE progress ADD CONSTRAINT FK_2201F2463FF12EF9 FOREIGN KEY (char_id) REFERENCES `character` (id)');
        $this->addSql('ALTER TABLE `character` ADD owner_id INT DEFAULT NULL, ADD created_by_id INT DEFAULT NULL, ADD season_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE `character` ADD CONSTRAINT FK_937AB0347E3C61F9 FOREIGN KEY (owner_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE `character` ADD CONSTRAINT FK_937AB034B03A8386 FOREIGN KEY (created_by_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE `character` ADD CONSTRAINT FK_937AB0344EC001D1 FOREIGN KEY (season_id) REFERENCES season (id)');
        $this->addSql('CREATE INDEX IDX_937AB0347E3C61F9 ON `character` (owner_id)');
        $this->addSql('CREATE INDEX IDX_937AB034B03A8386 ON `character` (created_by_id)');
        $this->addSql('CREATE INDEX IDX_937AB0344EC001D1 ON `character` (season_id)');
        $this->addSql('ALTER TABLE zone ADD stage_count INT DEFAULT 120 NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE `character` DROP FOREIGN KEY FK_937AB0344EC001D1');
        $this->addSql('DROP TABLE character_combat_power');
        $this->addSql('DROP TABLE progress');
        $this->addSql('DROP TABLE region');
        $this->addSql('DROP TABLE season');
        $this->addSql('ALTER TABLE `character` DROP FOREIGN KEY FK_937AB0347E3C61F9');
        $this->addSql('ALTER TABLE `character` DROP FOREIGN KEY FK_937AB034B03A8386');
        $this->addSql('DROP INDEX IDX_937AB0347E3C61F9 ON `character`');
        $this->addSql('DROP INDEX IDX_937AB034B03A8386 ON `character`');
        $this->addSql('DROP INDEX IDX_937AB0344EC001D1 ON `character`');
        $this->addSql('ALTER TABLE `character` DROP owner_id, DROP created_by_id, DROP season_id');
        $this->addSql('ALTER TABLE zone DROP stage_count');
    }
}
