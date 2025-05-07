import { Repository } from 'typeorm';

import { AppDataSource } from '../../../../data-source';
import { Url } from '../../../entities/Url';

export interface IUrlRepository {
	create(tenant: Pick<Url, 'code' | 'originalUrl' | 'tenantId' | 'userId'>): Promise<Url>;
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
}
