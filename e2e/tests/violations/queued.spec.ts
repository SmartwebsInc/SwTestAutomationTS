import { test, expect } from '@playwright/test';
import { ViolationsPO } from '../../page-objects/violations/ViolationsPO';
import { LoginPO } from '../../page-objects/login/LoginPO';
import { NavigationHelper } from '../../page-objects/helpers/NavigationHelper';
import { QueuedPO } from '../../page-objects/violations/QueuedPO';
import { AddViolationPO } from '../../page-objects/violations/AddViolationPO';

test.describe('Queued Tests', () => {
	let violationsPO: ViolationsPO;
	let loginPO: LoginPO;
	let navigationHelper: NavigationHelper;
	let queuedPage: QueuedPO;
	let addViolationPO: AddViolationPO;

	test.beforeEach(async ({ page }) => {
		loginPO = new LoginPO(page);
		violationsPO = new ViolationsPO(page);
		queuedPage = new QueuedPO(page);
		addViolationPO = new AddViolationPO(page);
		navigationHelper = new NavigationHelper(page);

		await page.goto('');
		await loginPO.login();
		await navigationHelper.selectAssociationDropdown('HUTTO');
		await navigationHelper.leftMenuNavigation('Violations', 'Queued');
		await page.waitForURL(/.*violations\/queued/);
		expect(page.url()).toContain('/violations/queued');
	});

	test('ID_0247 should create single violation and queue it', async ({ page }) => {
		try {
			// Navigate to Violations List Page
			await navigationHelper.leftMenuNavigation('Violations', 'Add');

			// Create a new violation
			await violationsPO.addViolationPO.addViolationAndQueue('Lennon', 'Cypress', 'Automation Test');

			// Assert that the violation is created and queued
			await violationsPO.queuedTab.click();
			await violationsPO.searchViolation('Last Name', 'Lennon');
			const violationCard = await violationsPO.queuedPO.cardViolation.textContent();
			expect(violationCard).toContain('Cypress');
			expect(violationCard).toContain('Automation Test');
		} finally {
			await violationsPO.deleteViolation('Owner Name (First or Last)', 'Lennon');
		}
	});
});