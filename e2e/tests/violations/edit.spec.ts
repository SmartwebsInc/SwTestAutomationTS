import { test, expect } from '@playwright/test';
import { ViolationsPO } from '../../page-objects/violations/ViolationsPO';
import { AddViolationPO } from '../../page-objects/violations/AddViolationPO';
import { LoginPO } from '../../page-objects/login/LoginPO';
import { NavigationHelper } from '../../page-objects/helpers/NavigationHelper';

test.describe('Edit Violations Tests', () => {
	let violationsPO: ViolationsPO;
	let addViolationPO: AddViolationPO;
	let loginPO: LoginPO;
	let navigationHelper: NavigationHelper;

	test.beforeEach(async ({ page }) => {
		violationsPO = new ViolationsPO(page);
		addViolationPO = new AddViolationPO(page);
		loginPO = new LoginPO(page);
		navigationHelper = new NavigationHelper(page);

		await page.goto('');
		await loginPO.login();
		await navigationHelper.selectDefaultAssociation();
	});

	test('should display owner unit and category subcategory forms', async ({ page }) => {
		await navigationHelper.leftMenuNavigation('Violations', 'Add');
		await expect(page.getByText('Find Owner/Unit')).toBeVisible();

		await addViolationPO.ownerName.fill('Margot');
		await violationsPO.tableHelper.clickRowContainingText('Margot');

		await expect(addViolationPO.categoryOption.first()).toBeVisible();
		await expect(addViolationPO.subcategoryOption.first()).toBeVisible();
	});
});
