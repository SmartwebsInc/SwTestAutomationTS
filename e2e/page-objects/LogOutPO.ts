import { Page, Locator } from '@playwright/test';

export class LogOutPO {
	private readonly page: Page;
	readonly userIcon: Locator;
	readonly logoutButton: Locator;
	readonly form: Locator;
	readonly formTitle: Locator;

	constructor(page: Page) {
		this.page = page;
		this.userIcon = page.locator('.fa-user-circle');
		this.logoutButton = page.locator('a.user-details-action .fa-sign-out-alt');
		this.form = page.locator('form');
		this.formTitle = page.locator('h2.sts-form-header');
	}
}