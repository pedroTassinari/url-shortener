import { hash } from 'bcrypt';

import { AppError } from '../../../AppError';
import { User } from '../../../entities/User';
import { ITenantRepository } from '../../tenants/repositories/tenant-repository';
import { CreateUserUseCase } from '../create-user-usecase';
import { IUserRepository } from '../repositories/user-repository';

jest.mock('bcrypt');

describe('CreateUserUseCase', () => {
	let createUserUseCase: CreateUserUseCase;
	let tenantRepository: jest.Mocked<ITenantRepository>;
	let userRepository: jest.Mocked<IUserRepository>;

	beforeEach(() => {
		tenantRepository = {
			findByApiKey: jest.fn(),
		} as unknown as jest.Mocked<ITenantRepository>;

		userRepository = {
			create: jest.fn(),
			findByEmail: jest.fn(),
		} as unknown as jest.Mocked<IUserRepository>;

		createUserUseCase = new CreateUserUseCase(userRepository, tenantRepository);
	});

	it('should create a user when the tenant exists', async () => {
		const createUserDTO = {
			apiKey: 'valid-api-key',
			email: 'test@example.com',
			name: 'Test User',
			password: 'password123',
		};

		const tenant = {
			apiKey: 'valid-api-key',
			createdAt: new Date(),
			id: 'tenant-id',
			name: 'Test Tenant',
			updatedAt: new Date(),
		};

		const hashedPassword = 'hashed-password';
		const user: User = {
			createdAt: new Date(),
			email: createUserDTO.email,
			id: 'user-id',
			name: createUserDTO.name,
			password: hashedPassword,
			tenantId: tenant.id,
			updatedAt: new Date(),
		} as User;

		tenantRepository.findByApiKey.mockResolvedValue(tenant);
		(hash as jest.Mock).mockResolvedValue(hashedPassword);
		userRepository.create.mockResolvedValue(user);

		const result = await createUserUseCase.execute(createUserDTO);

		expect(tenantRepository.findByApiKey).toHaveBeenCalledWith(createUserDTO.apiKey);
		expect(hash).toHaveBeenCalledWith(createUserDTO.password, 10);
		expect(userRepository.create).toHaveBeenCalledWith({
			email: createUserDTO.email,
			name: createUserDTO.name,
			password: hashedPassword,
			tenantId: tenant.id,
		});
		expect(result).toEqual(user);
	});

	it('should throw an error when the tenant is not found', async () => {
		const createUserDTO = {
			apiKey: 'invalid-api-key',
			email: 'test@example.com',
			name: 'Test User',
			password: 'password123',
		};

		tenantRepository.findByApiKey.mockResolvedValue(null);

		await expect(() => createUserUseCase.execute(createUserDTO)).rejects.toBeInstanceOf(AppError);
		expect(tenantRepository.findByApiKey).toHaveBeenCalledWith(createUserDTO.apiKey);
		expect(userRepository.create).not.toHaveBeenCalled();
	});

	it('should hash the password before creating the user', async () => {
		const createUserDTO = {
			apiKey: 'valid-api-key',
			email: 'test@example.com',
			name: 'Test User',
			password: 'password123',
		};

		const tenant = {
			apiKey: 'valid-api-key',
			createdAt: new Date(),
			id: 'tenant-id',
			name: 'Test Tenant',
			updatedAt: new Date(),
		};

		const hashedPassword = 'hashed-password';

		tenantRepository.findByApiKey.mockResolvedValue(tenant);
		(hash as jest.Mock).mockResolvedValue(hashedPassword);

		await createUserUseCase.execute(createUserDTO);

		expect(hash).toHaveBeenCalledWith(createUserDTO.password, 10);
	});
});
