import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1650909134956 implements MigrationInterface {
    name = 'Init1650909134956'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "customer" character varying(64) NOT NULL, "milk" integer DEFAULT '0', "skins" integer DEFAULT '0', "created" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_063f4db3e08b038ac30de00122" ON "order" ("customer") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_063f4db3e08b038ac30de00122"`);
        await queryRunner.query(`DROP TABLE "order"`);
    }

}
