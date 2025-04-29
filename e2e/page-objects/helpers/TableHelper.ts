import { Page, Locator, expect } from '@playwright/test';

export class TableHelper {
	private readonly _page: Page;
	public readonly columnHeaders: Locator;
	public readonly rowTable: Locator;
	public readonly cellTable: Locator;

	constructor(page: Page) {
		this._page = page;
		this.columnHeaders = page.locator('.ag-header-row .ag-header-cell');
		this.rowTable = page.locator('.ag-body-viewport-wrapper .ag-row');
		this.cellTable = page.locator('.ag-body-viewport-wrapper .ag-cell');
	}

	public async getTableRowCount(): Promise<number> {
		await expect(this.rowTable.nth(0)).toBeVisible();
		return await this.rowTable.count();
	}

	public async waitForTableNotToBeEmpty(): Promise<void> {
		await expect(this.rowTable.nth(0)).not.toBeEmpty();
	}

	public async getTableColumnCount(): Promise<number> {
		await expect(this.rowTable.nth(0)).not.toBeEmpty();
		return await this.rowTable.nth(0).locator('.ag-cell').count();
	}

	public async getRowContent(rowNumber: number): Promise<string[]> {
		const rowContent: string[] = [];
		const columnCount = await this.getTableColumnCount();

		for (let i = 0; i < columnCount; i++) {
			const data = await this.rowTable.nth(rowNumber).locator('.ag-cell').nth(i).innerText();
			rowContent.push(data);
		}

		return rowContent;
	}

	public async getColumnContent(columnNumber: number, notEmptyColumnMaxRowsCount: number = 1): Promise<string[]> {
		const columnContent: string[] = [];
		await expect(this.rowTable.nth(0)).not.toBeEmpty();

		const rowCount = await this.getTableRowCount();
		if (rowCount === 0) return columnContent;

		for (let i = 0; i < Math.min(rowCount, 20); i++) {
			const cell = this.rowTable.nth(i).locator('.ag-cell').nth(columnNumber);
			await expect(cell).toBeVisible();
			columnContent.push(await cell.innerText());
		}

		return columnContent;
	}

	public async getColumnHeaders(): Promise<string[]> {
		const values: string[] = [];
		const count = await this.columnHeaders.count();

		for (let index = 0; index < count; index++) {
			values.push(await this.columnHeaders.nth(index).innerText());
		}

		return values;
	}

	public async getColumnContentByHeaderName(headerName: string, notEmptyColumnMaxRowsCount: number = 1, formatHeader: boolean = false): Promise<string[]> {
		await expect(this.rowTable.nth(0)).not.toBeEmpty();

		const rowCount = await this.getTableRowCount();
		if (rowCount === 0) return [];

		let allColumns = await this.getColumnHeaders();

		if (formatHeader) {
			allColumns = allColumns.map(col =>
				col.split(' ')
					.map(word => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase())
					.join(' '),
			);
		}

		const columnIndex = allColumns.findIndex(col => col === headerName);
		return await this.getColumnContent(columnIndex, notEmptyColumnMaxRowsCount);
	}

	public async clickRowContainingText(searchText: string): Promise<void> {
		await this._page.waitForTimeout(400);
		const rowCount = await this.rowTable.count();

		for (let i = 0; i < rowCount; i++) {
			const row = this.rowTable.nth(i);
			const rowText = await row.innerText();

			if (rowText.toLowerCase().includes(searchText.toLowerCase())) {
				await row.click();
				return;
			}
		}

		throw new Error(`No row found containing text: ${searchText}`);
	}
}