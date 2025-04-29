import { Page, Locator, expect } from '@playwright/test';
import { CommonPO } from '../common/CommonPO';

export class ProfilePO {
	private readonly page: Page;
	private readonly common: CommonPO;

	// Profile Navigation
	readonly profileDropdown: Locator;
	readonly viewProfile: Locator;

	// Edit Role Elements
	readonly editMyProfileButton: Locator;
	readonly editAssotiationButton: Locator;
	readonly userRoleDropdown: Locator;
	readonly userManageTab: Locator;

	constructor(page: Page) {
		this.page = page;
		this.common = new CommonPO(page);

		this.profileDropdown = page.locator('div[ng-click="$ctrl.toggleProfileInfo()"]');
		this.viewProfile = page.locator('a.user-details-action.success:has-text("View Profile")');
		this.editMyProfileButton = page.locator('span:text-is("My Profile") + button');
		this.editAssotiationButton = page.locator('span:text-is("Associations") + button');
		this.userRoleDropdown = page.locator('.select-role-for-all');
		this.userManageTab = page.locator('.tab-content.user-assoc-manage-tab');
	}

	async goToProfile() {
		await this.profileDropdown.click();
		await this.viewProfile.click();
	}

	async changeUserRole(role: string) {
		await expect(this.userManageTab).toBeVisible();
		await expect(this.editAssotiationButton).toBeVisible();
		await this.editAssotiationButton.click();
		await this.userRoleDropdown.selectOption(role);
		await this.common.saveButton.click();
		await this.page.waitForResponse(response =>
			response.url().includes('/GetUnitsByUser') && response.status() === 200,
		);
	}

	async verifyUserRole(expectedRole: string) {
		await expect(this.editAssotiationButton).toBeVisible();
		await expect(this.userManageTab).toBeVisible();
		await expect(this.userRoleDropdown).toContainText(expectedRole);
	}
}