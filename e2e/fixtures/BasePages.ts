import { test as base, Browser, BrowserContext, Page, TestInfo } from '@playwright/test';
import * as path from 'path';
import { API } from '../api/API';
import { NavigationHelper } from '../page-objects/helpers/NavigationHelper';
import { TableHelper } from '../page-objects/helpers/TableHelper';
import { helpers } from '../page-objects/helpers/HelperMethods';
import { CommonPO } from '../page-objects/common/CommonPO';
import { LoginPO } from '../page-objects/login/LoginPO';
import { LogOutPO } from '../page-objects/login/LogOutPO';
import { DashboardPO } from '../page-objects/dashboard/DashboardPO';
import { ProfilePO } from '../page-objects/dashboard/ProfilePO';
import { PreferencesPO } from '../page-objects/dashboard/PreferencesPO';
import { SearchPO } from '../page-objects/dashboard/SearchPO';
import { UserManagementPO } from '../page-objects/association/UserManagmentPO';
import { UserFormPO } from '../page-objects/association/UserFormPO';
import { ViolationsPO } from '../page-objects/violations/ViolationsPO';
import { AddViolationPO } from '../page-objects/violations/AddViolationPO';
import { AssessmentsPO } from '../page-objects/violations/AssessmentsPO';
import { ListViolationsPO } from '../page-objects/violations/ListViolationsPO';
import { MoreOptionsPanelPO } from '../page-objects/violations/MoreOptionsPanelPO';
import { MorePO } from '../page-objects/violations/MorePO';
import { PrintPO } from '../page-objects/violations/PrintPO';
import { QueuedPO } from '../page-objects/violations/QueuedPO';
import { ViolationReportsPO } from '../page-objects/violations/ViolationReportsPO';
import { DashboardReportPO } from '../page-objects/violations/DashboardReportPO';

// Extend basic test fixtures
export type BaseFixtures = {
	attachVideos: void;
	context: BrowserContext;
	api: API;
	navigationHelper: NavigationHelper;
	tableHelper: TableHelper;
	helpers: helpers;
	commonPO: CommonPO;
	loginPO: LoginPO;
	logOutPO: LogOutPO;
	dashboardPO: DashboardPO;
	profilePO: ProfilePO;
	preferencesPO: PreferencesPO;
	searchPO: SearchPO;
	userManagementPO: UserManagementPO;
	userFormPO: UserFormPO;
	violationsPO: ViolationsPO;
	addViolationPO: AddViolationPO;
	assessmentsPO: AssessmentsPO;
	listViolationsPO: ListViolationsPO;
	moreOptionsPanelPO: MoreOptionsPanelPO;
	morePO: MorePO;
	printPO: PrintPO;
	queuedPO: QueuedPO;
	violationReportsPO: ViolationReportsPO;
	dashboardReportPO: DashboardReportPO;
};

export const baseTest = base.extend<BaseFixtures>({
	attachVideos: async ({}, use, testInfo: TestInfo) => {
		await use();

		if (testInfo.status === 'failed') {
			const videoDir = path.join(testInfo.outputPath(), 'videos');
			await testInfo.attach('video', {
				path: path.join(videoDir, `${testInfo.title}.webm`),
			});
		}
	},
	context: async ({ browser }, use) => {
		const context = await browser.newContext({
			recordVideo: {
				dir: 'test-results/videos/',
			},
		});
		await use(context);
		await context.close();
	},
	api: async ({}, use) => {
		await use(new API());
	},
	navigationHelper: async ({ page }, use) => {
		await use(new NavigationHelper(page));
	},
	tableHelper: async ({ page }, use) => {
		await use(new TableHelper(page));
	},
	helpers: async ({}, use) => {
		await use(new helpers());
	},
	commonPO: async ({ page }, use) => {
		await use(new CommonPO(page));
	},
	loginPO: async ({ page }, use) => {
		await use(new LoginPO(page));
	},
	logOutPO: async ({ page }, use) => {
		await use(new LogOutPO(page));
	},
	dashboardPO: async ({ page }, use) => {
		await use(new DashboardPO(page));
	},
	profilePO: async ({ page }, use) => {
		await use(new ProfilePO(page));
	},
	preferencesPO: async ({ page }, use) => {
		await use(new PreferencesPO(page));
	},
	searchPO: async ({ page }, use) => {
		await use(new SearchPO(page));
	},
	userManagementPO: async ({ page }, use) => {
		await use(new UserManagementPO(page));
	},
	userFormPO: async ({ page }, use) => {
		await use(new UserFormPO(page));
	},
	violationsPO: async ({ page }, use) => {
		await use(new ViolationsPO(page));
	},
	addViolationPO: async ({ page }, use) => {
		await use(new AddViolationPO(page));
	},
	assessmentsPO: async ({ page }, use) => {
		await use(new AssessmentsPO(page));
	},
	listViolationsPO: async ({ page }, use) => {
		await use(new ListViolationsPO(page));
	},
	moreOptionsPanelPO: async ({ page }, use) => {
		await use(new MoreOptionsPanelPO(page));
	},
	morePO: async ({ page }, use) => {
		await use(new MorePO(page));
	},
	printPO: async ({ page }, use) => {
		await use(new PrintPO(page));
	},
	queuedPO: async ({ page }, use) => {
		await use(new QueuedPO(page));
	},
	violationReportsPO: async ({ page }, use) => {
		await use(new ViolationReportsPO(page));
	},
	dashboardReportPO: async ({ page }, use) => {
		await use(new DashboardReportPO(page));
	},
});

// Helper functions for creating custom contexts and pages
export async function createCustomContext(browser: Browser, testInfo: TestInfo, options: any = {}): Promise<BrowserContext> {
	const videoDir = path.join(testInfo.outputPath(), 'videos');
	const context = await browser.newContext({
		...options,
		recordVideo: { dir: videoDir },
	});
	return context;
}

export async function createCustomPage(browser: Browser, testInfo: TestInfo, options: any = {}): Promise<Page> {
	const context = await createCustomContext(browser, testInfo, options);
	return await context.newPage();
}

// Export common test utilities
export const expect = baseTest.expect;
export const describe = baseTest.describe;
export const test = baseTest;
