import { Page, Locator } from '@playwright/test';

export class QueuedPO {
	private readonly page: Page;
	readonly closeButton: Locator;
	readonly confirmCloseViolationButton: Locator;

	// Action Buttons
	readonly recreateAllLettersButton: Locator;
	readonly processAllButton: Locator;
	readonly previewAllButton: Locator;

	// Search and Filter Controls
	readonly searchTypeSelect: Locator;
	readonly searchInput: Locator;
	readonly startDateInput: Locator;
	readonly endDateInput: Locator;
	readonly filterButton: Locator;
	readonly unitTagsSelect: Locator;
	readonly sortBySelect: Locator;
	readonly filterUsersSelect: Locator;

	// Table Elements
	readonly totalItemsCount: Locator;
	readonly cardViolation: Locator;
	readonly detailsButtons: Locator;
	readonly paginationButtons: Locator;

	constructor(page: Page) {
		this.page = page;
		this.closeButton = page.locator('button[ng-click=\'$ctrl.close()\']');
		this.confirmCloseViolationButton = page.locator('.btn.btn-default.ng-binding.ng-scope.btn-success');

		// Initialize Action Buttons
		this.recreateAllLettersButton = page.locator('button:has-text(\'Recreate All Letters\')');
		this.processAllButton = page.locator('button:has-text(\'Process All\')');
		this.previewAllButton = page.locator('button:has-text(\'Preview All\')');

		// Initialize Search and Filter Controls
		this.searchTypeSelect = page.locator('select:near(:text(\'Search\'))');
		this.searchInput = page.locator('input[placeholder=\'Search ...\']');
		this.startDateInput = page.locator('input[placeholder=\'Start Date\']');
		this.endDateInput = page.locator('input[placeholder=\'End Date\']');
		this.filterButton = page.locator('button:has-text(\'Filter\')');
		this.unitTagsSelect = page.locator('button:has-text(\'-- Select to filter --\')');
		this.sortBySelect = page.locator('select:near(:text(\'Sort by:\'))');
		this.filterUsersSelect = page.locator('select:near(:text(\'Filter users:\'))');

		// Initialize Table Elements
		this.totalItemsCount = page.locator('text=/Total items: \\d+/');
		this.cardViolation = page.locator('.flexbox .card-container');
		this.detailsButtons = page.locator('text=Details');
		this.paginationButtons = page.locator('.pagination li');
	}
}
