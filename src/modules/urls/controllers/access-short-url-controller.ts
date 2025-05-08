import { Response } from 'express';
import { Request } from 'types/express';

import { AccessShortUrlUseCase } from '../usecases/access-short-url-use-case';

export class AccessShortUrlController {
	private readonly accessShortUrlUseCase: AccessShortUrlUseCase;

	constructor(accessShortUrlUseCase: AccessShortUrlUseCase) {
		this.accessShortUrlUseCase = accessShortUrlUseCase;
	}

	async handle(request: Request, response: Response) {
		const { shortUrlCode } = request.params;

		const originalUrl = await this.accessShortUrlUseCase.execute(shortUrlCode);

		response.status(200).redirect(originalUrl);
	}
}
