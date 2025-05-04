import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTenantsTable1746373786244 implements MigrationInterface {
	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('tenants');
	}

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				columns: [
					{
						isPrimary: true,
						name: 'id',
						type: 'uuid',
					},
					{
						isNullable: false,
						name: 'name',
						type: 'varchar(100)',
					},
					{
						isNullable: false,
						name: 'api_key',
						type: 'varchar(60)',
					},
					{
						default: 'now()',
						name: 'created_at',
						type: 'timestamp',
					},
					{
						isNullable: true,
						name: 'updated_at',
						type: 'timestamp',
					},
					{
						isNullable: true,
						name: 'deleted_at',
						type: 'timestamp',
					},
				],
				name: 'tenants',
			})
		);
	}
}
