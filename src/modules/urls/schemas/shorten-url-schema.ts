import { z } from 'zod';

export const shortenUrlSchema = z.object({
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

export type ShortenUrlSchema = z.infer<typeof shortenUrlSchema>;
