import { test, expect } from '../../fixtures/BasePages';

interface PageInfo {
    pageName: string;
    url: string;
    expectedText: string;
    menuPath: [string, string];
}

test.describe('Page Load', () => {
	test.use({ storageState: 'e2e/auth/sa-storage-state.json' });

	const availablePages: PageInfo[] = [
		{
			pageName: 'Dashboard',
			url: '#/violations/dashboard',
			expectedText: 'Violations Dashboard',
			menuPath: ['Violations', 'Dashboard'],
		},
		{
			pageName: 'Add Violation',
			url: '/#/violations/list',
			expectedText: 'Find Owner/Unit',
			menuPath: ['Violations', 'Add'],
		},
		{
			pageName: 'Queued',
			url: '#/violations/queued',
			expectedText: 'Recreate All Letters',
			menuPath: ['Violations', 'Queued'],
		},
	];
	test('Check pages loaded', async ({ page, helpers, navigationHelper, commonPO }) => {
		try {
			await Promise.all([
				page.goto('/'),
				page.waitForResponse(resp => resp.url().includes('token') && resp.status() == 200),
			]);
			await navigationHelper.selectAssociationDropdown('HUTTO');

			await helpers.softStepsForPages(availablePages, async (webPage) => {
				await navigationHelper.leftMenuNavigation(webPage.menuPath[0], webPage.menuPath[1]);
				await expect(page).toHaveURL(webPage.url);
				await expect(page.getByText(webPage.expectedText, { exact: true })).toBeVisible();

				if (webPage.pageName === 'Add Violation') {
					await commonPO.closeModalIcon.click();
				}
			});
		} finally {
			await page.context().close();
		}
	});
});