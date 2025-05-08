import { z } from 'zod';

export const updateShortenUrlSchema = z.object({
	originalUrl: z
		.string({
			invalid_type_error: 'OriginalUrl must be a string',
			required_error: 'OriginalUrl is required',
		})
		.max(255, {
			message: 'OriginalUrl must be at most 255 characters long',
		})
		.url({
			message: 'Invalid URL',
		}),
});

export type UpdateShortenUrlSchema = z.infer<typeof updateShortenUrlSchema>;

export const updateShortenUrlParamsSchema = z.object({
	id: z
		.string({
			invalid_type_error: 'Id must be a string',
			required_error: 'Id is required',
		})
		.uuid({
			message: 'Id must be a valid uuid',
		}),
});
