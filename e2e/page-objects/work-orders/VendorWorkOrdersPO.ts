import { Page, Locator } from '@playwright/test';

export class VendorWorkOrdersPO {
	private readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}
}
