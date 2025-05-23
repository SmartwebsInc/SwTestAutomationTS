module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
	},
	plugins: ['@typescript-eslint'],
	rules: {
		indent: ['error', 'tab', { SwitchCase: 1 }],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'object-curly-spacing': ['error', 'always'],
		'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
		'comma-spacing': ['error', { before: false, after: true }],
		'comma-dangle': ['error', 'always-multiline'],
		'keyword-spacing': ['error', { before: true, after: true }],
		'space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
		'no-trailing-spaces': ['error', { skipBlankLines: true, ignoreComments: true }],
		'space-before-blocks': ['error', { functions: 'always', keywords: 'always', classes: 'always' }],
		'key-spacing': ['error', { beforeColon: false, afterColon: true }],
		'spaced-comment': ['error', 'always'],
		'no-mixed-spaces-and-tabs': 'error',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'no-undef': 'off',
		'linebreak-style': 'off',
		'prefer-const': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'no-empty-pattern': 'off',
		'no-case-declarations': 'off',
		'no-useless-escape': 'off',
		'@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
		'no-async-promise-executor': 'off',
	},
};
