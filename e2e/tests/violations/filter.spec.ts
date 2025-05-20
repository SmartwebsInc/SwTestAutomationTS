import { test, expect } from '@playwright/test';
import { ViolationsPO } from '../../page-objects/violations/ViolationsPO';
import { LoginPO } from '../../page-objects/login/LoginPO';
import { NavigationHelper } from '../../page-objects/helpers/NavigationHelper';
import { MoreOptionsPanelPO } from '../../page-objects/violations/MoreOptionsPanelPO';

test.describe('Filter Violations Tests', () => {
	let violationsPO: ViolationsPO;
	let loginPO: LoginPO;
	let navigationHelper: NavigationHelper;
	let moreOptionsPanel: MoreOptionsPanelPO;

	test.beforeEach(async ({ page }) => {
		loginPO = new LoginPO(page);
		violationsPO = new ViolationsPO(page);
		moreOptionsPanel = new MoreOptionsPanelPO(page);
		navigationHelper = new NavigationHelper(page);

		await page.goto('');
		await loginPO.login();
		await navigationHelper.selectAssociationDropdown('HUTTO');
		await page.goto('/#/violations/list');
	});

	test('should filter violations', async ({ page }) => {
		await violationsPO.listViolationsPO.allStreetsDropdown.selectOption('Test Address');
		await moreOptionsPanel.moreOptionsBtn.click();

		await moreOptionsPanel.fixCheckbox.uncheck();
		await moreOptionsPanel.onHoldCheckbox.uncheck();

		await moreOptionsPanel.inCurrentStageCheckboxController(1, 4, 5, 6);

		await moreOptionsPanel.applyBtn.click();

		// Verify filter is applied by checking for filtered results
		await expect(page.locator('.violations-list')).toBeVisible();
		await expect(page.locator('text=Test Address')).toBeVisible();
	});

	test('should reset more options filter', async ({ page }) => {
		await violationsPO.listViolationsPO.allStreetsDropdown.selectOption('Test Address');
		await moreOptionsPanel.moreOptionsBtn.click();

		await moreOptionsPanel.inCurrentStageCheckboxController(6);

		// Verify initial state after setting filter
		for (let i = 0; i <= 5; i++) {
			await expect(moreOptionsPanel.inCurrentStageCheckbox.nth(i)).not.toBeChecked();
		}
		await expect(moreOptionsPanel.applyBtn).toBeEnabled();

		// Reset filters
		await moreOptionsPanel.resetButton.click();

		// Verify all checkboxes are checked after reset
		for (let i = 0; i <= 5; i++) {
			await expect(moreOptionsPanel.inCurrentStageCheckbox.nth(i)).toBeChecked();
		}
		await expect(moreOptionsPanel.applyBtn).toBeDisabled();
	});
});
