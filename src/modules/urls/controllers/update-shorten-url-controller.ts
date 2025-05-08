import { Response } from 'express';
import { Request } from 'types/express';

import { UpdateShortenUrlSchema } from '../schemas/update-shorten-url-schema';
import { UpdateShortenUrlUseCase } from '../usecases/update-shorten-url-use-case';

export class UpdateShortenUrlController {
	private readonly updateShortenUrlUseCase: UpdateShortenUrlUseCase;

	constructor(updateShortenUrlUseCase: UpdateShortenUrlUseCase) {
		this.updateShortenUrlUseCase = updateShortenUrlUseCase;
	}

	async handle(request: Request, response: Response) {
		const { originalUrl } = request.body as UpdateShortenUrlSchema;
		const { id } = request.params;

		await this.updateShortenUrlUseCase.execute({
			id,
			originalUrl,
		});

		return void response.status(204).json();
	}
}
