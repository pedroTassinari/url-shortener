import { hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';

import { Tenant } from '../../../entities/Tenant';
import { CreateTenantUseCase } from '../create-tenant-usecase';
import { ITenantRepository } from '../repositories/tenant-repository';

jest.mock('bcrypt');
jest.mock('uuid');

describe('CreateTenantUseCase', () => {
	let createTenantUseCase: CreateTenantUseCase;
	let tenantRepository: jest.Mocked<ITenantRepository>;

	beforeEach(() => {
		tenantRepository = {
			createTenant: jest.fn(),
		};
		createTenantUseCase = new CreateTenantUseCase(tenantRepository);
	});

	it('should create a tenant and return it with the plain API key', async () => {
		const name = 'Test Tenant';
		const apiKey = 'plain-api-key';
		const hashedApiKey = 'hashed-api-key';
		const tenant: Tenant = { apiKey: hashedApiKey, createdAt: new Date(), id: '1', name };

		(uuid as jest.Mock).mockReturnValue(apiKey);
		(hash as jest.Mock).mockResolvedValue(hashedApiKey);
		tenantRepository.createTenant.mockResolvedValue(tenant);

		const result = await createTenantUseCase.execute(name);

		expect(uuid).toHaveBeenCalled();
		expect(hash).toHaveBeenCalledWith(apiKey, 10);
		expect(tenantRepository.createTenant).toHaveBeenCalledWith({ apiKey: hashedApiKey, name });
		expect(result).toEqual({ ...tenant, apiKey });
	});
});
