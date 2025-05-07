import { NextFunction, Request } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../AppError';

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		throw new AppError('Invalid JWT token!', 401);
	}

	const [prefix, token, ...invalidParts] = authHeader.split(' ');

	if (invalidParts.length > 0) {
		throw new AppError('Invalid JWT token', 401);
	}

	if (prefix !== 'Bearer') {
		throw new AppError('Invalid JWT token', 401);
	}

	if (!token) {
		throw new AppError('Invalid JWT token', 401);
	}

	if (!process.env.JWT_SECRET) {
		throw new AppError('JWT secret not defined', 500);
	}

	try {
		const decoded = verify(token, process.env.JWT_SECRET);
		const { id: authenticatedUserId } = decoded as { id: string };

		request.userId = authenticatedUserId;

		next();
		return;
	} catch {
		throw new AppError('Invalid JWT token', 401);
	}
}
