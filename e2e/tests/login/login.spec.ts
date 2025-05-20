import { test, expect } from '../../fixtures/BasePages';
import { Page, Browser } from '@playwright/test';
import { LoginPO } from '../../page-objects/login/LoginPO';
import { Context } from 'vm';

test.describe('Login Tests', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('');
	});

	test('QWERTY should successfully sign in with correct credentials', async ({ browser, request, api, page, loginPO }) => {
		await loginPO.login();
		await expect(page.getByText('All Associations').first()).toBeVisible({ timeout: 30000 });
		await expect(page).toHaveURL(/.*\/#\/dashboard/);
	});

	test('should display an error message for invalid credentials', async ({ page, loginPO }) => {
		await expect(loginPO.usernameInput).toBeVisible();
		await page.waitForTimeout(400);
		await loginPO.usernameInput.fill('wrongusername');
		await loginPO.passwordInput.fill('wrongpassword');
		await loginPO.loginButton.click();
		await page.waitForTimeout(400);
		await expect(loginPO.alertMessage).toHaveText('Invalid username or password');
	});

	test('should verify various page links', async ({ page, loginPO }) => {
		let baseUrl = process.env.BASE_URL;

		await test.step('Verify Privacy Policy link', async () => {
			await loginPO.openLink('Privacy Policy');
			await expect(page).toHaveURL(/https:\/\/smartwebs\.com\/privacy-policy\/\?signin=.*/);
			await expect(page).toHaveTitle('Privacy Policy - Smartwebs Community Management | Smartwebs');
		});

		await test.step('Verify Terms of Use link', async () => {
			await page.goto('');
			await loginPO.openLink('Terms of Use');
			await expect(page).toHaveURL(/https:\/\/smartwebs\.com\/terms\/\?signin=.*/);
			await expect(page).toHaveTitle('Terms of Use | Smartwebs');
		});

		await test.step('Verify Forgot Password link', async () => {
			await page.goto('');
			await loginPO.openLink('Forgot password');
			await expect(page).toHaveURL(/.*\/#\/password\/reset\?redirectTo=.*&signin=.*/);
			const placeholderText = await loginPO.forgotPasswordForm.getAttribute('placeholder');
			expect(placeholderText).toContain('Enter your username or email address');
		});
	});
});
