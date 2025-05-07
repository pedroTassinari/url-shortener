import { createId } from '@paralleldrive/cuid2';

import { Tenant } from '../../../entities/Tenant';
import { CreateTenantUseCase } from '../create-tenant-usecase';
import { ITenantRepository } from '../repositories/tenant-repository';

jest.mock('@paralleldrive/cuid2');

describe('CreateTenantUseCase', () => {
	let createTenantUseCase: CreateTenantUseCase;
	let tenantRepository: jest.Mocked<ITenantRepository>;

	beforeEach(() => {
		tenantRepository = {
			createTenant: jest.fn(),
			findByApiKey: jest.fn(),
		};
		createTenantUseCase = new CreateTenantUseCase(tenantRepository);
	});

	it('should create a tenant and return it with the plain API key', async () => {
		const name = 'Test Tenant';
		const apiKey = 'plain-api-key';
		const tenant: Tenant = { apiKey, createdAt: new Date(), id: '1', name };

		tenantRepository.createTenant.mockResolvedValue(tenant);
		(createId as jest.Mock).mockReturnValueOnce(apiKey);

		const result = await createTenantUseCase.execute(name);

		expect(tenantRepository.createTenant).toHaveBeenCalledWith({ apiKey, name });
		expect(result).toEqual({ ...tenant });
	});
});
