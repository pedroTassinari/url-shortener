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
import { User } from './User';

@Entity({ name: 'urls' })
export class Url {
	@Column({ default: 0, name: 'click_count' })
	clickCount: number;

	@Column()
	code: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@DeleteDateColumn({ name: 'deleted_at' })
	deletedAt?: Date;

	@PrimaryColumn()
	id: string;

	@Column({ name: 'original_url' })
	originalUrl: string;

	@JoinColumn({ name: 'tenant_id' })
	@ManyToOne(() => Tenant)
	tenant: Tenant;

	@Column({ name: 'tenant_id' })
	tenantId: string;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt?: Date;

	@JoinColumn({ name: 'user_id' })
	@ManyToOne(() => User)
	user: User;

	@Column({ name: 'user_id', nullable: true })
	userId?: string;

	constructor(originalUrl: string, tenantId: string, code: string, userId?: string) {
		this.id = uuid();
		this.originalUrl = originalUrl;
		this.tenantId = tenantId;
		this.code = code;

		this.clickCount = 0;

		if (userId) {
			this.userId = userId;
		}
	}
}
