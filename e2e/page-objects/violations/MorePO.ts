import { Page, Locator } from '@playwright/test';

export class MorePO {
	private readonly page: Page;

	// policies
	readonly openPoliciesTab: Locator;
	readonly closedPoliciesTab;
	readonly associationsDropdown: Locator;
	readonly addExceptionButton: Locator;
	readonly linkButton: Locator;

	// letters
	readonly singleViolationsTab: Locator;
	readonly multiViolationsTab: Locator;
	readonly closedViolationsTab: Locator;
	readonly createNewTemplateButton: Locator;
	readonly copyLetterTemplateButton: Locator;
	readonly searchViolationLetterInput: Locator;

	// multi-violation policy
	readonly newStatusButton: Locator;
	readonly statusName: Locator;
	readonly saveButton: Locator;
	readonly automailingExclusionPage: Locator;
	readonly createNewStatusDrawer: Locator;
	readonly includeIconCheckbox: Locator;
	readonly unitStatusCheckbox: Locator;
	readonly violationStatusCheckbox: Locator;
	readonly listGroupItem: Locator;
	readonly iframeAssociationDetailContent: Locator;

	constructor(page: Page) {
		this.page = page;

		this.openPoliciesTab = page.getByRole('link', { name: 'Open Policies' });
		this.closedPoliciesTab = page.getByRole('link', { name: 'Closed Policies' });
		this.associationsDropdown = page.locator('[id*="dpdnAssociationList"]');
		this.addExceptionButton = page.locator('input[value="Add Exception"]');
		this.linkButton = page.locator('button:has-text("Link")');

		this.singleViolationsTab = page.getByRole('link', { name: 'Single-violations' });
		this.multiViolationsTab = page.getByRole('link', { name: 'Multi-violations' });
		this.closedViolationsTab = page.getByRole('link', { name: 'Closed-violations' });
		this.createNewTemplateButton = page.locator('button:has-text("Create New Template")');
		this.copyLetterTemplateButton = page.locator('button:has-text("Copy Letter Template")');
		this.searchViolationLetterInput = page.locator('input[type="search"]');

		this.newStatusButton = page.locator('button[ng-click=\'$ctrl.showCreateStatus()\']');
		this.statusName = page.locator('input[ng-model=\'$ctrl.status.Name\']');
		this.saveButton = page.locator('button[ng-click=\'$ctrl.saveOrUpdate()\']');
		this.automailingExclusionPage = page.locator('#violations-view');
		this.createNewStatusDrawer = page.locator('status-drawer');
		this.includeIconCheckbox = page.locator('#includeIcon');
		this.unitStatusCheckbox = page.locator('#UnitStatus');
		this.violationStatusCheckbox = page.locator('#ViolStatus');
		this.listGroupItem = page.locator('.list-group-item.ng-scope');
		this.iframeAssociationDetailContent = page.locator('#manageAssociation_association_detail_tblRO_Association');
	}
}
