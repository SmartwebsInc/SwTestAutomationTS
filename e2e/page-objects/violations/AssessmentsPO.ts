import { Page, Locator } from '@playwright/test';

export class AssessmentsPO {
	private readonly page: Page;
	readonly startDateButton: Locator;
	readonly endDateButton: Locator;
	readonly filterButton: Locator;
	readonly clearFilter: Locator;
	readonly assesAllButton: Locator;
	readonly assessSelectedButton: Locator;
	readonly cardViewButton: Locator;
	readonly gridViewButton: Locator;
	readonly showDropdown: Locator;
	readonly listSizeDropdown: Locator;
	readonly cardViolation: Locator;
	readonly cardDetailsButton: Locator;

	// Drawer Violation Details
	readonly detailsButtonInDrawer: Locator;
	readonly listButtonInDrawer: Locator;

	readonly closeViolationButton: Locator;
	readonly optionsViolationButton: Locator;

	// Drawer tabs
	readonly changeLocationTab: Locator;

	// Drawer tabs content
	readonly backyardCheckbox: Locator;

	constructor(page: Page) {
		this.page = page;
		this.startDateButton = page.locator('.fa-calendar-alt').first();
		this.endDateButton = page.locator('.fa-calendar-alt').nth(1);
		this.filterButton = page.getByRole('button', { name: 'Filter', exact: true });
		this.clearFilter = page.getByRole('button', { name: 'Clear filter' });
		this.assesAllButton = page.getByRole('button', { name: 'Assess All' });
		this.assessSelectedButton = page.getByRole('button', { name: 'Assess Selected' });
		this.cardViewButton = page.locator('[tooltip=\'Card view\']');
		this.gridViewButton = page.locator('[tooltip=\'Grid view\']');
		this.showDropdown = page.locator('span:text-is(\'Show:\') + select');
		this.listSizeDropdown = page.locator('span:text-is(\'List size:\') + select');
		this.cardViolation = page.locator('.flexbox.violation-card');
		this.cardDetailsButton = page.locator('.flexbox.violation-card .btn-info');

		this.detailsButtonInDrawer = page.locator('sw-drawer .fa-asterisk');
		this.listButtonInDrawer = page.locator('sw-drawer .fa-list');
		this.closeViolationButton = page.getByText('Close', { exact: true });
		this.optionsViolationButton = page.getByText('Options', { exact: true });

		this.changeLocationTab = page.getByText('Change Location');

		this.backyardCheckbox = page.locator('div:text-is(\'Backyard\') +div input');
	}
}