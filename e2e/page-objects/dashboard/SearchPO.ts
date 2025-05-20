import { Page, Locator, expect } from '@playwright/test';
import { TableHelper } from '../helpers/TableHelper';

export class SearchPO {
	private readonly page: Page;
	readonly searchIcon: Locator;
	readonly searchPopup: Locator;
	readonly associationDropdown: Locator;
	readonly searchInput: Locator;
	readonly searchButton: Locator;
	readonly pageHeader: Locator;
	readonly advancedSearchTab: Locator;
	readonly advancedAssociationDropdown: Locator;
	readonly ownerNameInput: Locator;
	readonly unitAddressInput: Locator;
	readonly mailingAddressInput: Locator;
	readonly accountNumberInput: Locator;
	readonly advancedSearchButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.searchIcon = page.locator('div[ng-click="$ctrl.toggleSearch()"]');
		this.searchPopup = page.locator('div.search-units');
		this.associationDropdown = page.locator('select[ng-model="$ctrl.search.selectedAssociation"]').nth(0);
		this.searchInput = page.locator('input[ng-model="$ctrl.search.criteria.filter"]');
		this.searchButton = page.locator('button.btn.btn-primary').nth(0);
		this.pageHeader = page.locator('div.header-name');
		this.advancedSearchTab = page.locator('li.search-units-tab:has-text("Advanced")');
		this.advancedAssociationDropdown = page.locator('select[ng-model="$ctrl.search.selectedAssociation"]').nth(1);
		this.ownerNameInput = page.locator('input[ng-model="$ctrl.search.criteria.ownerName"]');
		this.unitAddressInput = page.locator('input[ng-model="$ctrl.search.criteria.unitAddress"]');
		this.mailingAddressInput = page.locator('input[ng-model="$ctrl.search.criteria.mailingAddress"]');
		this.accountNumberInput = page.locator('input[ng-model="$ctrl.search.criteria.accountNumber"]');
		this.advancedSearchButton = page.locator('button.btn.btn-primary').nth(1);
	}

	async performQuickSearch(association: string, searchTerm: string) {
		const tableHelper = new TableHelper(this.page);
		await this.searchIcon.click();
		await expect(this.searchPopup).toBeVisible();

		await this.associationDropdown.selectOption(association);
		await this.searchInput.fill(searchTerm);
		await this.searchButton.click();
		await this.page.waitForLoadState('load');

		await expect(this.page).toHaveURL(/manage\/units\/list/);
		await expect(this.pageHeader).toContainText(association);
		await expect(await tableHelper.rowTable.first()).toHaveText(new RegExp(searchTerm));
	}

	async performAdvancedSearch(association: string, ownerName: string, unitAddress: string, mailingAddress: string, accountNumber: string) {
		const tableHelper = new TableHelper(this.page);
		await this.searchIcon.click();
		await expect(this.searchPopup).toBeVisible();

		await this.advancedSearchTab.click();
		await this.advancedAssociationDropdown.selectOption(association);
		await this.ownerNameInput.fill(ownerName);
		await this.unitAddressInput.fill(unitAddress);
		await this.mailingAddressInput.fill(mailingAddress);
		await this.accountNumberInput.fill(accountNumber);
		await this.advancedSearchButton.click();
		await this.page.waitForLoadState('load');

		await expect(this.page).toHaveURL(/manage\/units\/list/);
		await expect(this.pageHeader).toContainText(association);
		await expect(tableHelper.rowTable.first()).toHaveText(new RegExp(ownerName));
	}
}
