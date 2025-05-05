import { z } from 'zod';

export const createTenantSchema = z.object({
	name: z
		.string({
			invalid_type_error: 'Name must be a string',
			required_error: 'Name is required',
		})
		.min(3, {
			message: 'Name must be at least 3 characters long',
		})
		.max(100, {
			message: 'Name must be at most 100 characters long',
		}),
});

export type CreateTenantSchema = z.infer<typeof createTenantSchema>;
