import { Page, Locator, expect } from '@playwright/test';

export class LoginPO {
	private readonly page: Page;
	private readonly defaultUsername: string;
	private readonly defaultPassword: string;

	readonly usernameInput: Locator;
	readonly passwordInput: Locator;
	readonly loginButton: Locator;
	readonly associationName: Locator;
	readonly alertMessage: Locator;
	readonly forgotPasswordForm: Locator;

	constructor(page: Page) {
		this.page = page;
		this.defaultUsername = process.env.ACC_SUPER_ADMIN_USERNAME || '';
		this.defaultPassword = process.env.SUPER_ADMIN_PASSWORD || '';
        
		this.usernameInput = page.locator('input[id=username]');
		this.passwordInput = page.locator('input[id=password]');
		this.loginButton = page.locator('button[type=submit]');
		this.associationName = page.locator('span.ng-binding');
		this.alertMessage = page.locator('span.login-error-message.ng-binding.ng-scope');
		this.forgotPasswordForm = page.locator('input[placeholder*="Enter your username"]');
	}

	async login(username?: string, password?: string) {
		await expect(this.usernameInput).toBeVisible();
		await this.page.waitForTimeout(400);
		await this.usernameInput.fill(username ?? this.defaultUsername);
		await this.passwordInput.fill(password ?? this.defaultPassword);
		await this.loginButton.click();
	}

	async openLink(linkText: string) {
		await this.page.getByText(linkText).click();
	}
}