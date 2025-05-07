import { AppError } from '../../AppError';
import { IUrlRepository } from './repositories/url-repository';

export class AccessShortUrlUseCase {
	private readonly urlRepository: IUrlRepository;

	constructor(urlRepository: IUrlRepository) {
		this.urlRepository = urlRepository;
	}

	async execute(code: string): Promise<string> {
		const url = await this.urlRepository.findByCode(code);

		if (!url) {
			throw new AppError('URL not found', 404);
		}

		await this.urlRepository.incrementAccessCount(code);

		return url.originalUrl;
	}
}
