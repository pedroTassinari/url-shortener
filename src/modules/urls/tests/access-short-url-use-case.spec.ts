import { Url } from '@entities/Url';

import { AppError } from '../../../AppError';
import { AccessShortUrlUseCase } from '../access-short-url-use-case';
import { IUrlRepository } from '../repositories/url-repository';

describe('AccessShortUrlUseCase', () => {
	let accessShortUrlUseCase: AccessShortUrlUseCase;
	let urlRepository: jest.Mocked<IUrlRepository>;

	beforeEach(() => {
		urlRepository = {
			findByCode: jest.fn(),
			incrementAccessCount: jest.fn(),
		} as unknown as jest.Mocked<IUrlRepository>;

		accessShortUrlUseCase = new AccessShortUrlUseCase(urlRepository);
	});

	it('should return the original URL when the code exists', async () => {
		const mockUrl = { originalUrl: 'http://example.com' } as Url;
		urlRepository.findByCode.mockResolvedValue(mockUrl);

		const result = await accessShortUrlUseCase.execute('abc123');

		expect(urlRepository.findByCode).toHaveBeenCalledWith('abc123');
		expect(urlRepository.incrementAccessCount).toHaveBeenCalledWith('abc123');
		expect(result).toBe('http://example.com');
	});

	it('should throw an error if the code does not exist', async () => {
		urlRepository.findByCode.mockResolvedValue(null);

		await expect(accessShortUrlUseCase.execute('nonexistentCode')).rejects.toEqual(new AppError('URL not found', 404));

		expect(urlRepository.findByCode).toHaveBeenCalledWith('nonexistentCode');
		expect(urlRepository.incrementAccessCount).not.toHaveBeenCalled();
	});

	it('should increment the access count when the URL is accessed', async () => {
		const mockUrl = { originalUrl: 'http://example.com' } as Url;
		urlRepository.findByCode.mockResolvedValue(mockUrl);

		await accessShortUrlUseCase.execute('abc123');

		expect(urlRepository.incrementAccessCount).toHaveBeenCalledWith('abc123');
	});
});
