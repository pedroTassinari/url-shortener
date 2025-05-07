import { User } from '@entities/User';
import { validate as isUuidValid } from 'uuid';

import { AppError } from '../../../AppError';
import { IUserRepository } from '../../users/repositories/user-repository';
import { IUrlRepository } from '../repositories/url-repository';
import { ShortenUrlUseCase } from '../shorten-url-use-case';

jest.mock('uuid', () => ({
	validate: jest.fn(),
}));

describe('ShortenUrlUseCase', () => {
	let shortenUrlUseCase: ShortenUrlUseCase;
	let urlRepository: jest.Mocked<IUrlRepository>;
	let userRepository: jest.Mocked<IUserRepository>;

	beforeEach(() => {
		urlRepository = {
			create: jest.fn(),
		} as unknown as jest.Mocked<IUrlRepository>;

		userRepository = {
			findById: jest.fn(),
		} as unknown as jest.Mocked<IUserRepository>;

		shortenUrlUseCase = new ShortenUrlUseCase(urlRepository, userRepository);
	});

	it('should shorten a URL successfully with a valid user', async () => {
		const mockUser = { id: 'user123', tenantId: 'tenant123' } as User;
		userRepository.findById.mockResolvedValue(mockUser);
		(isUuidValid as jest.Mock).mockReturnValue(true);
		process.env.APP_URL = 'http://localhost';

		const result = await shortenUrlUseCase.execute({
			originalUrl: 'http://example.com',
			userId: 'user123',
		});

		expect(userRepository.findById).toHaveBeenCalledWith('user123');
		expect(urlRepository.create).toHaveBeenCalledWith({
			code: 'mocked-id',
			originalUrl: 'http://example.com',
			tenantId: 'tenant123',
			userId: 'user123',
		});
		expect(result).toEqual({ url: 'http://localhost/mocked-id' });
	});

	it('should shorten a URL successfully without a user (default tenant)', async () => {
		process.env.DEFAULT_TENANT_ID = 'defaultTenant';
		(isUuidValid as jest.Mock).mockReturnValue(true);
		process.env.APP_URL = 'http://localhost';

		const result = await shortenUrlUseCase.execute({
			originalUrl: 'http://example.com',
		});

		expect(urlRepository.create).toHaveBeenCalledWith({
			code: 'mocked-id',
			originalUrl: 'http://example.com',
			tenantId: 'defaultTenant',
			userId: undefined,
		});
		expect(result).toEqual({ url: 'http://localhost/mocked-id' });
	});

	it('should throw an error if the tenant ID is invalid', async () => {
		process.env.DEFAULT_TENANT_ID = 'invalidTenant';
		(isUuidValid as jest.Mock).mockReturnValue(false);

		await expect(shortenUrlUseCase.execute({ originalUrl: 'http://example.com' })).rejects.toEqual(
			new AppError('Tenant not found or invalid', 500)
		);
	});

	it('should throw an error if the user is not found', async () => {
		userRepository.findById.mockResolvedValue(null);

		await expect(
			shortenUrlUseCase.execute({
				originalUrl: 'http://example.com',
				userId: 'nonexistentUser',
			})
		).rejects.toEqual(new AppError('User not found', 404));
	});

	it('should throw an error if APP_URL is not defined', async () => {
		const mockUser = { id: 'user123', tenantId: 'tenant123' } as User;
		userRepository.findById.mockResolvedValue(mockUser);
		(isUuidValid as jest.Mock).mockReturnValue(true);
		delete process.env.APP_URL;

		await expect(
			shortenUrlUseCase.execute({
				originalUrl: 'http://example.com',
				userId: 'user123',
			})
		).rejects.toEqual(new AppError('APP_URL not defined', 500));
	});
});
