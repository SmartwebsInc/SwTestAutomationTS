import { Page } from '@playwright/test';
import { TableHelper } from '../helpers/TableHelper';
import { CommonPO } from '../common/CommonPO';

export class PayablesPO {
	private readonly page: Page;
	readonly tableHelper: TableHelper;
	readonly common: CommonPO;

	constructor(page: Page) {
		this.page = page;
		this.common = new CommonPO(page);
		this.tableHelper = new TableHelper(page);
	}
}
