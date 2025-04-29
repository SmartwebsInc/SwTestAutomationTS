import { Page, Locator, expect } from '@playwright/test';
import { CommonPO } from '../common/CommonPO';
import { TableHelper } from '../helpers/TableHelper';

export class UserFormPO {
	private readonly page: Page;
	readonly commonPO: CommonPO;
	readonly tableHelper: TableHelper;

	// Form Container
	readonly addUserDrawer: Locator;

	// Buttons
	readonly newUserButton: Locator;
	readonly bulkAddButton: Locator;
	readonly sendPasswordLinkButton: Locator;
	readonly showInactiveButton: Locator;
	readonly cancelButton: Locator;
	readonly saveButton: Locator;
	readonly removeButton: Locator;
	readonly yesButton: Locator;
	readonly passwordBlockButton: Locator;

	// Input Fields
	readonly firstNameInput: Locator;
	readonly lastNameInput: Locator;
	readonly usernameInput: Locator;
	readonly emailInput: Locator;
	readonly newPasswordInput: Locator;
	readonly repeatNewPasswordInput: Locator;
	readonly titleInput: Locator;
	readonly dayPhoneInput: Locator;
	readonly nightPhoneInput: Locator;
	readonly cellPhoneInput: Locator;
	readonly invalidEmailSelect: Locator;

	constructor(page: Page) {
		this.page = page;
		this.commonPO = new CommonPO(page);
		this.tableHelper = new TableHelper(page);

		// Initialize form container
		this.addUserDrawer = page.locator('#userManagementDrawerContent');
        
		// Initialize buttons
		this.newUserButton = page.getByText('New User', { exact: true });
		this.bulkAddButton = page.getByText('Bulk Add', { exact: true });
		this.sendPasswordLinkButton = page.getByText('Send Password Link', { exact: true });
		this.showInactiveButton = page.getByText('Show Inactive', { exact: true });
		this.cancelButton = page.locator('button');
		this.saveButton = page.getByText('Save', { exact: true }).locator('button');
		this.removeButton = page.getByText('Remove', { exact: true }).locator('button');
		this.yesButton = page.locator('.modal-footer > .btn-warning');
		this.passwordBlockButton = page.locator('.sw-btn-wrp.sw-btn-small.sw-black-color.ng-scope');

		// Initialize input fields
		this.firstNameInput = page.locator('input[name="firstNameInput"]');
		this.lastNameInput = page.locator('input[name="lastNameInput"]');
		this.usernameInput = page.locator('.item-editing-field > .username-input-wrp > .form-control');
		this.emailInput = page.locator('input[name="email"]');
		this.newPasswordInput = page.locator('input[ng-model="$ctrl.newPassword"]');
		this.repeatNewPasswordInput = page.locator('input[ng-model="$ctrl.passwordRepeat"]');
		this.titleInput = page.locator('input[name="title"]');
		this.dayPhoneInput = page.locator('input[name="dayPhone"]');
		this.nightPhoneInput = page.locator('input[name="nightPhone"]');
		this.cellPhoneInput = page.locator('input[name="cellPhone"]');
		this.invalidEmailSelect = page.locator('select[name="mustValidateEmail"]');
	}
}