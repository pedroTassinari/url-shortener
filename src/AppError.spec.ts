import { AppError } from './AppError';

describe('AppError', () => {
	it('should create an AppError with a message and status code', () => {
		const error = new AppError('Test error message', 401);

		expect(error).toBeInstanceOf(AppError);
		expect(error.message).toBe('Test error message');
		expect(error.statusCode).toBe(401);
	});

	it('should default the status code to 500 if not provided', () => {
		const error = new AppError('Test error message');

		expect(error.statusCode).toBe(400);
	});
});
