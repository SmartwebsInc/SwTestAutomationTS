import { Page, Locator } from '@playwright/test';

export class OpenWorkOrdersPO {
	private readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}
}
