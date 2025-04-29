import { Page, Locator } from '@playwright/test';

export class CommonPO {
	private readonly _page: Page;
	public readonly headerPage: Locator;
	public readonly saveButton: Locator;
	public readonly cancelButton: Locator;
	public readonly updateButton: Locator;
	public readonly expandDrawer: Locator;
	public readonly closeDrawer: Locator;
	public readonly yesButton: Locator;

	// Print Options Dialog Locators
	public readonly viewInNewTabButton: Locator;
	public readonly downloadButton: Locator;
	public readonly emailButton: Locator;
	public readonly postButton: Locator;
	public readonly openButton: Locator;
	public readonly closedButton: Locator;
	public readonly modal: Locator;
	public readonly combineButton: Locator;
	public readonly separateButton: Locator;
	public readonly openButtonModal: Locator;
	public readonly closeButtonModal: Locator;

	constructor(page: Page) {
		this._page = page;
		this.headerPage = page.locator('h1.sw-page-header');
		this.saveButton = page.getByRole('button', { name: 'Save' });
		this.cancelButton = page.getByRole('button', { name: 'Cancel' });
		this.updateButton = page.getByRole('button', { name: 'Update', exact: true });
		this.expandDrawer = page.locator('.toggle-button-expanded.ng-star-inserted div').nth(0);
		this.closeDrawer = page.locator('.toggle-button-expanded.ng-star-inserted div').nth(1);
		this.yesButton = page.getByRole('button', { name: 'Yes' });

		// Initialize Print Options Dialog Locators
		this.combineButton = page.getByRole('button', { name: 'Combine' });
		this.separateButton = page.getByRole('button', { name: 'Separate' });
		this.openButton = page.getByRole('button', { name: 'Open' });
		this.closedButton = page.getByRole('button', { name: 'Close' });
        
		this.modal = page.locator('.modal-body');
		this.openButtonModal = this.modal.getByRole('button', { name: 'Open' });
		this.closeButtonModal = this.modal.getByRole('button', { name: 'Close' });
		this.viewInNewTabButton = this.modal.getByRole('button', { name: 'View in new tab' });
		this.downloadButton = this.modal.getByRole('button', { name: 'Download' });
		this.emailButton = this.modal.getByRole('button', { name: 'Email' });
		this.postButton = this.modal.getByRole('button', { name: 'Post' });
	}
}