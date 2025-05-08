import { IsNull, Not, Repository } from 'typeorm';

import { AppDataSource } from '../../../../data-source';
import { Url } from '../../../entities/Url';

export interface IUrlRepository {
	create(tenant: Pick<Url, 'code' | 'originalUrl' | 'tenantId' | 'userId'>): Promise<Url>;
	existsById(id: string): Promise<boolean>;
	findByCode(code: string): Promise<null | Url>;
	findByUser(userId: string): Promise<Url[]>;
	incrementAccessCount(code: string): Promise<void>;
	updateOriginalUrl(id: string, originalUrl: string): Promise<boolean>;
}

export class UrlRepository implements IUrlRepository {
	private repository: Repository<Url>;

	constructor() {
		this.repository = AppDataSource.getRepository(Url);
	}
	/**
	 * Create a new url
	 * @param url - The url to be created
	 * @returns The created url
	 */
	async create(url: Url): Promise<Url> {
		const createUrl = this.repository.create(url);

		return await this.repository.save(createUrl);
	}

	async existsById(id: string): Promise<boolean> {
		return await this.repository.exists({
			where: {
				deletedAt: IsNull(),
				id,
			},
		});
	}

	/**
	 * Find a url by code
	 * @param code - The code of the url to be found
	 * @returns The found url or null if not found
	 */
	async findByCode(code: string): Promise<null | Url> {
		const url = await this.repository.findOne({
			where: {
				code,
			},
		});

		return url;
	}

	async findByUser(userId: string): Promise<Url[]> {
		const urls = await this.repository.find({
			where: [{ userId: Not(IsNull()) }, { userId }],
		});

		return urls;
	}

	/**
	 * Increment the access count of a url
	 * @param code - The code of the url to be updated
	 */
	async incrementAccessCount(code: string): Promise<void> {
		await this.repository.increment({ code }, 'clickCount', 1);
	}

	async updateOriginalUrl(id: string, originalUrl: string): Promise<boolean> {
		const url = await this.repository.update(
			{
				id,
			},
			{
				originalUrl,
				updatedAt: new Date(),
			}
		);

		return !!(url.affected && url.affected > 0);
	}
}
