import { Page, Locator } from '@playwright/test';
import { TableHelper } from '../helpers/TableHelper';
import { CommonPO } from '../common/CommonPO';
import { AddWorkOrderPO } from './AddWorkOrderPO';
import { OpenWorkOrdersPO } from './OpenWorkOrdersPO';
import { VendorWorkOrdersPO } from './VendorWorkOrdersPO';
import { ClosedWorkOrdersPO } from './ClosedWorkOrdersPO';
import { AllWorkOrdersPO } from './AllWorkOrdersPO';
import { VendorManagementPO } from './VendorManagementPO';
import { ReportsPO } from './ReportsPO';
import { MoreWorkOrdersPO } from './MoreWorkOrdersPO';

export class WorkOrdersPO {
	private readonly page: Page;
	readonly tableHelper: TableHelper;
	readonly common: CommonPO;
	readonly addWorkOrderPO: AddWorkOrderPO;
	readonly openWorkOrdersPO: OpenWorkOrdersPO;
	readonly vendorWorkOrdersPO: VendorWorkOrdersPO;
	readonly closedWorkOrdersPO: ClosedWorkOrdersPO;  readonly allWorkOrdersPO: AllWorkOrdersPO;
	readonly vendorManagementPO: VendorManagementPO;
	readonly reportsPO: ReportsPO;
	readonly moreWorkOrdersPO: MoreWorkOrdersPO;

	constructor(page: Page) {
		this.page = page;
		this.common = new CommonPO(page);
		this.tableHelper = new TableHelper(page);
		this.addWorkOrderPO = new AddWorkOrderPO(page);
		this.openWorkOrdersPO = new OpenWorkOrdersPO(page);
		this.vendorWorkOrdersPO = new VendorWorkOrdersPO(page);
		this.closedWorkOrdersPO = new ClosedWorkOrdersPO(page);
		this.allWorkOrdersPO = new AllWorkOrdersPO(page);
		this.vendorManagementPO = new VendorManagementPO(page);
		this.reportsPO = new ReportsPO(page);
		this.moreWorkOrdersPO = new MoreWorkOrdersPO(page);
	}
}
