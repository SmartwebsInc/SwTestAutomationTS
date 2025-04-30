import { chromium, type FullConfig } from '@playwright/test';
import { LoginPO } from './e2e/page-objects/login/LoginPO';
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
        // Ensure directories exist
        await fs.ensureDir('./reports');
        await fs.ensureDir('./reports/videos');
        await fs.ensureDir('./reports/traces');
        await fs.ensureDir('./e2e/auth');

        // Setup super admin authentication state
        const page = await context.newPage();
		const loginPO = new LoginPO(page);
        await page.goto(process.env.BASE_URL || '');
        
		// Call the login method for super admin
		await loginPO.login(process.env.ACC_SUPER_ADMIN_USERNAME, process.env.SUPER_ADMIN_PASSWORD);

        // Save super admin storage state
        await context.storageState({
            path: './e2e/auth/sa.json'
        });

		console.log('Super Admin Storage State Saved');

        await page.close();

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