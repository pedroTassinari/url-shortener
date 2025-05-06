import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1746573528961 implements MigrationInterface {
	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users');
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
						name: 'tenant_id',
						type: 'uuid',
					},
					{
						isNullable: false,
						isUnique: true,
						name: 'email',
						type: 'varchar(60)',
					},
					{
						isNullable: false,
						name: 'password',
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
				foreignKeys: [
					{
						columnNames: ['tenant_id'],
						name: 'FK_users_tenant_id',
						onDelete: 'CASCADE',
						referencedColumnNames: ['id'],
						referencedTableName: 'tenants',
					},
				],
				name: 'users',
			})
		);
	}
}
