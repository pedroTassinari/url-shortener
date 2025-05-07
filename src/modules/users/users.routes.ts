import 'reflect-metadata';
import { Request, Response, Router } from 'express';

import { validateRequestBody, validateRequestHeaders } from '../../middlewares';
import { TenantRepository } from '../tenants/repositories/tenant-repository';
import { CreateUserController } from './create-user-controller';
import { CreateUserUseCase } from './create-user-usecase';
import { UserRepository } from './repositories/user-repository';
import { createUserSchema } from './schemas/create-user-schema';

const usersRoutes = Router();

const userRepository = new UserRepository();
const tenantRepository = new TenantRepository();

const createTenantUseCase = new CreateUserUseCase(userRepository, tenantRepository);
const createUserController = new CreateUserController(createTenantUseCase);

usersRoutes.post(
	'/',
	validateRequestHeaders(createUserSchema),
	validateRequestBody(createUserSchema),
	(request: Request, response: Response) => createUserController.handle(request, response)
);

export { usersRoutes };
