import { AppError } from '../../../AppError';
import { IUrlRepository } from '../repositories/url-repository';

interface UpdateShortenUrlDTO {
	id: string;
	originalUrl: string;
}

export class UpdateShortenUrlUseCase {
	private readonly urlRepository: IUrlRepository;

	constructor(urlRepository: IUrlRepository) {
		this.urlRepository = urlRepository;
	}

	async execute(dto: UpdateShortenUrlDTO): Promise<void> {
		const { id, originalUrl } = dto;

		const doesUrlExist = await this.urlRepository.existsById(id);

		if (!doesUrlExist) {
			throw new AppError('Url not found', 404);
		}

		const updatedOriginalUrl = await this.urlRepository.updateOriginalUrl(id, originalUrl);

		if (!updatedOriginalUrl) {
			throw new AppError('Could not update original url', 404);
		}

		return;
	}
}
