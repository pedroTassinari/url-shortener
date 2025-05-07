import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

import { AppError } from '../../../AppError';
import { Tenant } from '../../../entities/Tenant';
import { User } from '../../../entities/User';
import { IUserRepository } from '../repositories/user-repository';
import { SignInUseCase } from '../sign-in.usecase';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('SignInUseCase', () => {
	let signInUseCase: SignInUseCase;
	let userRepository: jest.Mocked<IUserRepository>;

	beforeEach(() => {
		userRepository = {
			findByEmail: jest.fn(),
		} as unknown as jest.Mocked<IUserRepository>;

		signInUseCase = new SignInUseCase(userRepository);
	});

	it('should sign in successfully with valid credentials', async () => {
		const mockUser = {
			createdAt: new Date(),
			email: 'test@example.com',
			id: '123',
			name: 'Test User',
			password: 'hashedPassword',
			tenant: new Tenant('fake-tenant-id', 'fake-tenant-name'),
			tenantId: 'tenantId',
			updatedAt: new Date(),
		};
		userRepository.findByEmail.mockResolvedValue(mockUser);
		(compare as jest.Mock).mockResolvedValue(true);
		(jwt.sign as jest.Mock).mockReturnValue('mockToken');
		process.env.JWT_SECRET = 'mockSecret';

		const result = await signInUseCase.execute({ email: 'test@example.com', password: 'password' });

		expect(userRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
		expect(compare).toHaveBeenCalledWith('password', 'hashedPassword');
		expect(jwt.sign).toHaveBeenCalledWith({ id: '123' }, 'mockSecret', { expiresIn: '1h' });
		expect(result).toEqual({
			accessToken: 'mockToken',
			expiresIn: '1h',
			prefix: 'Bearer',
		});
	});

	it('should throw an error if the user is not found', async () => {
		userRepository.findByEmail.mockResolvedValue(null);

		await expect(signInUseCase.execute({ email: 'test@example.com', password: 'password' })).rejects.toEqual(
			new AppError('Invalid password or email', 401)
		);
	});

	it('should throw an error if the password does not match', async () => {
		const mockUser = new User('name', 'email@gmail.com', 'hashedPassword', '1234');
		userRepository.findByEmail.mockResolvedValue(mockUser);
		(compare as jest.Mock).mockResolvedValue(false);

		await expect(signInUseCase.execute({ email: 'test@example.com', password: 'wrongPassword' })).rejects.toEqual(
			new AppError('Invalid password or email', 401)
		);
	});

	it('should throw an error if JWT_SECRET is not defined', async () => {
		const mockUser = new User('name', 'email@gmail.com', 'hashedPassword', '1234');
		userRepository.findByEmail.mockResolvedValue(mockUser);
		(compare as jest.Mock).mockResolvedValue(true);
		delete process.env.JWT_SECRET;

		await expect(signInUseCase.execute({ email: 'test@example.com', password: 'password' })).rejects.toEqual(
			new AppError('JWT secret not defined', 500)
		);
	});
});
