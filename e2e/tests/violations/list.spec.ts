import { test, expect } from '@playwright/test';
import { ViolationsPO } from '../../page-objects/violations/ViolationsPO';
import { LoginPO } from '../../page-objects/login/LoginPO';
import { NavigationHelper } from '../../page-objects/helpers/NavigationHelper';

test.describe('List Violations Tests', () => {
	let violationsPO: ViolationsPO;
	let loginPO: LoginPO;
	let navigationHelper: NavigationHelper;

	test.beforeEach(async ({ page }) => {
		loginPO = new LoginPO(page);
		navigationHelper = new NavigationHelper(page);
		violationsPO = new ViolationsPO(page);

		await page.goto('');
		await loginPO.login();
		await navigationHelper.selectDefaultAssociation();
		await page.goto('#/violations/list');
	});

	test('ID_0219 should select All Units option and verify', async ({ page }) => {
		await expect(violationsPO.listViolationsPO.itemListViewViolation.first()).toBeVisible();
		const allViolations = await violationsPO.listViolationsPO.itemListViewViolation.allTextContents();

		// Wait for both the UI action and the API response
		await Promise.all([
			page.waitForResponse((response) => response.url().includes('SWWebservice/Services/ViolationArea/ViolationAreaService.svc/GetUnits') && response.status() === 200),
			violationsPO.listViolationsPO.allViolationsDropdown.selectOption('All Units'),
		]);

		const allUnits = await violationsPO.listViolationsPO.itemListViewViolation.allTextContents();

		// Assert
		const names = ['Katniss Everdeen', 'Mike Wazowski', 'Margot Tester', 'John Lennon', 'Cheshire Cat'];

		for (const name of names) {
			expect(allUnits.some((unit) => unit.includes(name))).toBeTruthy();
		}

		expect(allUnits.length > allViolations.length).toBeTruthy();
	});
});
