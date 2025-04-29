import { Page, Locator } from '@playwright/test';

export class MoreOptionsPanelPO {
	private readonly page: Page;

	readonly moreOptionsBtn: Locator;
	readonly applyBtn: Locator;
	readonly resetButton: Locator;

	// State checkboxes
	readonly fixCheckbox: Locator;
	readonly openCheckbox: Locator;
	readonly closedCheckbox: Locator;
	readonly onHoldCheckbox: Locator;
	readonly noViolationsCheckbox: Locator;
	readonly inCureCheckbox: Locator;

	// Stage checkboxes
	readonly inCurrentStageCheckbox: Locator;
	readonly stageAllCheckbox: Locator;

	// Dropdowns
	readonly categoryDropdown: Locator;
	readonly subcategoryDropdown: Locator;
	readonly locationDropdown: Locator;
	readonly unitTagsDropdown: Locator;

	// Created Date range
	readonly createdStartDateInput: Locator;
	readonly createdEndDateInput: Locator;

	// Cure Expiration Date range
	readonly cureStartDateInput: Locator;
	readonly cureEndDateInput: Locator;

	// No Updates Since Date
	readonly updatedSinceStartDateInput: Locator;

	// PrintPO
	readonly associationsDropdown: Locator;
	readonly showResultsThatMatch: Locator;
	readonly singleViolationTypeCheckbox: Locator;
	readonly multiViolationTypeCheckbox: Locator;
	readonly emailMailingMethodCheckbox: Locator;
	readonly firstClassMailingMethodCheckbox: Locator;
	readonly certifiedMailingMethodCheckbox: Locator;

	constructor(page: Page) {
		this.page = page;

		this.moreOptionsBtn = page.locator('[data-target=\'#moreOptions\'] span:has-text(\'More options\')');
		this.applyBtn = page.getByRole('button', { name: 'Apply' });
		this.resetButton = page.getByRole('button', { name: 'Reset' });

		// State checkboxes
		this.fixCheckbox = page.locator('label:has-text(\'Fix\') >> input[type=\'checkbox\']');
		this.openCheckbox = page.locator('label:has-text(\'Open\') >> input[type=\'checkbox\']');
		this.closedCheckbox = page.locator('label:has-text(\'Closed\') >> input[type=\'checkbox\']');
		this.onHoldCheckbox = page.locator('label:has-text(\'On Hold\') >> input[type=\'checkbox\']');
		this.noViolationsCheckbox = page.locator('label:has-text(\'No Violations\') >> input[type=\'checkbox\']');
		this.inCureCheckbox = page.locator('label:has-text(\'In Cure\') >> input[type=\'checkbox\']');

		// Stages
		this.inCurrentStageCheckbox = page.locator('input[name=\'selectedStages[]\']');
		this.stageAllCheckbox = page.locator('input[name=\'selectedStagesNoneAll\']');

		// Dropdowns
		this.categoryDropdown = page.locator('select[ng-model=\'$ctrl.selectedCategoryId\']');
		this.subcategoryDropdown = page.locator('select[ng-model=\'$ctrl.selectedSubcategoryId\']');
		this.locationDropdown = page.locator('select[ng-model=\'$ctrl.selectedLocation\']');
		this.unitTagsDropdown = page.locator('.tags-dropdown-filter-wrp >> button.dropdown-toggle');

		// Created Date inputs
		this.createdStartDateInput = page.locator('div:has(span:has-text(\'Created date\')) input[placeholder=\'Start Date\']');
		this.createdEndDateInput = page.locator('div:has(span:has-text(\'Created date\')) input[placeholder=\'End Date\']');

		// Cure Expiration inputs
		this.cureStartDateInput = page.locator('div:has(span:has-text(\'Cure expiration date\')) input[placeholder=\'Start Date\']');
		this.cureEndDateInput = page.locator('div:has(span:has-text(\'Cure expiration date\')) input[placeholder=\'End Date\']');

		// No Updates Since input
		this.updatedSinceStartDateInput = page.locator('div:has(span:has-text(\'No updates since\')) input[placeholder=\'Start Date\']');

		// PrintPO
		this.associationsDropdown = page.locator('span:has-text(\'Associations\') + sw span');
		this.showResultsThatMatch = page.locator('span:has-text(\'Show results that match\') + select');
		this.singleViolationTypeCheckbox = page.locator('#idchksingle');
		this.multiViolationTypeCheckbox = page.locator('#idchkmulti');
		this.emailMailingMethodCheckbox = page.locator('[name=\'chkemail\']');
		this.firstClassMailingMethodCheckbox = page.locator('[name=\'chkfirstclass\']');
		this.certifiedMailingMethodCheckbox = page.locator('[name=\'chkcertified\']');
		this.unitTagsDropdown = page.locator('span:has-text(\'Unit Tags\') + div button');
	}

	async inCurrentStageCheckboxController(...stagesToCheck: number[]) {
		const count = await this.inCurrentStageCheckbox.count();

		for (let i = 0; i < count; i++) {
			if (stagesToCheck.includes(i)) {
				await this.inCurrentStageCheckbox.nth(i).check();
			} else {
				await this.inCurrentStageCheckbox.nth(i).uncheck();
			}
		}
	}
}