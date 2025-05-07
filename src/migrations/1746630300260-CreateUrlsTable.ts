import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUrlsTable1746630300260 implements MigrationInterface {
	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('urls');
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
						isNullable: true,
						name: 'user_id',
						type: 'uuid',
					},
					{
						isNullable: false,
						isUnique: true,
						name: 'original_url',
						type: 'varchar(255)',
					},
					{
						isNullable: false,
						name: 'code',
						type: 'varchar(6)',
					},
					{
						default: 0,
						isNullable: false,
						name: 'click_count',
						type: 'int',
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
						name: 'FK_urls_tenant_id',
						onDelete: 'CASCADE',
						referencedColumnNames: ['id'],
						referencedTableName: 'tenants',
					},
					{
						columnNames: ['user_id'],
						name: 'FK_urls_user_id',
						onDelete: 'CASCADE',
						referencedColumnNames: ['id'],
						referencedTableName: 'users',
					},
				],
				name: 'urls',
			})
		);
	}
}
