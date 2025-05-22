import { Page } from '@playwright/test';
import { TableHelper } from '../helpers/TableHelper';
import { CommonPO } from '../common/CommonPO';
import { GeneralLedgerPO } from './GeneralLedgerPO';
import { ReceivablesPO } from './ReceivablesPO';
import { PayablesPO } from './PayablesPO';
import { BankingPO } from './BankingPO';
import { ReportingPO } from './ReportingPO';
import { SettingsPO } from './SettingsPO';

export class AccountingPO {
	private readonly page: Page;
	readonly tableHelper: TableHelper;
	readonly common: CommonPO;
	readonly generalLedgerPO: GeneralLedgerPO;
	readonly receivablesPO: ReceivablesPO;
	readonly payablesPO: PayablesPO;
	readonly bankingPO: BankingPO;
	readonly reportingPO: ReportingPO;
	readonly settingsPO: SettingsPO;

	constructor(page: Page) {
		this.page = page;
		this.common = new CommonPO(page);
		this.tableHelper = new TableHelper(page);
		this.generalLedgerPO = new GeneralLedgerPO(page);
		this.receivablesPO = new ReceivablesPO(page);
		this.payablesPO = new PayablesPO(page);
		this.bankingPO = new BankingPO(page);
		this.reportingPO = new ReportingPO(page);
		this.settingsPO = new SettingsPO(page);
	}
}
