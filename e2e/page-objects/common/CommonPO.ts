import { Page, Locator, expect } from '@playwright/test';

export class CommonPO {
	private readonly _page: Page;
	public readonly headerPage: Locator;
	public readonly saveButton: Locator;
	public readonly cancelButton: Locator;
	public readonly updateButton: Locator;
	public readonly expandDrawerIcon: Locator;
	public readonly closeDrawerIcon: Locator;
	public readonly closeModalIcon: Locator;
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
		this.expandDrawerIcon = page.locator('.toggle-button-expanded div').nth(0);
		this.closeDrawerIcon = page.locator('.toggle-button-expanded div').nth(1);
		this.closeModalIcon = page.locator('button.close');
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

	public async checkTextOnPageOrIframe(text: string) {
		await this._page.waitForLoadState('load');
		// First, try to find text in main document
		const h1 = this._page.locator('h1').first();
		const fallbackText = this._page.getByText(text, { exact: true }).first();

		if (await h1.isVisible()) {
			const h1Text = h1.getByText(text, { exact: true });
			await expect(h1Text).toBeVisible();
		} else if (await fallbackText.isVisible()) {
			await expect(fallbackText).toBeVisible();
		}
	
		// If not found, check all iframes
		const frames = this._page.frames();
		for (const frame of frames) {
			const frameLocator = frame.locator('h1', { hasText: text });
			if (await frameLocator.first().isVisible().catch(() => false)) {
				await expect(frameLocator.first()).toContainText(text);
				return;
			}
	
			const frameText = frame.getByText(text, { exact: true });
			if (await frameText.first().isVisible().catch(() => false)) {
				await expect(frameText.first()).toBeVisible();
				return;
			}
		}
	
		// If nothing found
		throw new Error(`Expected text "${text}" not found on page or iframes.`);
	}
	
}