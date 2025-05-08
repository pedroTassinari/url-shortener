import { Url } from '@entities/Url';

import { IUrlRepository } from '../repositories/url-repository';

export class ListShortenUrlsUseCase {
	private readonly urlRepository: IUrlRepository;

	constructor(urlRepository: IUrlRepository) {
		this.urlRepository = urlRepository;
	}

	async execute(userId: string): Promise<Url[]> {
		const urls = await this.urlRepository.findByUser(userId);

		return urls;
	}
}
