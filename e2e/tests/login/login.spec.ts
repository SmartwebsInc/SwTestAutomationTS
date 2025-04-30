import { test, expect } from '../../fixtures/baseFixtures';
import { Page, Browser } from '@playwright/test';
import { LoginPO } from '../../page-objects/login/LoginPO';
import { Context } from 'vm';

test.describe('Login Tests', () => {
	test.use({ storageState: 'e2e/auth/sa.json' });
	let page: Page;
	let context: Context;
	let loginPO: LoginPO;

	test.beforeEach(async ({ browser }) => {
		context = await browser.newContext();
		page = await context.newPage();
		await page.goto('');
		loginPO = new LoginPO(page);
	});

	test('QWERTY should successfully sign in with correct credentials', async ({ browser, request, api }) => {
		await expect(page.getByText('All Associations').first()).toBeVisible({ timeout: 30000 });
		await expect(page).toHaveURL(/.*\/#\/dashboard/);

		console.log('Bearer Token:', api.bearerToken);
		await api.ownerUnitRequests.createOwnerUnit(request, api.bearerToken, await api.ownerUnitRequests.defaultOwnerUnitValues('John', 'Doe'));

		let contextNew = await browser.newContext({ storageState: 'e2e/auth/sa.json' });
		let pageNew = await contextNew.newPage();
		await pageNew.goto('');
		await pageNew.waitForTimeout(20000);
	});

	test('should display an error message for invalid credentials', async () => {
		await loginPO.login('InvalidUser', 'InvalidPassword');
		await expect(loginPO.alertMessage).toHaveText('Invalid username or password');
	});

	test('should verify various page links', async ({ page }) => {
		await loginPO.openLink('Privacy Policy');
		await expect(page).toHaveURL(/https:\/\/smartwebs\.com\/privacy-policy\/\?signin=.*/);
		await expect(page).toHaveTitle('Privacy Policy - Smartwebs Community Management | Smartwebs');

		await page.goto('');
		await loginPO.openLink('Terms of Use');
		await expect(page).toHaveURL(/https:\/\/smartwebs\.com\/terms\/\?signin=.*/);
		await expect(page).toHaveTitle('Terms of Use | Smartwebs');

		await page.goto('');
		await loginPO.openLink('Forgot password');
		await expect(page).toHaveURL(/https:\/\/[\w-]+\.smartwebs\.com\/#\/password\/reset\?redirectTo=https:%2F%2Foffice\.smartwebs\.com&signin=.*/);
		const placeholderText = await loginPO.forgotPasswordForm.getAttribute('placeholder');
		expect(placeholderText).toContain('Enter your username or email address');
	});
});