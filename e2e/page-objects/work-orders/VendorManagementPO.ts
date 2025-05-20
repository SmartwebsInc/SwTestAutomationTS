import { Page, Locator } from '@playwright/test';

export class VendorManagementPO {
	private readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}
}
