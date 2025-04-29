import { test, expect } from '@playwright/test';
import { ViolationsPO } from '../../page-objects/violations/ViolationsPO';
import { LoginPO } from '../../page-objects/login/LoginPO';
import { NavigationHelper } from '../../page-objects/helpers/NavigationHelper';

test.describe('Export Violations Tests', () => {
	let violationsPO: ViolationsPO;
	let loginPO: LoginPO;
	let navigationHelper: NavigationHelper;

	test.beforeEach(async ({ page }) => {
		violationsPO = new ViolationsPO(page);
		loginPO = new LoginPO(page);
		navigationHelper = new NavigationHelper(page);

		await page.goto('');
		await loginPO.login();
		await navigationHelper.selectAssociationDropdown('HUTTO');
		await navigationHelper.leftMenuNavigation('Violations');
	});

	test('should export filtered list to PDF', async ({ page }) => {
		// Setup download listener before triggering download
		const downloadPromise = page.waitForEvent('download');

		await violationsPO.listViolationsPO.gridViewButton.click();
		await violationsPO.searchViolation('Owner Name (First or Last)', 'Cypress');

		await violationsPO.listViolationsPO.pdfDownloadButton.click();
		await violationsPO.listViolationsPO.downloadButton.click();

		// Wait for the download to start
		const download = await downloadPromise;
        
		// Verify the downloaded file has .pdf extension
		expect(download.suggestedFilename()).toMatch(/\.pdf$/);

		// Optional: Save the file and verify its contents
		// const path = await download.path();
		// expect(path).toBeTruthy();
	});
});