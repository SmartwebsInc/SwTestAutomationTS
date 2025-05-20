import { Page, Locator } from '@playwright/test';

export class ViolationReportsPO {
	private readonly page: Page;
	readonly clickToUpdateButton: Locator;
	readonly getDataButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.clickToUpdateButton = page.locator('.refresh-button-text');
		this.getDataButton = page.locator('button[ng-click=\'$ctrl.onGetDataCommunity()\']');
	}
}
