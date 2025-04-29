import { Page, Locator, expect } from '@playwright/test';
import { TableHelper } from '../helpers/TableHelper';

export class AddViolationPO {
	private readonly page: Page;
	private readonly tableHelper: TableHelper;
	readonly categoryOption: Locator;
	readonly subcategoryOption: Locator;
	readonly okButton: Locator;
	readonly cancelButton: Locator;
	readonly ownerName: Locator;
	readonly unitAddress: Locator;
	readonly mailingAddress: Locator;
	readonly lotNumber: Locator;
	readonly accountNumber: Locator;
	readonly stageDropdown: Locator;
	readonly fineInput: Locator;
	readonly newButton: Locator;
	readonly noteButton: Locator;
	readonly sendButton: Locator;
	readonly queueButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.tableHelper = new TableHelper(page);
		this.categoryOption = page.locator('.category-items-wrp').nth(0).locator('.category-item');
		this.subcategoryOption = page.locator('.category-items-wrp').nth(1).locator('.category-item');
		this.okButton = page.getByRole('button', { name: 'Ok' });
		this.cancelButton = page.getByRole('button', { name: 'Cancel' });
		this.ownerName = page.locator('div.control-label:has-text(\'Owner Name\') + input');
		this.unitAddress = page.locator('div.control-label:has-text(\'Unit Address\') + input');
		this.mailingAddress = page.locator('div.control-label:has-text(\'Mailing Address\') + input');
		this.lotNumber = page.locator('div.control-label:has-text(\'Lot#\') + input');
		this.accountNumber = page.locator('div.control-label:has-text(\'Account Number\') + input');
		this.stageDropdown = page.locator('select[name=\'stage\']');
		this.fineInput = page.locator('.input-group-addon + input');
		this.newButton = page.locator('.violation-drawer-switch i + div:has-text(\'New\')');
		this.noteButton = page.locator('.violation-drawer-switch i + div:has-text(\'Note\')');
		this.sendButton = page.locator('.sw-btn-wrp.sw-btn-small.sw-send-color.sw-icon-only');
		this.queueButton = page.locator('.violation-drawer-switch i + div:has-text(\'Queue\')');
	}

	async setCategorySubcategory(value1: string, value2?: string) {
		await this.categoryOption.filter({ hasText: value1 }).click();
		if (value2) {
			await this.subcategoryOption.filter({ hasText: value2 }).click();
		}
		await this.okButton.click();
	}

	async addViolationAndSend(ownerNameInput: string, category: string, subcategory?: string) {
		await expect(this.ownerName).toBeVisible();
		await this.ownerName.fill(ownerNameInput);
		await this.tableHelper.clickRowContainingText(ownerNameInput);
		await this.setCategorySubcategory(category, subcategory);
		await this.page.waitForResponse(
			response => response.url().includes('SWWebService/Services/Simple/ViolationService.svc/SaveNewViolationEnc')
            && response.status() === 200,
			{ timeout: 30000 },
		);
		await this.sendButton.click();
	}

	async addViolationAndQueue(ownerNameInput: string, category: string, subcategory?: string) {
		await expect(this.ownerName).toBeVisible();
		await this.ownerName.fill(ownerNameInput);
		await this.tableHelper.clickRowContainingText(ownerNameInput);
		await this.setCategorySubcategory(category, subcategory);
		await this.page.waitForResponse(
			response => response.url().includes('SWWebService/Services/Simple/ViolationService.svc/SaveNewViolationEnc')
            && response.status() === 200,
			{ timeout: 30000 },
		);
		await this.queueButton.click();
	}
}