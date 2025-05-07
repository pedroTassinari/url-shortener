import { Request, Response, Router } from 'express';

import { tenantsRoutes } from './modules/tenants/tenants.routes';
import { accessShortUrlController, urlsRoutes } from './modules/urls/urls.routes';
import { usersRoutes } from './modules/users/users.routes';

const router = Router();

router.use('/tenants', tenantsRoutes);
router.use('/users', usersRoutes);
router.use('/urls', urlsRoutes);
router.get('/:shortUrlCode', (request: Request, response: Response) => accessShortUrlController.handle(request, response));

export { router };
