import { Page, Locator, expect } from '@playwright/test';
import { TableHelper } from '../helpers/TableHelper';

export class UserManagementPO {
	private readonly page: Page;
	readonly tableHelper: TableHelper;
	// Locators
	readonly menuButton: Locator;
	readonly communicationsButton: Locator;
	readonly listButton: Locator;
	readonly associationsDropdown: Locator;
	readonly associationUsersButton: Locator;
	readonly searchFilter: Locator;
	readonly searchButton: Locator;
	readonly gridPanel: Locator;
	readonly showInactiveButton: Locator;
	readonly toasterMessage: Locator;
	readonly vendorUsersCheckbox: Locator;
	readonly residentUsersCheckbox: Locator;
	readonly onlyAssociationUsersCheckbox: Locator;
	readonly listSizeDropdown: Locator;

	constructor(page: Page) {
		this.page = page;
		this.tableHelper = new TableHelper(page);

		// Initialize locators
		this.menuButton = page.locator('.sw-top-bars');
		this.communicationsButton = page.locator('text=Communications');
		this.listButton = page.locator('text=List');
		this.associationsDropdown = page.locator('.dropdown-toggle.ng-binding', { hasText: 'Association' });
		this.associationUsersButton = page.locator('a.ng-binding', { hasText: 'Association Users' });
		this.searchFilter = page.locator('[name="gridFilterOptionValue"]');
		this.searchButton = page.locator('button.sw-search-btn');
		this.gridPanel = page.locator('div[ref="gridPanel"]');
		this.showInactiveButton = page.locator('text=Show Inactive');
		this.toasterMessage = page.locator('.toast-message');
		this.vendorUsersCheckbox = page.locator('label', { hasText: 'Include Vendor users' }).locator('input');
		this.residentUsersCheckbox = page.locator('label', { hasText: 'Include Resident users' }).locator('input');
		this.onlyAssociationUsersCheckbox = page.locator('label', { hasText: 'Assigned to this Association' }).locator('input');
		this.listSizeDropdown = page.locator('label', { hasText: 'List size' }).locator('select');
	}

	async selectGridFilterOption(value: string) {
		await this.page.locator('[name="gridFilterOption"]').selectOption(value);
	}

	async selectListSize(value: string) {
		await this.listSizeDropdown.selectOption(value);
	}

	async searchUser(value: string) {
		await this.searchFilter.fill(value);
		await this.page.waitForResponse((response) => response.url().includes('GetUserListByFilter') && response.status() === 200);
		await this.searchButton.click();
	}
}
