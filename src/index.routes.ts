import { Router } from 'express';

import { tenantsRoutes } from './modules/tenants/tenants.routes';
import { usersRoutes } from './modules/users/users.routes';

const router = Router();

router.use('/tenants', tenantsRoutes);
router.use('/users', usersRoutes);

export { router };
