import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';

import '../data-source';
import { AppError } from './AppError';

const app = express();

app.use(express.json());

//eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _request: Request, response: Response, next: NextFunction) => {
	if (err instanceof AppError) {
		return void response.status(err.statusCode).json({
			message: err.message,
			status: 'error',
		});
	}

	console.error('err', JSON.stringify(err));

	return void response.status(500).json({
		message: 'internal server error',
		status: 'error',
	});
});

export { app };
