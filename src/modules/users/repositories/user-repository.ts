import { Repository } from 'typeorm';

import { AppDataSource } from '../../../../data-source';
import { User } from '../../../entities/User';

export interface CreateUserDTO {
	email: string;
	name: string;
	password: string;
	tenantId: string;
}

export interface IUserRepository {
	create(user: CreateUserDTO): Promise<User>;
}

export class UserRepository implements IUserRepository {
	private repository: Repository<User>;

	constructor() {
		this.repository = AppDataSource.getRepository(User);
	}

	/**
	 * Create a new user
	 * @param user - The user to be created
	 * @returns The created user
	 */
	async create(data: CreateUserDTO): Promise<User> {
		const { email, name, password, tenantId } = data;
		const user = new User(name, email, password, tenantId);

		const createdUser = this.repository.create(user);

		return await this.repository.save(createdUser);
	}
}
