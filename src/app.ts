import 'reflect-metadata';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';

import '../data-source';
import { AppError } from './AppError';
import { router } from './index.routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

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
