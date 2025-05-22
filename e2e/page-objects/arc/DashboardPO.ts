import { Page, Locator } from '@playwright/test';

export class DashboardPO {
	private readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}
}
