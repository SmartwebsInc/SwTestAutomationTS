import { test, expect } from '@playwright/test';
import { ViolationsPO } from '../../page-objects/violations/ViolationsPO';
import { LoginPO } from '../../page-objects/login/LoginPO';
import { NavigationHelper } from '../../page-objects/helpers/NavigationHelper';
import { PrintPO } from '../../page-objects/violations/PrintPO';

test.describe('Print Tests', () => {
	let violationsPO: ViolationsPO;
	let loginPO: LoginPO;
	let navigationHelper: NavigationHelper;
	let printPage: PrintPO;

	test.beforeEach(async ({ page }) => {
		loginPO = new LoginPO(page);
		violationsPO = new ViolationsPO(page);
		printPage = new PrintPO(page);
		navigationHelper = new NavigationHelper(page);

		await page.goto('');
		await loginPO.login();
		await navigationHelper.selectAssociationDropdown('HUTTO');
		await page.goto('#/violations/print');
	});

	test('should filter violation in more options and be able to print', async ({ page }) => {
		await printPage.showDropDown.selectOption('All Activity');
		await violationsPO.searchDropdownOptions.selectOption('Violation Subcategory');
		await violationsPO.moreOptionsPanelPO.moreOptionsBtn.click();

		await violationsPO.moreOptionsPanelPO.inCurrentStageCheckboxController(1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12);
		await violationsPO.moreOptionsPanelPO.multiViolationTypeCheckbox.uncheck();
		await violationsPO.moreOptionsPanelPO.firstClassMailingMethodCheckbox.uncheck();
		await violationsPO.moreOptionsPanelPO.certifiedMailingMethodCheckbox.uncheck();
		await violationsPO.moreOptionsPanelPO.showResultsThatMatch.selectOption('All (inclusive)');
		await violationsPO.moreOptionsPanelPO.applyBtn.click();
        
		// await violationsPO.searchViolation('rock');

		await expect(printPage.cardViolation.first()).toBeVisible();
		await expect(printPage.printSendAllButton).toBeVisible();
	});
});