import { Repository } from 'typeorm';

import { AppDataSource } from '../../../../data-source';
import { Url } from '../../../entities/Url';

export interface IUrlRepository {
	create(tenant: Pick<Url, 'code' | 'originalUrl' | 'tenantId' | 'userId'>): Promise<Url>;
	findByCode(code: string): Promise<null | Url>;
	incrementAccessCount(code: string): Promise<void>;
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

	/**
	 * Increment the access count of a url
	 * @param code - The code of the url to be updated
	 */
	async incrementAccessCount(code: string): Promise<void> {
		await this.repository.increment({ code }, 'clickCount', 1);
	}
}
