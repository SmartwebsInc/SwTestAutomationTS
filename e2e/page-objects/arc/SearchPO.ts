import { Page, Locator } from '@playwright/test';

export class SearchPO {
	private readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}
}
