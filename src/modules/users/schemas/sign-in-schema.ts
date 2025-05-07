import { z } from 'zod';

export const signInSchema = z.object({
	email: z.string({
		invalid_type_error: 'Email must be a string',
		required_error: 'Email is required',
	}),
	password: z.string({
		invalid_type_error: 'Password must be a string',
		required_error: 'Password is required',
	}),
});

export type SignInSchema = z.infer<typeof signInSchema>;
