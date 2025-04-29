import { test, expect } from '@playwright/test';
import { LoginPO } from '../../page-objects/login/LoginPO';

test.describe('Login Tests', () => {
	let loginPO: LoginPO;

	test.beforeEach(async ({ page }) => {
		await page.goto('');
		loginPO = new LoginPO(page);
	});

	test('should successfully sign in with correct credentials', async ({ page }) => {
		await loginPO.login(process.env.ACC_SUPER_ADMIN_USERNAME, process.env.SUPER_ADMIN_PASSWORD);
		await expect(page.getByText('All Associations').first()).toBeVisible({ timeout: 20000 });
		await expect(page).toHaveURL(/.*\/#\/dashboard/);
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