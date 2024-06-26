import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstMigration1649940443661 implements MigrationInterface {
  name = 'FirstMigration1649940443661';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "teams" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, "description" text, "password" character varying NOT NULL, CONSTRAINT "PK_7e5523774a38b08a6236d322403" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_ability_enum" AS ENUM('amateur', 'beginner', 'semiprofessional', 'professional', 'legendary')`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_position_enum" AS ENUM('goleiro', 'linha')`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "ability" "public"."users_ability_enum" NOT NULL DEFAULT 'semiprofessional', "position" "public"."users_position_enum" NOT NULL DEFAULT 'linha', "team_id" integer NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "teams_users" ("team_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_7ef73da7c71c3028ec52cd3681d" PRIMARY KEY ("team_id", "user_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_29718c15b653166d708c49b357" ON "teams_users" ("team_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2a578f7a5be3b6bec99bfb8d6a" ON "teams_users" ("user_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "teams_users" ADD CONSTRAINT "FK_29718c15b653166d708c49b357b" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "teams_users" ADD CONSTRAINT "FK_2a578f7a5be3b6bec99bfb8d6ac" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "teams_users" DROP CONSTRAINT "FK_2a578f7a5be3b6bec99bfb8d6ac"`
    );
    await queryRunner.query(
      `ALTER TABLE "teams_users" DROP CONSTRAINT "FK_29718c15b653166d708c49b357b"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2a578f7a5be3b6bec99bfb8d6a"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_29718c15b653166d708c49b357"`
    );
    await queryRunner.query(`DROP TABLE "teams_users"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_position_enum"`);
    await queryRunner.query(`DROP TYPE "public"."users_ability_enum"`);
    await queryRunner.query(`DROP TABLE "teams"`);
  }
}
