module.exports = {
	extends: [
		'@craigmiller160/eslint-config-js',
		'@craigmiller160/eslint-config-prettier',
		'@craigmiller160/eslint-config-ts'
	],
	rules: {
		'no-restricted-imports': [
			'error',
			{
				patterns: [
					{
						group: ['fp-ts/es6/*'],
						message:
							'Use commonjs fp-ts import, with full name: "fp-ts/NAME"'
					}
				]
			}
		]
	}
};
