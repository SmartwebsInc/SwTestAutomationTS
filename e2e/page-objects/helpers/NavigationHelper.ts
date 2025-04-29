import { Page, Locator, expect } from '@playwright/test';

export class NavigationHelper {
	private readonly _page: Page;
	public readonly hamburgerMenu: Locator;
	public readonly leftMenuItem: Locator;
	public readonly leftMenuSubItem: Locator;
	public readonly gearToggle: Locator;
	public readonly manageButton: Locator;
	private readonly associationDropdown: Locator;
	private readonly searchAssociationInput: Locator;
	private readonly associationOption: Locator;

	constructor(page: Page) {
		this._page = page;
		this.hamburgerMenu = page.locator('#sw-hamburger');
		this.leftMenuItem = page.locator('.menu-item-title');
		this.leftMenuSubItem = page.locator('.sub-menu-item-title');
		this.gearToggle = page.locator('div[ng-click="$ctrl.toggleTopMenu()"]');
		this.manageButton = page.locator('.item-header.item-parent-header', { hasText: 'Manage' });
		this.associationDropdown = page.locator('.header-name');
		this.searchAssociationInput = page.locator('input[placeholder=\'Search association...\']');
		this.associationOption = page.locator('.header-list-item');
	}

	public getAssociationOption(name: string): Locator {
		return this.associationOption.locator(`a:has-text('${name}')`);
	}

	public async selectDefaultAssociation() {
		await this.selectAssociationDropdown('Cypress Automation');
	}

	public async selectAssociationDropdown(associationName: string) {
		await this.associationDropdown.click();
		await this.searchAssociationInput.pressSequentially(associationName);
		await this.getAssociationOption(associationName).click();
	}

	public getManageOption(optionName: string): Locator {
		return this._page.locator(`.sw-drop-menu-item-label:text-is('${optionName}')`);
	}

	public async manageMenuNavigation(...menuItems: (string | null)[]) {
		await this.gearToggle.click();
		await this._page.waitForTimeout(500);

		await this.manageButton.click();
		await this._page.waitForTimeout(500);

		const filteredItems = menuItems.filter((item): item is string => item !== null);

		for (let i = 0; i < filteredItems.length; i++) {
			const optionLocator = this.getManageOption(filteredItems[i]);
			await expect(optionLocator).toBeVisible();
			await this._page.waitForTimeout(200);

			if (i < filteredItems.length - 1) {
				await optionLocator.hover();
			}

			if (i === filteredItems.length - 1) {
				await optionLocator.click();
			}
		}
	}

	public async leftMenuNavigation(...menuItems: (string | null)[]) {
		await this.hamburgerMenu.click();
		await this._page.waitForTimeout(500);

		const filteredItems = menuItems.filter((item): item is string => item !== null);

		for (let i = 0; i < filteredItems.length; i++) {
			const locator = i === 0
				? this.leftMenuItem.filter({ hasText: filteredItems[i] })
				: this.leftMenuSubItem.filter({ hasText: filteredItems[i] });

			await expect(locator).toBeVisible();
			await locator.click();
			await this._page.waitForTimeout(300);
		}
	}
}