import { chromium, type FullConfig } from '@playwright/test';
const fs = require('fs-extra');

async function globalSetup(config: FullConfig) {
	console.log('Starting Global Setup');

	// Create browser and context with tracing
	const browser = await chromium.launch();
	const context = await browser.newContext({
		viewport: { width: 1920, height: 1080 },
		recordVideo: {
			dir: 'reports/videos/',
			size: { width: 1920, height: 1080 },
		},
	});

	// Start tracing
	await context.tracing.start({
		screenshots: true,
		snapshots: true,
		sources: true,
	});

	try {
		// Ensure reports directory exists
		await fs.ensureDir('./reports');
		await fs.ensureDir('./reports/videos');
		await fs.ensureDir('./reports/traces');

		// Create storage states directory if authentication is needed
		await fs.ensureDir('./e2e/login');

		// Example: Setup authentication state if needed
		if (process.env.BASE_URL && process.env.USER_EMAIL && process.env.USER_PASSWORD) {
			const page = await context.newPage();
			await page.goto(process.env.BASE_URL);
            
			// Add authentication logic here if needed
			// await page.fill('[data-testid="email"]', process.env.USER_EMAIL);
			// await page.fill('[data-testid="password"]', process.env.USER_PASSWORD);
			// await page.click('[data-testid="login-button"]');

			// Save storage state for authenticated state
			await context.storageState({
				path: './e2e/login/storageState.json',
			});

			await page.close();
		}

		// Copy any necessary test data or configurations
		try {
			await fs.copy('./e2e/testData', './reports/testData/', { overwrite: true });
		} catch (error) {
			console.log('No test data to copy or error copying:', error);
		}

	} catch (error) {
		console.error('Error during global setup:', error);
		throw error;
	} finally {
		// Stop tracing and save
		await context.tracing.stop({
			path: './reports/traces/global-setup-trace.zip',
		});

		// Cleanup
		await context.close();
		await browser.close();
	}

	console.log('Global Setup Completed Successfully');
}

export default globalSetup;