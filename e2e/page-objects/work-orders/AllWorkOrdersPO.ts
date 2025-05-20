import { Page, Locator } from '@playwright/test';

export class AllWorkOrdersPO {
	private readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}
}
