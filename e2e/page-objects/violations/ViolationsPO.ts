import { Page, Locator, expect } from '@playwright/test';
import { TableHelper } from '../helpers/TableHelper';
import { CommonPO } from '../common/CommonPO';
import { AddViolationPO } from '../violations/AddViolationPO';
import { AssessmentsPO } from '../violations/AssessmentsPO';
import { DashboardReportPO } from '../violations/DashboardReportPO';
import { ListViolationsPO } from '../violations/ListViolationsPO';
import { MoreOptionsPanelPO } from '../violations/MoreOptionsPanelPO';
import { MorePO } from '../violations/MorePO';
import { PrintPO } from '../violations/PrintPO';
import { QueuedPO } from '../violations/QueuedPO';
import { ViolationReportsPO } from '../violations/ViolationReportsPO';

export class ViolationsPO {
	private readonly page: Page;
	readonly tableHelper: TableHelper;
	readonly common: CommonPO;
	readonly addViolationPO: AddViolationPO;
	readonly assessmentsPO: AssessmentsPO;
	readonly dashboardReportPO: DashboardReportPO;
	readonly listViolationsPO: ListViolationsPO;
	readonly moreOptionsPanelPO: MoreOptionsPanelPO;
	readonly morePO: MorePO;
	readonly printPO: PrintPO;
	readonly queuedPO: QueuedPO;
	readonly violationReportsPO: ViolationReportsPO;

	readonly listTab: Locator;
	readonly addTab: Locator;
	readonly queuedTab: Locator;
	readonly printTab: Locator;
	readonly assessmentsTab: Locator;

	readonly searchFilter: Locator;
	readonly searchButton: Locator;
	readonly searchDropdownOptions: Locator;
	readonly violationOptions: Locator;
	readonly violationHeader: Locator;
	readonly detailsButton: Locator;
	readonly ownerUnitDrawer: Locator;
	readonly closeViolationButton: Locator;
	readonly confirmCloseViolationButton: Locator;
	readonly reopenViolationButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.common = new CommonPO(page);
		this.tableHelper = new TableHelper(page);
		this.addViolationPO = new AddViolationPO(page);
		this.assessmentsPO = new AssessmentsPO(page);
		this.dashboardReportPO = new DashboardReportPO(page);
		this.listViolationsPO = new ListViolationsPO(page);
		this.moreOptionsPanelPO = new MoreOptionsPanelPO(page);
		this.morePO = new MorePO(page);
		this.printPO = new PrintPO(page);
		this.queuedPO = new QueuedPO(page);
		this.violationReportsPO = new ViolationReportsPO(page);

		this.listTab = page.locator('a[ui-sref=\'violations.list\']');
		this.addTab = page.locator('a[ui-sref=\'none\']');
		this.queuedTab = page.locator('a[ui-sref=\'violations.queued\']');
		this.printTab = page.locator('a[ui-sref=\'violations.print\']');
		this.assessmentsTab = page.locator('a[ui-sref=\'violations.assessments\']');
		this.searchFilter = page.locator('.sw-search-input');
		this.searchButton = page.locator('.sw-search-btn');
		this.searchDropdownOptions = page.locator('select.sw-search-select');
		this.violationOptions = page.locator('div[class=\'sw-btn-wrp sw-btn-small sw-options-color ng-scope\']');
		this.violationHeader = page.locator('.violation.ng-scope');
		this.detailsButton = page.locator('.sw-btn-wrp.sw-btn-small.sw-details-color.ng-scope');
		this.ownerUnitDrawer = page.locator('owner-unit-drawer');
		this.closeViolationButton = page.locator('.sw-btn-wrp.sw-btn-small.sw-close-color.ng-scope');
		this.confirmCloseViolationButton = page.locator('.btn.btn-default.ng-binding.ng-scope.btn-success');
		this.reopenViolationButton = page.locator('.sw-btn-wrp.sw-btn-small.sw-reopen-color.ng-scope');
	}

	async searchViolation(searchOption: string, searchValue: string) {
		await this.searchDropdownOptions.selectOption(searchOption);
		await this.searchFilter.fill(searchValue);
		await this.page.waitForResponse(
			(response) =>
				(response.url().includes('GetUnits') ||
					response.url().includes('GetQueuedViolations') ||
					response.url().includes('GetViolationItemsToPrint') ||
					response.url().includes('GetViolationsToAssess')) &&
				response.status() === 200,
			{ timeout: 30000 },
		);
		await this.searchButton.click();
	}

	async deleteViolation(searchOption: string, searchValue: string) {
		await this.page.goto('#/violations/list');
		await this.listTab.click();
		await this.searchViolation(searchOption, searchValue);
		await this.listViolationsPO.openViolationWithTextInTable(searchValue);
		await this.listViolationsPO.optionsButtonBottom.click();
		await this.listViolationsPO.deleteStageOrViolationTab.click();
		await this.page.waitForResponse((response) => response.url().includes('SWWebservice/Services/ViolationArea/ViolationAreaService.svc/DeleteViolatio') && response.status() === 200, {
			timeout: 30000,
		});
		await this.listViolationsPO.deleteViolationButton.click();
	}

	async printViolation() {
		await this.printPO.cardViolation.click();
		await this.printPO.printSendSelectedButton.click();
		await this.common.combineButton.click();
		await this.common.openButtonModal.click();
		await this.page.waitForResponse((response) => response.url().includes('SWWebservice/Services/ViolationArea/ViolationAreaService.svc/PrintAndMail') && response.status() === 200, {
			timeout: 30000,
		});
		await this.common.yesButton.click();
	}

	async assessViolation() {
		await this.assessmentsPO.cardViolation.click();
		await this.page.waitForResponse((response) => response.url().includes('SWWebservice/Services/ViolationArea/ViolationAreaService.svc/AssessViolations') && response.status() === 200, {
			timeout: 30000,
		});
		await this.assessmentsPO.assessSelectedButton.click();
	}
}
