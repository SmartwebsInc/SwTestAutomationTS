import { Page, Locator, expect } from '@playwright/test';

export class DashboardPO {
	private readonly page: Page;
	readonly headerName: Locator;
	readonly mainMenu: Locator;
	readonly dashboardTiles: Locator;
	readonly associationsBlock: Locator;
	readonly messagesBlock: Locator;
	readonly accountingBlock: Locator;
	readonly violationsBlock: Locator;
	readonly arcBlock: Locator;
	readonly workOrdersBlock: Locator;
	readonly profileDropdown: Locator;
	readonly viewProfile: Locator;
	readonly preferences: Locator;

	constructor(page: Page) {
		this.page = page;
		this.headerName = page.locator('div.header-name');
		this.mainMenu = page.locator('li.cursor-pointer:has-text("Main")');
		this.dashboardTiles = page.locator('div.sw-dashboards.sw-dashboards-tiles');
		this.associationsBlock = page.locator('div.count-info-block.count-hover.units-app.app-count-block');
		this.messagesBlock = page.locator('div.count-info-block.count-hover.messaging-app.app-count-block');
		this.accountingBlock = page.locator('div.count-info-block.count-hover.acc-app.app-count-block');
		this.violationsBlock = page.locator('div.count-info-block.count-hover.violations-app.app-count-block');
		this.arcBlock = page.locator('div.count-info-block.count-hover.arc-app.app-count-block');
		this.workOrdersBlock = page.locator('div.wo-app .title');
		this.profileDropdown = page.locator('div[ng-click="$ctrl.toggleProfileInfo()"]');
		this.viewProfile = page.locator('a.user-details-action.success:has-text("View Profile")');
		this.preferences = page.locator('a.user-details-action:has-text("Preferences")');
	}

	async navigateToAssociationsDashboard() {
		await this.associationsBlock.click();
	}

	async navigateToMessagesDashboard() {
		await this.messagesBlock.click();
	}

	async navigateToAccountingDashboard() {
		await this.accountingBlock.click();
	}

	async navigateToViolationsDashboard() {
		await this.violationsBlock.click();
	}

	async navigateToArcDashboard() {
		await this.arcBlock.click();
	}

	async navigateToWorkOrdersDashboard() {
		await this.workOrdersBlock.click();
	}

	async openProfile() {
		await this.profileDropdown.click();
		await this.viewProfile.click();
	}

	async openPreferences() {
		await this.profileDropdown.click();
		await this.preferences.click();
	}

	async navigateToMainMenu() {
		await this.mainMenu.click();
		await this.page.waitForLoadState('load');
	}

	async verifyDashboardElements() {
		await expect(this.headerName).toBeVisible();
		await expect(this.dashboardTiles).toBeVisible();
		await expect(this.associationsBlock).toBeVisible();
		await expect(this.messagesBlock).toBeVisible();
		await expect(this.accountingBlock).toBeVisible();
		await expect(this.violationsBlock).toBeVisible();
		await expect(this.arcBlock).toBeVisible();
		await expect(this.workOrdersBlock).toBeVisible();
	}
}
