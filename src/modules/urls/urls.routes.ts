import 'reflect-metadata';
import { Request, Response, Router } from 'express';

import { validateRequestBody } from '../../middlewares';
import { ensureAuthenticated } from '../../middlewares/authentication-middleware';
import { UserRepository } from '../users/repositories/user-repository';
import { AccessShortUrlController } from './access-short-url-controller';
import { AccessShortUrlUseCase } from './access-short-url-use-case';
import { UrlRepository } from './repositories/url-repository';
import { shortenUrlSchema } from './schemas/shorten-url-schema';
import { ShortenUrlController } from './shorten-url-controller';
import { ShortenUrlUseCase } from './shorten-url-use-case';

const urlsRoutes = Router();

const urlRepository = new UrlRepository();
const userRepository = new UserRepository();

const shortenUrlUseCase = new ShortenUrlUseCase(urlRepository, userRepository);
const shortenUrlController = new ShortenUrlController(shortenUrlUseCase);

const accessShortUrlUseCase = new AccessShortUrlUseCase(urlRepository);
const accessShortUrlController = new AccessShortUrlController(accessShortUrlUseCase);

urlsRoutes.post(
	'/shorten',
	ensureAuthenticated(),
	validateRequestBody(shortenUrlSchema),
	(request: Request, response: Response) => shortenUrlController.handle(request, response)
);

export { accessShortUrlController, urlsRoutes };
