import { test as base, Browser, BrowserContext, Page, TestInfo } from '@playwright/test';
import * as path from 'path';

// Extend basic test fixtures
export type BaseFixtures = {
    attachVideos: void;
    context: BrowserContext;
};

export const baseTest = base.extend<BaseFixtures>({
	// Add video recording for failed tests
	attachVideos: async ({ }, use, testInfo: TestInfo) => {
		await use();
        
		if (testInfo.status === 'failed') {
			const videoDir = path.join(testInfo.outputPath(), 'videos');
			await testInfo.attach('video', {
				path: path.join(videoDir, `${testInfo.title}.webm`),
			});
		}
	},

	// Custom context with video recording
	context: async ({ browser }, use) => {
		const context = await browser.newContext({
			recordVideo: {
				dir: 'test-results/videos/',
			},
		});
		await use(context);
		await context.close();
	},
});

// Helper functions for creating custom contexts and pages
export async function createCustomContext(
	browser: Browser,
	testInfo: TestInfo,
	options: any = {},
): Promise<BrowserContext> {
	const videoDir = path.join(testInfo.outputPath(), 'videos');
	const context = await browser.newContext({
		...options,
		recordVideo: { dir: videoDir },
	});
	return context;
}

export async function createCustomPage(
	browser: Browser,
	testInfo: TestInfo,
	options: any = {},
): Promise<Page> {
	const context = await createCustomContext(browser, testInfo, options);
	return await context.newPage();
}

// Export common test utilities
export const expect = baseTest.expect;
export const describe = baseTest.describe;
export const test = baseTest;