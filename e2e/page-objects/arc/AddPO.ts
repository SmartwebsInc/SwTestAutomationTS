import { Page, Locator } from '@playwright/test';

export class AddPO {
	private readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}
}
