import { Request, Response } from 'express';

import { CreateUserUseCase } from './create-user-usecase';
import { CreateUserHeadersSchema, CreateUserSchema } from './schemas/create-user-schema';

export class CreateUserController {
	private readonly createUserUseCase: CreateUserUseCase;

	constructor(createUserUseCase: CreateUserUseCase) {
		this.createUserUseCase = createUserUseCase;
	}

	async handle(request: Request, response: Response) {
		const { email, name, password } = request.body as CreateUserSchema;

		const apiKey = (request.headers as CreateUserHeadersSchema)['x-api-key'];

		const user = await this.createUserUseCase.execute({ apiKey, email, name, password });

		//FIXME: This is a temporary solution to avoid sending the password hash in the response

		return void response.status(200).json(user);
	}
}
