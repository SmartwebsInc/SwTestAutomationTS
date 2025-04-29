import { test, expect } from '@playwright/test';
import { ViolationsPO } from '../../page-objects/violations/ViolationsPO';
import { LoginPO } from '../../page-objects/login/LoginPO';
import { NavigationHelper } from '../../page-objects/helpers/NavigationHelper';

test.describe('Violations Add and Delete Tests', () => {
	let violationsPO: ViolationsPO;
	let loginPO: LoginPO;
	let navigationHelper: NavigationHelper;

	test.beforeEach(async ({ page }) => {
		violationsPO = new ViolationsPO(page);
		loginPO = new LoginPO(page);
		navigationHelper = new NavigationHelper(page);

		await page.goto('');
		await loginPO.login();
		await navigationHelper.selectAssociationDropdown('HUTTO');
	});

	test('should add and delete violation stage 1', async ({ page }) => {
		// Create Violation
		await navigationHelper.leftMenuNavigation('Violations', 'Add');
		await violationsPO.addViolationPO.ownerName.fill('Cypress');
		await violationsPO.tableHelper.clickRowContainingText('Cypress');
		await violationsPO.addViolationPO.setCategorySubcategory('Cypress', 'Automation Test');
		await Promise.all([
			page.waitForResponse(response =>
				response.url().includes('CreateViolation') && response.status() === 200,
			),
			violationsPO.addViolationPO.sendButton.click(),
		]);

		// Search Violation and Delete
		await violationsPO.searchViolation('Owner Name (First or Last)', 'Cypress');
		await violationsPO.listViolationsPO.openViolationWithTextInTable('Cypress');
		await violationsPO.listViolationsPO.closeButton.click();

		await Promise.all([
			page.waitForResponse(response =>
				response.url().includes('CloseViolation') && response.status() === 200,
			),
			violationsPO.common.yesButton.click(),
		]);

		// Check if Violation is deleted
		await expect(violationsPO.listViolationsPO.closeButton).not.toBeVisible();
	});

	test('should create and delete violation stage 2', async ({ page }) => {
		// Create Violation
		await navigationHelper.leftMenuNavigation('Violations', 'Add');
		await violationsPO.addViolationPO.ownerName.fill('Cypress');
		await violationsPO.tableHelper.clickRowContainingText('Cypress');
		await violationsPO.addViolationPO.setCategorySubcategory('Cypress', 'Automation Test');
		await violationsPO.addViolationPO.stageDropdown.selectOption('2 (2nd Fine Notice GOOD)');
		await Promise.all([
			page.waitForResponse(response =>
				response.url().includes('CreateViolation') && response.status() === 200,
			),
			violationsPO.addViolationPO.sendButton.click(),
		]);

		// Search Violation and Delete
		await violationsPO.searchViolation('Owner Name (First or Last)', 'Cypress');
		await violationsPO.listViolationsPO.openViolationWithTextInTable('Cypress');
		await violationsPO.listViolationsPO.closeButton.click();

		await Promise.all([
			page.waitForResponse(response =>
				response.url().includes('CloseViolation') && response.status() === 200,
			),
			violationsPO.common.yesButton.click(),
		]);

		// Check if Violation is deleted
		await expect(violationsPO.listViolationsPO.closeButton).not.toBeVisible();
	});

	test('should create multi violation from multi button', async ({ page }) => {
		await page.goto('#/violations/list');
		await violationsPO.listViolationsPO.multiButtonMain.click();
		await violationsPO.addViolationPO.ownerName.fill('Cypress');
		await violationsPO.tableHelper.clickRowContainingText('Cypress');

		await violationsPO.addViolationPO.setCategorySubcategory('Architectural', 'Arbor');
		await Promise.all([
			page.waitForResponse(response =>
				response.url().includes('SaveNewViolation') && response.status() === 200,
			),
			violationsPO.addViolationPO.sendButton.click(),
		]);

		await violationsPO.addViolationPO.newButton.click();
		await violationsPO.addViolationPO.setCategorySubcategory('Architectural', 'Gazebo');
		await Promise.all([
			page.waitForResponse(response =>
				response.url().includes('SaveNewViolation') && response.status() === 200,
			),
			violationsPO.addViolationPO.sendButton.click(),
		]);

		// TODO: Add assertions to verify the violations were created successfully
		// For example:
		await violationsPO.searchViolation('Owner Name (First or Last)', 'Cypress');
		await expect(page.locator('text=Arbor')).toBeVisible();
		await expect(page.locator('text=Gazebo')).toBeVisible();
	});
});