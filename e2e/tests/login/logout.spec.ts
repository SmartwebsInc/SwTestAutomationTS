import { test, expect } from '@playwright/test';
import { LoginPO } from '../../page-objects/login/LoginPO';
import { LogOutPO } from '../../page-objects/login/LogOutPO';

test.describe('Logout Tests', () => {
	let loginPO: LoginPO;
	let logoutPO: LogOutPO;

	test.beforeEach(async ({ page }) => {
		await page.goto('');
		loginPO = new LoginPO(page);
		logoutPO = new LogOutPO(page);
	});

	test('should successfully logout', async () => {
		await loginPO.login(process.env.ACC_SUPER_ADMIN_USERNAME, process.env.SUPER_ADMIN_PASSWORD);
		await logoutPO.userIcon.click();
		await logoutPO.logoutButton.click();
		await expect(logoutPO.form).toBeVisible();
		await expect(logoutPO.formTitle).toContainText('Login');
	});
});