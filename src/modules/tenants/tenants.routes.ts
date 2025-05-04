import 'reflect-metadata';
import { Request, Response, Router } from 'express';

import { CreateTenantController } from './create-tenant-controller';
import { CreateTenantUseCase } from './create-tenant-usecase';
import { TenantRepository } from './repositories/tenant-repository';

const tenantsRoutes = Router();

const tenantRepository = new TenantRepository();

const createTenantUseCase = new CreateTenantUseCase(tenantRepository);
const createTenantController = new CreateTenantController(createTenantUseCase);

tenantsRoutes.post('/', (request: Request, response: Response) => createTenantController.handle(request, response));

export { tenantsRoutes };
