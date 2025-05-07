import { z } from 'zod';

export const createUserSchema = z
	.object({
		confirmPassword: z
			.string({
				invalid_type_error: 'Confirm password must be a string',
				required_error: 'Confirm password is required',
			})
			.min(8, {
				message: 'Confirm password must be at least 8 characters long',
			})
			.max(60, {
				message: 'Confirm password must be at most 60 characters long',
			})
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
				message:
					'Confirm password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
			}),
		email: z
			.string({
				invalid_type_error: 'Email must be a string',
				required_error: 'Email is required',
			})
			.min(3, {
				message: 'Email must be at least 3 characters long',
			})
			.max(60, {
				message: 'Email must be at most 60 characters long',
			})
			.email({
				message: 'Email must be a valid email address',
			}),
		name: z
			.string({
				invalid_type_error: 'Name must be a string',
				required_error: 'Name is required',
			})
			.min(3, {
				message: 'Name must be at least 3 characters long',
			})
			.max(60, {
				message: 'Name must be at most 60 characters long',
			}),
		password: z
			.string({
				invalid_type_error: 'Password must be a string',
				required_error: 'Password is required',
			})
			.min(8, {
				message: 'Password must be at least 8 characters long',
			})
			.max(60, {
				message: 'Password must be at most 60 characters long',
			})
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
				message:
					'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
			}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

export type CreateUserSchema = z.infer<typeof createUserSchema>;

export const createUserHeadersSchema = z.object({
	'x-api-key': z.string({
		invalid_type_error: 'API key must be a string',
		required_error: 'API key is required',
	}),
});

export type CreateUserHeadersSchema = z.infer<typeof createUserHeadersSchema>;
