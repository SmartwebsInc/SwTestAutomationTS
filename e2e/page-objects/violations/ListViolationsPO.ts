import { Page, Locator } from '@playwright/test';

export class ListViolationsPO {
	private readonly page: Page;
	readonly itemListViewViolation: Locator;
	readonly newButtonMain: Locator;
	readonly multiButtonMain: Locator;
	readonly newButton: Locator;
	readonly multiButton: Locator;
	readonly optionsButton: Locator;
	readonly detailsButton: Locator;
	readonly showHistoryButton: Locator;
	readonly hideHistoryButton: Locator;
	readonly escalateButton: Locator;
	readonly closeButton: Locator;
	readonly optionsButtonBottom: Locator;

	readonly gridViewButton: Locator;
	readonly cardViewButton: Locator;
	readonly listViewButton: Locator;
	readonly mobileSiteButton: Locator;
	readonly filterButton: Locator;

	readonly pdfDownloadButton: Locator;
	readonly excelDownloadButton: Locator;
	readonly changeColumnsButton: Locator;

	readonly viewInNewTabButton: Locator;
	readonly downloadButton: Locator;
	readonly emailButton: Locator;
	readonly postButton: Locator;
	readonly closeModalButton: Locator;
	readonly openButton: Locator;

	readonly allStreetsDropdown: Locator;
	readonly allViolationsDropdown: Locator;

	readonly violationOptionsDrawer: Locator;
	readonly changeCategorySubcategoryTab: Locator;
	readonly changeLocationTab: Locator;
	readonly deleteStageOrViolationTab: Locator;
	readonly uploadDocumentTab: Locator;
	readonly updateCureTab: Locator;
	readonly onOffHoldTab: Locator;
	readonly escalateIgnoreCuresTab: Locator;
	readonly addUpdateViolationStatusTab: Locator;
	readonly addUpdateViolationNotesTab: Locator;
	readonly deleteViolationButton: Locator;
	readonly deleteViolationWarning: Locator;
	readonly addNoteTextarea: Locator;
	readonly saveNoteButton: Locator;
	readonly drawerCancelButton: Locator;
	readonly drawerHeaderTitle: Locator;

	constructor(page: Page) {
		this.page = page;
		this.itemListViewViolation = page.locator('.flexbox.unit-list-header');
		this.newButtonMain = page.locator('i + div:has-text(\'New\')');
		this.multiButtonMain = page.locator('i + div:has-text(\'Multi\')');
		this.newButton = page.locator('.flexbox .sw-btn-wrp span:has-text(\'New\')');
		this.multiButton = page.locator('.flexbox .sw-btn-wrp span:has-text(\'Multi\')');
		this.optionsButton = page.locator('.flexbox .sw-btn-wrp span:has-text(\'Options\')');
		this.detailsButton = page.locator('.flexbox .sw-btn-wrp span:has-text(\'Details\')');
		this.showHistoryButton = page.locator('.flexbox .sw-btn-wrp span:has-text(\'Show History\')');
		this.hideHistoryButton = page.locator('.flexbox .sw-btn-wrp:has-text(\'Show History\')');
		this.escalateButton = page.locator('.control-panel .sw-btn-wrp:has-text(\'Escalate\')');
		this.closeButton = page.locator('.control-panel .sw-btn-wrp:has-text(\'Close\')');
		this.optionsButtonBottom = page.locator('.control-panel .sw-btn-wrp:has-text(\'Options\')');

		// view
		this.gridViewButton = page.locator('div[uib-tooltip=\'Grid view\']');
		this.cardViewButton = page.locator('div[uib-tooltip=\'Card view\']');
		this.listViewButton = page.locator('div[uib-tooltip=\'List view\']');
		this.mobileSiteButton = page.locator('div[uib-tooltip=\'Mobile site\']');
		this.filterButton = page.locator('.fa-filter');

		// export
		this.pdfDownloadButton = page.locator('[title=\'Export to Pdf\']');
		this.excelDownloadButton = page.locator('[title=\'Export to Excel\']');
		this.changeColumnsButton = page.locator('[title=\'Change columns\']');

		// export modal buttons
		this.viewInNewTabButton = page.locator('button:has-text(\'View in new tab\')');
		this.downloadButton = page.locator('button:has-text(\'Download\')');
		this.emailButton = page.locator('button:has-text(\'Email\')');
		this.postButton = page.locator('button:has-text(\'Post\')');
		this.closeModalButton = page.locator('button:has-text(\'Close\')');
		this.openButton = page.locator('button:has-text(\'Open\')');

		this.allStreetsDropdown = page.locator('select.sw-street-search');
		this.allViolationsDropdown = page.locator('.sw-violation-search-wrp select').nth(2);

		// Drawer-related locators
		this.violationOptionsDrawer = page.locator('violation-options-drawer');
		this.changeCategorySubcategoryTab = this.violationOptionsDrawer.getByText('Change Category / Subcategory');
		this.changeLocationTab = this.violationOptionsDrawer.getByText('Change Location');
		this.deleteStageOrViolationTab = this.violationOptionsDrawer.getByText('Delete this stage or violation');
		this.uploadDocumentTab = this.violationOptionsDrawer.getByText('Upload a document');
		this.updateCureTab = this.violationOptionsDrawer.getByText('Update Cure');
		this.onOffHoldTab = this.violationOptionsDrawer.getByText('On/Off Hold');
		this.escalateIgnoreCuresTab = this.violationOptionsDrawer.getByText('Escalate (ignore cures)');
		this.addUpdateViolationStatusTab = this.violationOptionsDrawer.getByText('Add/Update Violation Status');
		this.addUpdateViolationNotesTab = this.violationOptionsDrawer.getByText('Add/Update Violation Notes');
		this.deleteViolationButton = this.violationOptionsDrawer.getByRole('button', { name: 'Delete' });
		this.deleteViolationWarning = this.violationOptionsDrawer.getByText('Are you sure you want to delete this violation?');
		this.addNoteTextarea = this.violationOptionsDrawer.getByPlaceholder('Add note').first().or(this.violationOptionsDrawer.getByLabel('Add note').first());
		this.saveNoteButton = this.violationOptionsDrawer.getByRole('button', { name: 'Save Note' });
		this.drawerCancelButton = this.violationOptionsDrawer.getByRole('button', { name: 'Cancel' }).first().or(this.violationOptionsDrawer.getByRole('button', { name: 'Close' }).first());
		this.drawerHeaderTitle = this.violationOptionsDrawer.locator('.drawer-header-title, .drawer-header h2, .drawer-header h3');
	}

	async openViolationWithTextInTable(value: string) {
		const rows = await this.itemListViewViolation.count();
		for (let i = 0; i < rows; i++) {
			const row = this.itemListViewViolation.nth(i);
			const text = await row.innerText();
			if (text.includes(value)) {
				await row.click();
				break;
			}
		}
	}
}