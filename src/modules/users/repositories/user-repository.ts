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
	findByEmail(email: string): Promise<null | User>;
	findById(id: string): Promise<null | User>;
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

	/**
	 * Find a user by email
	 * @param email - The email of the user to be found
	 * @returns The found user or null if not found
	 */
	async findByEmail(email: string): Promise<null | User> {
		const user = await this.repository.findOne({
			where: { email },
		});

		return user;
	}

	/**
	 * Find a user by id
	 * @param id - The id of the user to be found
	 * @returns The found user or null if not found
	 */
	async findById(id: string): Promise<null | User> {
		const user = await this.repository.findOne({
			where: { id },
		});

		return user;
	}
}
