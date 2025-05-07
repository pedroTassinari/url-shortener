import { Repository } from 'typeorm';

import { AppDataSource } from '../../../../data-source';
import { Tenant } from '../../../entities/Tenant';

export interface ITenantRepository {
	createTenant(tenant: Pick<Tenant, 'apiKey' | 'name'>): Promise<Tenant>;
	findByApiKey(apiKey: string): Promise<null | Tenant>;
}

export class TenantRepository implements ITenantRepository {
	private repository: Repository<Tenant>;

	constructor() {
		this.repository = AppDataSource.getRepository(Tenant);
	}
	/**
	 * Create a new tenant
	 * @param tenant - The tenant to be created
	 * @returns The created tenant
	 */
	async createTenant(tenant: Tenant): Promise<Tenant> {
		const createdTenant = this.repository.create(tenant);

		return await this.repository.save(createdTenant);
	}

	/**
	 * Find a tenant by its API key
	 * @param apiKey - The API key of the tenant
	 * @returns The tenant if found, null otherwise
	 */
	findByApiKey(apiKey: string): Promise<null | Tenant> {
		return this.repository.findOne({ where: { apiKey } });
	}
}
