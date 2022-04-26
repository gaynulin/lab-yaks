import {MigrationInterface, QueryRunner} from "typeorm";

export class OrderDay1650919296487 implements MigrationInterface {
    name = 'OrderDay1650919296487'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "day" integer NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "day"`);
    }

}
