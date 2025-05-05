import { test, expect } from '@playwright/test';
import { LoginPO } from '../../page-objects/login/LoginPO';
import { UserManagementPO } from '../../page-objects/association/UserManagmentPO';
import { UserFormPO } from '../../page-objects/association/UserFormPO';
import { NavigationHelper } from '../../page-objects/helpers/NavigationHelper';
import { BaseFixtures } from '../../fixtures/BasePages';

test.describe('Association Users Tests', () => {
	let loginPO: LoginPO;
	let userManagementPage: UserManagementPO;
	let userForm: UserFormPO;
	let navigationHelper: NavigationHelper;

	test.beforeEach(async ({ page }) => {
		userManagementPage = new UserManagementPO(page);
		userForm = new UserFormPO(page);
		navigationHelper = new NavigationHelper(page);
		loginPO = new LoginPO(page);

		await page.goto('');
		await loginPO.login();

		await navigationHelper.selectAssociationDropdown('HUTTO');
		await navigationHelper.manageMenuNavigation('Association', 'Association Users');

		const url = page.url();
		expect(url).toContain('/manage/association_details/users');
	});

	test('should search by username and lastname', async () => {
		await userManagementPage.selectGridFilterOption('User Name');
		await userManagementPage.searchUser('Cypress');
		const row = await userManagementPage.tableHelper.getRowContent(0);
		const rowContent = row.join(' ');
		expect(rowContent).toContain('Cypress');

		await userManagementPage.selectGridFilterOption('Last Name');
		await userManagementPage.searchUser('Automation Test');
		const newRow = await userManagementPage.tableHelper.getRowContent(0);
		const newRowContent = newRow.join(' ');
		expect(newRowContent).toContain('Automation Test');
	});

	test.skip('should check checkboxes and filter users', async () => {
		await userManagementPage.vendorUsersCheckbox.check();
		await userManagementPage.residentUsersCheckbox.check();
		await userManagementPage.onlyAssociationUsersCheckbox.uncheck();

		expect(await userManagementPage.vendorUsersCheckbox.isChecked()).toBeTruthy();
		expect(await userManagementPage.residentUsersCheckbox.isChecked()).toBeTruthy();
		expect(await userManagementPage.onlyAssociationUsersCheckbox.isChecked()).toBeFalsy();

		expect(await userManagementPage.gridPanel.isVisible()).toBeTruthy();
		expect(await userManagementPage.tableHelper.rowTable.first().isVisible()).toBeTruthy();
	});

	test('should change list size and show inactive users', async ({ page }) => {
		await Promise.all([
			page.waitForResponse(response =>
				response.url().includes('GetUserListByFilter') && response.status() === 200,
			),
			userManagementPage.selectListSize('10'),
		]);
		await page.waitForTimeout(100);
		expect(await userManagementPage.tableHelper.getTableRowCount()).toBe(10);

		await Promise.all([
			page.waitForResponse(response =>
				response.url().includes('GetUserListByFilter') && response.status() === 200,
			),
			userManagementPage.selectListSize('25'),
		]);
		await page.waitForTimeout(100);
		expect(await userManagementPage.tableHelper.getTableRowCount()).toBe(25);
	});

	test('should show inactive users in list', async () => {
		await userManagementPage.showInactiveButton.click();
		await userManagementPage.vendorUsersCheckbox.check();
		await userManagementPage.residentUsersCheckbox.check();
		await userManagementPage.onlyAssociationUsersCheckbox.uncheck();

		await userManagementPage.selectGridFilterOption('Last Name');
		await userManagementPage.searchUser('Resident Inactive');

		const row = await userManagementPage.tableHelper.getRowContent(0);
		const rowContent = row.join(' ');
		expect(rowContent).toContain('Resident Inactive');
	});

	test('should cancel adding new user', async () => {
		await userForm.newUserButton.click();
		await expect(userForm.addUserDrawer).toBeVisible();

		await userForm.firstNameInput.fill('Test');
		await userForm.lastNameInput.fill('Cypress');
		await userForm.usernameInput.fill('Test Cypress');
		await userForm.emailInput.fill('CypressTestEmail@mail.com');

		await userForm.commonPO.closeDrawerIcon.click();
		await expect(userForm.addUserDrawer).not.toBeVisible();
	});

	test.skip('should check new user form', async () => {
		await userForm.newUserButton.click();
		await userForm.firstNameInput.fill('New Test');
		await userForm.lastNameInput.fill('Cypress');
		await userForm.usernameInput.fill('New Cypress Tester');
		await userForm.emailInput.fill('CypressTestEmail@mail.com');
		await userForm.cellPhoneInput.fill('1111111111');
		await userForm.repeatNewPasswordInput.fill('Cypress2021');

		expect(await userForm.saveButton.isEnabled()).toBeTruthy();
	});

	test('should cancel editing user form', async ({ page }) => {
		await userManagementPage.onlyAssociationUsersCheckbox.uncheck();
		await userManagementPage.selectGridFilterOption('Last Name');
		await userManagementPage.searchUser('Automation Test');
        
		await userManagementPage.tableHelper.rowTable.first().click();

		await userForm.firstNameInput.fill('First Test');
		await userForm.lastNameInput.fill('Last Test');
		await userForm.titleInput.fill('test title');
		await userForm.usernameInput.fill('New Test Username');
		await userForm.emailInput.fill('testemail_cypress@mail.com');
		await userForm.dayPhoneInput.fill('8003651112');
		await userForm.nightPhoneInput.fill('1234567899');
		await userForm.cellPhoneInput.fill('6418529635');
		await userForm.invalidEmailSelect.selectOption('No');

		await userForm.commonPO.closeDrawerIcon.click();
		await page.waitForTimeout(200);
		await page.reload();

		await userManagementPage.selectGridFilterOption('User Name');
		await userManagementPage.searchUser('Cypress');
		await userManagementPage.searchButton.click();
		await userManagementPage.tableHelper.rowTable.first().click();

		await expect(userForm.firstNameInput).toHaveValue('Cypress');
		await expect(userForm.lastNameInput).toHaveValue('Automation Test');
		await expect(userForm.usernameInput).toHaveValue('Cypress Automation Test');
	});

	test('should edit user form', async ({ page }) => {
		await userManagementPage.selectGridFilterOption('Last Name');
		await userManagementPage.searchUser('Automation Test');
		await userManagementPage.tableHelper.rowTable.first().click();

		await userForm.titleInput.fill('Test Test');

		await Promise.all([
			page.waitForResponse(response =>
				response.url().includes('SaveUser') && response.status() === 200,
			),
			userForm.saveButton.click(),
		]);
		await page.reload();

		await userManagementPage.selectGridFilterOption('Last Name');
		await userManagementPage.searchUser('Automation Test');

		await userManagementPage.tableHelper.clickRowContainingText('Automation Test');

		expect(await userForm.titleInput.inputValue()).toBe('Test Test');
	});
});