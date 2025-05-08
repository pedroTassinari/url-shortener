import { Response } from 'express';
import { Request } from 'types/express';

import { ListShortenUrlsUseCase } from '../usecases/list-shorten-urls-use-case';

export class ListShortenUrlsController {
	private readonly listShortenUrlsUseCase: ListShortenUrlsUseCase;

	constructor(listShortenUrlsUseCase: ListShortenUrlsUseCase) {
		this.listShortenUrlsUseCase = listShortenUrlsUseCase;
	}

	async handle(request: Request, response: Response) {
		const { shortUrlCode } = request.params;

		const urls = await this.listShortenUrlsUseCase.execute(shortUrlCode);

		return void response.status(200).json(urls);
	}
}
