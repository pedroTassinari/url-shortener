import { z } from 'zod';

export const deleteShortenUrlParamsSchema = z.object({
	id: z
		.string({
			invalid_type_error: 'Id must be a string',
			required_error: 'Id is required',
		})
		.uuid({
			message: 'Id must be a valid uuid',
		}),
});
