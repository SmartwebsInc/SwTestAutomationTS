import { Page, Locator } from '@playwright/test';

export class CompletedPO {
	private readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}
}
