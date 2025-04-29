import type { PlaywrightTestConfig, ReporterDescription } from '@playwright/test';
import { devices } from '@playwright/test';

require('dotenv').config();

const config: PlaywrightTestConfig = {
	testDir: './e2e/tests',
	timeout: 100 * 1000,
	fullyParallel: true,
	expect: {
		timeout: 20000,
	},
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 1,
	workers: process.env.CI ? 4 : 4,
	reporter: process.env.CI ? [
		['list', { outputFolder: 'reports/list/' }],
		['playwright-qase-reporter',
			{
				debug: false,
				testops: {
					mode: 'testops',
					api: {
						token: process.env.QASE_API_TOKEN,
					},
					project: process.env.QASE_PROJECT_CODE,
					basePath: process.env.QASE_API_BASE_URL,
					uploadAttachments: true,
					run: {
						complete: true,
						id: process.env.QASE_RUN_ID,
					},
				},
			},
		],
		['html', { outputFolder: 'reports/html/' }],
		['blob', { outputDir: 'all-blob-reports' }],
		['./testcase-updates-reporter.ts'],
	]: [
		['list', { outputFolder: 'reports/list/' }],
		['html', { outputFolder: 'reports/html/' }],
	],
	globalSetup: require.resolve('./global-setup'),
	globalTeardown: require.resolve('./global-teardown'),
	use: {
		actionTimeout: 40000,
		baseURL: process.env.BASE_URL,
		headless: true,
		trace: 'retain-on-failure',
		screenshot: 'only-on-failure',
		video: 'retain-on-failure',
		permissions: ['clipboard-read'],
		contextOptions: {
			recordVideo: {
				dir: 'reports/videos/',
			},
		},
	},
	projects: [
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
				launchOptions: {
					args: ['--no-sandbox'],
				},
			},
		},
	],
	outputDir: 'reports/artifacts/',
	snapshotPathTemplate: './e2e/screenshots/{arg}{ext}',
};

export default config;