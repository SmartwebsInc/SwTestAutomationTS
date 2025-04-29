import { Page, Locator } from '@playwright/test';

export class DashboardReportPO {
	private readonly page: Page;
	readonly reportTab: Locator;
	readonly reportDashboardTab: Locator;
	readonly dateTypeDropdown: Locator;
	readonly startDateButton: Locator;
	readonly endDateButton: Locator;
	readonly runReportButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.reportTab = page.locator('.dropdown-toggle.ng-binding.ng-scope');
		this.reportDashboardTab = page.locator('.ng-scope.menu-item');
		this.dateTypeDropdown = page.locator('select[ng-model=\'$ctrl.reportSelectedDateType\']');
		this.startDateButton = page.locator('button[ng-click=\'$ctrl.toggleDatepicker($ctrl.startDate)\']');
		this.endDateButton = page.locator('button[ng-click=\'$ctrl.toggleDatepicker($ctrl.endDate)\']');
		this.runReportButton = page.locator('.btn.btn-primary.viol-report-btn');
	}
}