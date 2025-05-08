import 'reflect-metadata';
import { Request, Response, Router } from 'express';

import { validateRequestBody, validateRequestParams } from '../../middlewares';
import { ensureAuthenticated } from '../../middlewares/authentication-middleware';
import { UserRepository } from '../users/repositories/user-repository';
import { AccessShortUrlController } from './controllers/access-short-url-controller';
import { DeleteShortenUrlController } from './controllers/delete-shorten-url-controller';
import { ListShortenUrlsController } from './controllers/list-shorten-urls-controller';
import { ShortenUrlController } from './controllers/shorten-url-controller';
import { UpdateShortenUrlController } from './controllers/update-shorten-url-controller';
import { UrlRepository } from './repositories/url-repository';
import { deleteShortenUrlParamsSchema } from './schemas/delete-shorten-url-schema';
import { shortenUrlSchema } from './schemas/shorten-url-schema';
import { updateShortenUrlParamsSchema, updateShortenUrlSchema } from './schemas/update-shorten-url-schema';
import { AccessShortUrlUseCase } from './usecases/access-short-url-use-case';
import { DeleteShortenUrlUseCase } from './usecases/delete-shorten-url-use-case';
import { ListShortenUrlsUseCase } from './usecases/list-shorten-urls-use-case';
import { ShortenUrlUseCase } from './usecases/shorten-url-use-case';
import { UpdateShortenUrlUseCase } from './usecases/update-shorten-url-use-case';

const urlsRoutes = Router();

const urlRepository = new UrlRepository();
const userRepository = new UserRepository();

const shortenUrlUseCase = new ShortenUrlUseCase(urlRepository, userRepository);
const shortenUrlController = new ShortenUrlController(shortenUrlUseCase);

const accessShortUrlUseCase = new AccessShortUrlUseCase(urlRepository);
const accessShortUrlController = new AccessShortUrlController(accessShortUrlUseCase);

const listShortenUrlsUseCase = new ListShortenUrlsUseCase(urlRepository);
const listShortenUrlsController = new ListShortenUrlsController(listShortenUrlsUseCase);

urlsRoutes.post(
	'/shorten',
	ensureAuthenticated(),
	validateRequestBody(shortenUrlSchema),
	(request: Request, response: Response) => shortenUrlController.handle(request, response)
);

urlsRoutes.get('/', ensureAuthenticated(), (request: Request, response: Response) =>
	listShortenUrlsController.handle(request, response)
);

const updateShortenUrlUseCase = new UpdateShortenUrlUseCase(urlRepository);
const updateShortenUrlController = new UpdateShortenUrlController(updateShortenUrlUseCase);

urlsRoutes.patch(
	'/:id',
	validateRequestParams(updateShortenUrlParamsSchema),
	validateRequestBody(updateShortenUrlSchema),
	ensureAuthenticated(),
	(request: Request, response: Response) => updateShortenUrlController.handle(request, response)
);

const deleteShortenUrlUseCase = new DeleteShortenUrlUseCase(urlRepository);
const deleteShortenUrlController = new DeleteShortenUrlController(deleteShortenUrlUseCase);

urlsRoutes.delete(
	'/:id',
	validateRequestParams(deleteShortenUrlParamsSchema),
	ensureAuthenticated(),
	(request: Request, response: Response) => deleteShortenUrlController.handle(request, response)
);

export { accessShortUrlController, urlsRoutes };
