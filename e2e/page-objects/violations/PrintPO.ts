import { Page, Locator } from '@playwright/test';

export class PrintPO {
	private readonly page: Page;
	readonly showDropDown: Locator;
	readonly startDateBtn: Locator;
	readonly endDateBtn: Locator;
	readonly clearFilterBtn: Locator;
	readonly cardViolation: Locator;
	readonly detailsButton: Locator;
	readonly violationDrawer: Locator;

	readonly openButton: Locator;
	readonly closedButton: Locator;
	readonly printSendAllButton: Locator;
	readonly printSendSelectedButton: Locator;
	readonly sendAllToQueueButton: Locator;
	readonly sendSelectedToQueueButton: Locator;
	readonly previewAllButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.showDropDown = page.locator('span:has-text(\'Show:\') + select');
		this.startDateBtn = page.locator('.fa-calendar-alt').nth(0);
		this.endDateBtn = page.locator('.fa-calendar-alt').nth(1);
		this.clearFilterBtn = page.getByRole('button', { name: 'Clear filter' });
		this.cardViolation = page.locator('.violation-card');
		this.detailsButton = page.locator('.btn-info');
		this.violationDrawer = page.locator('print-violation-drawer');

		this.openButton = page.getByRole('button', { name: 'Open' });
		this.closedButton = page.getByRole('button', { name: 'Closed' });
		this.printSendAllButton = page.getByRole('button', { name: 'Print/Send All' });
		this.printSendSelectedButton = page.getByRole('button', { name: 'Print/Send Selected' });
		this.sendAllToQueueButton = page.getByRole('button', { name: 'Send All to Queue' });
		this.sendSelectedToQueueButton = page.getByRole('button', { name: 'Send Selected to Queue' });
		this.previewAllButton = page.getByRole('button', { name: 'Preview All' });
	}
}