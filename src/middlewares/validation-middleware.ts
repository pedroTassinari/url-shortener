import { RequestHandler } from 'express';
import { z, ZodTypeAny } from 'zod';

const validate = (schema: ZodTypeAny, source: 'body' | 'headers' | 'params' | 'query'): RequestHandler => {
	return async (req, res, next) => {
		try {
			await schema.parseAsync(req[source]);
			next();
		} catch (err) {
			if (err instanceof z.ZodError) {
				res.status(400).json({
					errors: err.errors.map((error) => error.message),
					message: `Invalid ${source} schema`,
				});
			} else {
				next(err);
			}
		}
	};
};

const validateRequestBody = (schema: ZodTypeAny): RequestHandler => {
	return validate(schema, 'body');
};

const validateRequestParams = (schema: ZodTypeAny): RequestHandler => {
	return validate(schema, 'params');
};

const validateRequestQuery = (schema: ZodTypeAny): RequestHandler => {
	return validate(schema, 'query');
};

const validateRequestHeaders = (schema: ZodTypeAny): RequestHandler => {
	return validate(schema, 'headers');
};

export { validateRequestBody, validateRequestHeaders, validateRequestParams, validateRequestQuery };
