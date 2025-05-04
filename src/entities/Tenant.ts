import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v7 as uuid } from 'uuid';

@Entity({ name: 'tenants' })
export class Tenant {
	@Column({ name: 'api_key' })
	apiKey: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@DeleteDateColumn({ name: 'deleted_at' })
	deletedAt: Date;

	@PrimaryColumn()
	id: string;

	@Column()
	name: string;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	constructor(name: string, apiKey: string) {
		this.name = name;
		this.apiKey = apiKey;

		this.id = uuid();
	}
}
