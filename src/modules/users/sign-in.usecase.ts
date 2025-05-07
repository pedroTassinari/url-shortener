import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

import { AppError } from '../../AppError';
import { IUserRepository } from './repositories/user-repository';

export interface SignInResponse {
	accessToken: string;
	expiresIn: string;
	prefix: string;
}

interface SignInDTO {
	email: string;
	password: string;
}

export class SignInUseCase {
	private readonly tokenExpiresIn: string = '1h';
	private readonly tokenPrefix: string = 'Bearer';
	private readonly userRepository: IUserRepository;

	constructor(userRepository: IUserRepository) {
		this.userRepository = userRepository;
	}

	async execute(signInData: SignInDTO): Promise<SignInResponse> {
		const { email, password } = signInData;

		const user = await this.userRepository.findByEmail(email);

		if (!user) {
			throw new AppError('Invalid password or email', 401);
		}

		const doesPasswordMatch = await compare(password, user.password);

		if (!doesPasswordMatch) {
			throw new AppError('Invalid password or email', 401);
		}

		if (!process.env.JWT_SECRET) {
			throw new AppError('JWT secret not defined', 500);
		}

		const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
			expiresIn: '1h',
		});

		return {
			accessToken,
			expiresIn: this.tokenExpiresIn,
			prefix: this.tokenPrefix,
		};
	}
}
