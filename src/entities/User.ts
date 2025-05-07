import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
	UpdateDateColumn,
} from 'typeorm';
import { v7 as uuid } from 'uuid';

import { Tenant } from './Tenant';

@Entity({ name: 'users' })
export class User {
	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@DeleteDateColumn({ name: 'deleted_at' })
	deletedAt?: Date;

	@Column({ unique: true })
	email: string;

	@PrimaryColumn()
	id: string;

	@Column()
	name: string;

	@Column()
	password: string;

	@JoinColumn({ name: 'tenant_id' })
	@ManyToOne(() => Tenant)
	tenant: Tenant;

	@Column({ name: 'tenant_id' })
	tenantId: string;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt?: Date;

	constructor(name: string, email: string, password: string, tenantId: string) {
		this.id = uuid();
		this.name = name;
		this.email = email;
		this.password = password;
		this.tenantId = tenantId;
	}
}
