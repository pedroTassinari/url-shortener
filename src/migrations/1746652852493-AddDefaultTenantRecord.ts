import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDefaultTenantRecord1746652852493 implements MigrationInterface {
	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DELETE FROM "tenants" WHERE "id" = '3eff6d1b-eaff-4fc3-b754-d79282327351';`);
	}

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`INSERT INTO "tenants" ("id", "name", "api_key") VALUES ('3eff6d1b-eaff-4fc3-b754-d79282327351', 'Default Tenant', '3eff6d1beaff4fc3b754') ON CONFLICT DO NOTHING;`
		);
	}
}
