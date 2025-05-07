import { createId } from '@paralleldrive/cuid2';

import { Tenant } from '../../entities/Tenant';
import { ITenantRepository } from './repositories/tenant-repository';

export class CreateTenantUseCase {
	private readonly tenantRepository: ITenantRepository;

	constructor(tenantRepository: ITenantRepository) {
		this.tenantRepository = tenantRepository;
	}

	async execute(name: string): Promise<Tenant> {
		const apiKey = createId();

		const tenant = await this.tenantRepository.createTenant({ apiKey, name });

		tenant.apiKey = apiKey;

		return tenant;
	}
}
