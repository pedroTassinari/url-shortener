import { hash } from 'bcrypt';

import { AppError } from '../../AppError';
import { User } from '../../entities/User';
import { ITenantRepository } from '../tenants/repositories/tenant-repository';
import { IUserRepository } from './repositories/user-repository';

interface CreateUserDTO {
	apiKey: string;
	email: string;
	name: string;
	password: string;
}

export class CreateUserUseCase {
	private readonly tenantRepository: ITenantRepository;
	private readonly userRepository: IUserRepository;

	constructor(userRepository: IUserRepository, tenantRepository: ITenantRepository) {
		this.userRepository = userRepository;
		this.tenantRepository = tenantRepository;
	}

	async execute(createUserDTO: CreateUserDTO): Promise<User> {
		const { apiKey, email, name, password } = createUserDTO;

		const tenant = await this.tenantRepository.findByApiKey(apiKey);

		if (!tenant) {
			throw new AppError('Tenant not found', 404);
		}

		const doesUserAlreadyExist = await this.userRepository.findByEmail(email);

		if (doesUserAlreadyExist) {
			throw new AppError('Invalid email', 400);
		}

		const passwordHash = await hash(password, 10);
		const user = await this.userRepository.create({ email, name, password: passwordHash, tenantId: tenant.id });

		return user;
	}
}
