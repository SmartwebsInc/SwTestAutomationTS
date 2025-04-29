import { Page, Locator } from '@playwright/test';

export class MorePO {
	private readonly page: Page;
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

	private _getIframeBodyInternal(): Locator {
		const iframe = this.page.frameLocator('iframe[id=\'legacy-iframe\']');
		return iframe.locator('body');
	}

	async selectFrameAssociationItem(value: string) {
		const iframeBody = this._getIframeBodyInternal();
		await iframeBody.locator(`a[href='ManageManagementCompany.aspx?tab=Association&subtab=Detail&location=Nothing&associationID=13307']:has-text('${value}')`).click();
	}
}