import { nanoid } from 'nanoid';
import { validate as isUuidValid } from 'uuid';

import { AppError } from '../../AppError';
import { IUserRepository } from '../users/repositories/user-repository';
import { IUrlRepository } from './repositories/url-repository';

interface ShortenUrlDTO {
	originalUrl: string;
	userId?: string;
}

interface ShortenUrlResponse {
	url: string;
}

export class ShortenUrlUseCase {
	private readonly urlRepository: IUrlRepository;
	private readonly userRepository: IUserRepository;

	constructor(urlRepository: IUrlRepository, userRepository: IUserRepository) {
		this.urlRepository = urlRepository;
		this.userRepository = userRepository;
	}

	async execute(dto: ShortenUrlDTO): Promise<ShortenUrlResponse> {
		const { originalUrl, userId } = dto;

		const tenantId = userId ? await this.getUserTenantId(userId) : process.env.DEFAULT_TENANT_ID;

		if (!tenantId || !isUuidValid(tenantId)) {
			throw new AppError('Tenant not found or invalid', 500);
		}

		const urlCode = nanoid(6);

		await this.urlRepository.create({ code: urlCode, originalUrl, tenantId, userId });

		if (!process.env.APP_URL) {
			throw new AppError('APP_URL not defined', 500);
		}

		return {
			url: `${process.env.APP_URL}/${urlCode}`,
		};
	}

	private async getUserTenantId(userId: string): Promise<string> {
		const user = await this.userRepository.findById(userId);

		if (!user) {
			throw new AppError('User not found', 404);
		}

		return user.tenantId;
	}
}
