import { Page, Locator } from '@playwright/test';

export class ReviewPO {
	private readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}
}
