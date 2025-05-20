import { test, expect } from '@playwright/test';
import { ViolationsPO } from '../../page-objects/violations/ViolationsPO';
import { LoginPO } from '../../page-objects/login/LoginPO';
import { NavigationHelper } from '../../page-objects/helpers/NavigationHelper';
import { MorePO } from '../../page-objects/violations/MorePO';

test.describe('More Pages Tests', () => {
	let violationsPO: ViolationsPO;
	let navigationHelper: NavigationHelper;
	let morePages: MorePO;

	test.beforeEach(async ({ page }) => {
		violationsPO = new ViolationsPO(page);
		navigationHelper = new NavigationHelper(page);
		morePages = new MorePO(page);

		await page.goto('');
		await new LoginPO(page).login();
		await navigationHelper.selectAssociationDropdown('Hutto');
	});
});
