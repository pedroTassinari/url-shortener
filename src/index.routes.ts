import { Router } from 'express';

import { tenantsRoutes } from './modules/tenants/tenants.routes';

const router = Router();

router.use('/tenants', tenantsRoutes);

export { router };
