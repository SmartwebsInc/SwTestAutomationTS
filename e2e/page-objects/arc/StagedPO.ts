import { Page, Locator } from '@playwright/test';

export class StagedPO {
	private readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}
}
