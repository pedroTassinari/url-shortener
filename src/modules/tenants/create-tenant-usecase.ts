import { hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';

import { Tenant } from '../../entities/Tenant';
import { ITenantRepository } from './repositories/tenant-repository';

export class CreateTenantUseCase {
	private readonly tenantRepository: ITenantRepository;

	constructor(tenantRepository: ITenantRepository) {
		this.tenantRepository = tenantRepository;
	}

	async execute(name: string): Promise<Tenant> {
		const apiKey = uuid();

		const apyKeyHash = await hash(apiKey, 10);
		const tenant = await this.tenantRepository.createTenant({ apiKey: apyKeyHash, name });

		tenant.apiKey = apiKey;

		return tenant;
	}
}
