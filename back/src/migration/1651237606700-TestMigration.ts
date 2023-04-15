import {MigrationInterface, QueryRunner} from "typeorm";

export class TestMigration1651237606700 implements MigrationInterface {
    name = 'TestMigration1651237606700'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_063f4db3e08b038ac30de00122"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "customer"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "customer" character varying(128) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "created" SET DEFAULT '"2022-04-29T13:06:48.076Z"'`);
        await queryRunner.query(`CREATE INDEX "IDX_063f4db3e08b038ac30de00122" ON "order" ("customer") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_063f4db3e08b038ac30de00122"`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "created" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "customer"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "customer" character varying(64) NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_063f4db3e08b038ac30de00122" ON "order" ("customer") `);
    }

}
