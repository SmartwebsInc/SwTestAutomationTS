import { Page, Locator } from '@playwright/test';

export class ClosedWorkOrdersPO {
	private readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}
}
