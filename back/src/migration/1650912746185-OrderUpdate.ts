import {MigrationInterface, QueryRunner} from "typeorm";

export class OrderUpdate1650912746185 implements MigrationInterface {
    name = 'OrderUpdate1650912746185'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "isParticial" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "isParticial"`);
    }

}
