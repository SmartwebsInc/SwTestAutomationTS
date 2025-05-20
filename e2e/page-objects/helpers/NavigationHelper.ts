import { Page, Locator, expect } from '@playwright/test';

export class NavigationHelper {
	private readonly _page: Page;
	public readonly hamburgerMenu: Locator;
	public readonly leftMenuItem: Locator;
	public readonly sublistHelperLocator: Locator;
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
		this.sublistHelperLocator = page.locator('ul.lsm-sub-list').last();
		this.leftMenuSubItem = this.sublistHelperLocator.locator('.sub-menu-item-title');
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
		await Promise.all([
			this.getAssociationOption(associationName).click(),
			this._page.waitForResponse((response) => response.url().includes('SWWebservice/Services/Simple/CommonService.svc/GetUserRights') && response.status() === 200),
		]);
		await this._page.waitForTimeout(500);
	}

	public getManageOption(optionName: string): Locator {
		return this._page.locator(`.sw-drop-menu-item-label:text-is('${optionName}')`);
	}

	public async manageMenuNavigation(...menuItems: string[]) {
		await this.gearToggle.click();
		await this._page.waitForTimeout(500);

		await this.manageButton.click();
		await this._page.waitForTimeout(500);

		for (let i = 0; i < menuItems.length; i++) {
			const optionLocator = this.getManageOption(menuItems[i]);
			await expect(optionLocator).toBeVisible();
			await this._page.waitForTimeout(200);

			if (i < menuItems.length - 1) {
				await optionLocator.hover();
			}

			if (i === menuItems.length - 1) {
				await optionLocator.click();
			}
		}
	}

	public async leftMenuNavigation(...menuItems: string[]) {
		await this.hamburgerMenu.click();
		await this._page.waitForTimeout(500);

		for (let i = 0; i < menuItems.length; i++) {
			const items = i === 0 ? await this.leftMenuItem.all() : await this.leftMenuSubItem.all();

			let matched = false;

			for (const item of items) {
				const text = await item.textContent();
				if (text?.trim() === menuItems[i]) {
					await expect(item).toBeVisible();
					await expect(item).not.toHaveClass('disabled-module');
					await item.click();
					await this._page.waitForTimeout(300);
					matched = true;
					break;
				}
			}

			if (!matched) {
				throw new Error(`Menu item not found: "${menuItems[i]}"`);
			}
		}
	}
}
