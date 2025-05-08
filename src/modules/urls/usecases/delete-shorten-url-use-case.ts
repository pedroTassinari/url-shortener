import { AppError } from '../../../AppError';
import { IUrlRepository } from '../repositories/url-repository';

export class DeleteShortenUrlUseCase {
	private readonly urlRepository: IUrlRepository;

	constructor(urlRepository: IUrlRepository) {
		this.urlRepository = urlRepository;
	}

	async execute(id: string): Promise<void> {
		const doesUrlExist = await this.urlRepository.existsById(id);

		if (!doesUrlExist) {
			throw new AppError('Url not found', 404);
		}

		await this.urlRepository.deleteById(id);

		return;
	}
}
