import { Page, Locator } from '@playwright/test';

export class MorePO {
	private readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}
}
