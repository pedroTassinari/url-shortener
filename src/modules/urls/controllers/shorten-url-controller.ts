import { Response } from 'express';
import { Request } from 'types/express';

import { ShortenUrlSchema } from '../schemas/shorten-url-schema';
import { ShortenUrlUseCase } from '../usecases/shorten-url-use-case';

export class ShortenUrlController {
	private readonly shortenUrlUseCase: ShortenUrlUseCase;

	constructor(shortenUrlUseCase: ShortenUrlUseCase) {
		this.shortenUrlUseCase = shortenUrlUseCase;
	}

	async handle(request: Request, response: Response) {
		const { originalUrl } = request.body as ShortenUrlSchema;
		const userId = request.user?.id;

		const { url } = await this.shortenUrlUseCase.execute({
			originalUrl,
			userId,
		});

		return void response.status(200).json({ url });
	}
}
