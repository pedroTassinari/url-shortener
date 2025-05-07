import { Request, Response } from 'express';

import { SignInSchema } from './schemas/sign-in-schema';
import { SignInUseCase } from './sign-in.usecase';

export class SignInController {
	private readonly signInUseCase: SignInUseCase;

	constructor(signInUseCase: SignInUseCase) {
		this.signInUseCase = signInUseCase;
	}

	async handle(request: Request, response: Response) {
		const { email, password } = request.body as SignInSchema;

		const { accessToken, expiresIn, prefix } = await this.signInUseCase.execute({ email, password });

		return void response.status(200).json({
			accessToken,
			expiresIn,
			prefix,
		});
	}
}
