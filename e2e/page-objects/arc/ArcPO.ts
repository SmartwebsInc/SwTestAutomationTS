import { Page, Locator } from '@playwright/test';
import { TableHelper } from '../helpers/TableHelper';
import { CommonPO } from '../common/CommonPO';
import { DashboardPO } from './DashboardPO';
import { AddPO } from './AddPO';
import { StagedPO } from './StagedPO';
import { ReviewPO } from './ReviewPO';
import { BuildPO } from './BuildPO';
import { CompletedPO } from './CompletedPO';
import { DeclinedWithdrawnPO } from './DeclinedWithdrawnPO';
import { SearchPO } from './SearchPO';
import { ReportsPO } from './ReportsPO';
import { MorePO } from './MorePO';

export class ArcPO {
	private readonly page: Page;
	readonly tableHelper: TableHelper;
	readonly common: CommonPO;
	readonly dashboardPO: DashboardPO;
	readonly addPO: AddPO;
	readonly stagedPO: StagedPO;
	readonly reviewPO: ReviewPO;
	readonly buildPO: BuildPO;
	readonly completedPO: CompletedPO;
	readonly declinedWithdrawnPO: DeclinedWithdrawnPO;
	readonly searchPO: SearchPO;
	readonly reportsPO: ReportsPO;
	readonly morePO: MorePO;

	constructor(page: Page) {
		this.page = page;
		this.common = new CommonPO(page);
		this.tableHelper = new TableHelper(page);
		this.dashboardPO = new DashboardPO(page);
		this.addPO = new AddPO(page);
		this.stagedPO = new StagedPO(page);
		this.reviewPO = new ReviewPO(page);
		this.buildPO = new BuildPO(page);
		this.completedPO = new CompletedPO(page);
		this.declinedWithdrawnPO = new DeclinedWithdrawnPO(page);
		this.searchPO = new SearchPO(page);
		this.reportsPO = new ReportsPO(page);
		this.morePO = new MorePO(page);
	}
}
