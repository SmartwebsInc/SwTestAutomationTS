import { Page, Locator } from '@playwright/test';

export class AddWorkOrderPO {
	private readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}
}
