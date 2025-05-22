import { Page, Locator } from '@playwright/test';

export class DeclinedWithdrawnPO {
	private readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}
}
