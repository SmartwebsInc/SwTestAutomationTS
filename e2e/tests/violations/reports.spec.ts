import { test, expect } from '@playwright/test';
import { ViolationsPO } from '../../page-objects/violations/ViolationsPO';
import { LoginPO } from '../../page-objects/login/LoginPO';
import { ViolationReportsPO } from '../../page-objects/violations/ViolationReportsPO';

test.describe('Reports Tests', () => {
	let violationsPO: ViolationsPO;
	let loginPO: LoginPO;
	let violationReportsPO: ViolationReportsPO;

	test.beforeEach(async ({ page }) => {
		loginPO = new LoginPO(page);
		violationsPO = new ViolationsPO(page);
		violationReportsPO = new ViolationReportsPO(page);

		await page.goto('');
		await loginPO.login();
	});
});