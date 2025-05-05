import { Request, Response } from 'express';

import { CreateTenantUseCase } from './create-tenant-usecase';
import { CreateTenantSchema } from './schemas/create-tenant-schema';

export class CreateTenantController {
	private readonly createTenantUseCase: CreateTenantUseCase;

	constructor(createTenantUseCase: CreateTenantUseCase) {
		this.createTenantUseCase = createTenantUseCase;
	}

	async handle(request: Request, response: Response) {
		const { name } = request.body as CreateTenantSchema;

		const tenant = await this.createTenantUseCase.execute(name);

		return void response.status(200).json(tenant);
	}
}
