import { Page, Locator, expect } from '@playwright/test';

export class PreferencesPO {
	private readonly page: Page;
	readonly profileDropdown: Locator;
	readonly preferencesLink: Locator;
	readonly arcTab: Locator;
	readonly reviewTab: Locator;
	readonly optionDropdown: Locator;
	readonly listSizeDropdown: Locator;
	readonly saveButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.profileDropdown = page.locator('div[ng-click="$ctrl.toggleProfileInfo()"]');
		this.preferencesLink = page.locator('a.user-details-action:has-text("Preferences")');
		this.arcTab = page.getByText('Arc', { exact: true });
		this.reviewTab = page.locator('a.cursor-pointer:has-text("Review")');
		this.optionDropdown = page.locator('select[name="option"]');
		this.listSizeDropdown = page.locator('select.form-control');
		this.saveButton = page.locator('.btn.btn-success.sw-dropdown-filter-wrp');
	}

	async goToPreferences() {
		await this.profileDropdown.click();
		await this.preferencesLink.click();
	}

	async changeArcReviewSettings(option: string, listSize: string) {
		await this.arcTab.click();
		await this.reviewTab.click();
		await this.optionDropdown.selectOption(option);
		await this.listSizeDropdown.selectOption(listSize);
		await this.saveButton.click();
		await this.page.waitForTimeout(3000); // Simulating wait for save to complete
	}

	async verifyArcReviewSettings(expectedOption: string, expectedListSize: string) {
		await this.arcTab.click();
		await this.reviewTab.click();
		await expect(this.optionDropdown).toContainText(expectedOption);
		await expect(this.listSizeDropdown).toContainText(expectedListSize);
	}
}
