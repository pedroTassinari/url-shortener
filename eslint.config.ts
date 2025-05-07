/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import eslint from '@eslint/js';
import perfectionist from 'eslint-plugin-perfectionist';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	{
		ignores: ['**/*.js', './eslint.config.ts', './commitlint.config.ts', './pgdata', 'babel.config.js'],
	},
	eslint.configs.recommended,
	tseslint.configs.strictTypeChecked,
	tseslint.configs.stylisticTypeChecked,
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: __dirname,
			},
		},
	},
	perfectionist.configs['recommended-natural'],
	eslintPluginPrettierRecommended,
	{
		rules: {
			'@typescript-eslint/only-throw-error': 'off',
			'@typescript-eslint/unbound-method': 'off',
			'@typescript-eslint/no-misused-spread': 'off',
		},
	}
);
