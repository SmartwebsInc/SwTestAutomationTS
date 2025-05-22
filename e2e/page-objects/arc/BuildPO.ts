import { Page, Locator } from '@playwright/test';

export class BuildPO {
	private readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}
}
