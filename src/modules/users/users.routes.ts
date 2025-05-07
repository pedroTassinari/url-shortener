import 'reflect-metadata';
import { Request, Response, Router } from 'express';

import { validateRequestBody, validateRequestHeaders } from '../../middlewares';
import { TenantRepository } from '../tenants/repositories/tenant-repository';
import { CreateUserController } from './create-user-controller';
import { CreateUserUseCase } from './create-user-usecase';
import { UserRepository } from './repositories/user-repository';
import { createUserHeadersSchema, createUserSchema } from './schemas/create-user-schema';
import { signInSchema } from './schemas/sign-in-schema';
import { SignInController } from './sign-in-controller';
import { SignInUseCase } from './sign-in.usecase';

const usersRoutes = Router();

const userRepository = new UserRepository();
const tenantRepository = new TenantRepository();

const createUserUseCase = new CreateUserUseCase(userRepository, tenantRepository);
const createUserController = new CreateUserController(createUserUseCase);

const signInUseCase = new SignInUseCase(userRepository);
const signInController = new SignInController(signInUseCase);

usersRoutes.post(
	'/',
	validateRequestHeaders(createUserHeadersSchema),
	validateRequestBody(createUserSchema),
	(request: Request, response: Response) => createUserController.handle(request, response)
);

usersRoutes.post('/sign-in', validateRequestBody(signInSchema), (request: Request, response: Response) =>
	signInController.handle(request, response)
);

export { usersRoutes };
