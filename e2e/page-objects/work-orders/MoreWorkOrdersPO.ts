import { Page, Locator } from '@playwright/test';

export class MoreWorkOrdersPO {
	private readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}
}
