import type { UserConfig } from '@commitlint/types' with { 'resolution-mode': 'import' };

const Configuration: UserConfig = {
	/*
	 * Whether commitlint uses the default ignore rules.
	 */
	defaultIgnores: true,
	/*
	 * Resolve and load @commitlint/config-conventional from node_modules.
	 * Referenced packages must be installed
	 */
	extends: ['@commitlint/config-conventional'],
	/*
	 * Custom URL to show upon failure
	 */
	helpUrl: 'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',
	/*
	 * Any rules defined here will override rules from @commitlint/config-conventional
	 */
	rules: {
		'body-max-line-length': [0, 'always', 100],
		'header-max-length': [0, 'always', 100],
		'scope-case': [2, 'always', ['lower-case', 'kebab-case']],
		'scope-enum': [2, 'always', ['auth']],
		'type-enum': [
			2,
			'always',
			['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test', 'sample'],
		],
	},
};

export default Configuration;
