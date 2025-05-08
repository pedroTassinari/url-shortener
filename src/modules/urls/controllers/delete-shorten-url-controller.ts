import { Response } from 'express';
import { Request } from 'types/express';

import { DeleteShortenUrlUseCase } from '../usecases/delete-shorten-url-use-case';

export class DeleteShortenUrlController {
	private readonly deleteShortenUrlUseCase: DeleteShortenUrlUseCase;

	constructor(deleteShortenUrlUseCase: DeleteShortenUrlUseCase) {
		this.deleteShortenUrlUseCase = deleteShortenUrlUseCase;
	}

	async handle(request: Request, response: Response) {
		const { id } = request.params;

		await this.deleteShortenUrlUseCase.execute(id);

		return void response.status(204).json();
	}
}
