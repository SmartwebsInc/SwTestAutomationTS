import { test, expect } from '../../fixtures/BasePages';

interface PageInfo {
    pageName: string;
    url: string;
    expectedText: string;
	menuPath: string[];
}

test.describe('Page Load', () => {
	test.use({ storageState: 'e2e/auth/sa-storage-state.json' });

	const availablePagesViolations: PageInfo[] = [
		{
			pageName: 'Dashboard',
			url: '#/violations/dashboard',
			expectedText: 'Violations Dashboard',
			menuPath: ['Violations', 'Dashboard'],
		},
		{
			pageName: 'Violation List',
			url: '#/violations/list',
			expectedText: 'Violations',
			menuPath: ['Violations', 'List'],
		},
		{
			pageName: 'Queued',
			url: '#/violations/queued',
			expectedText: 'Queued',
			menuPath: ['Violations', 'Queued'],
		},
		{
			pageName: 'Print',
			url: '#/violations/print',
			expectedText: 'Print',
			menuPath: ['Violations', 'Print'],
		},
		{
			pageName: 'Assessments',
			url: '#/violations/assessments',
			expectedText: 'Assessments',
			menuPath: ['Violations', 'Assessments'],
		},
		{
			pageName: 'Community Snapshot',
			url: '#/violations/reports/snapshot',
			expectedText: 'Community Snapshot',
			menuPath: ['Violations', 'Reports', 'Community Snapshot'],
		},
		{
			pageName: 'Dashboard Report',
			url: '#/violations/reports/dashboard',
			expectedText: 'How does the Dashboard report work?',
			menuPath: ['Violations', 'Reports', 'Dashboard'],
		},
		{
			pageName: 'Community Compliance Report',
			url: '#/violations/reports/custom/Default',
			expectedText: 'Community Compliance Report',
			menuPath: ['Violations', 'Reports', 'Compliance', 'Community Compliance'],
		},
		{
			pageName: 'Community Compliance Report (No fines or CC&Rs)',
			url: '#/violations/reports/custom/NoFineCCR',
			expectedText: 'Community Compliance (No fines or CC&Rs) Report',
			menuPath: ['Violations', 'Reports', 'Compliance', 'Community Compliance (No fines or CC&Rs)'],
		},
		{
			pageName: 'Community Compliance Single-Line Report',
			url: '#/violations/reports/custom/Single-Line',
			expectedText: 'Community Compliance Single-Line Report',
			menuPath: ['Violations', 'Reports', 'Compliance', 'Community Compliance Single-Line'],
		},
		{
			pageName: 'Compliance Picture Report',
			url: '#/violations/reports/custom/Picture',
			expectedText: 'Compliance Picture Report',
			menuPath: ['Violations', 'Reports', 'Compliance', 'Compliance Picture'],
		},
		{
			pageName: 'Compliance Sheet Report',
			url: '#/violations/reports/custom/Sheet',
			expectedText: 'Compliance Sheet Report',
			menuPath: ['Violations', 'Reports', 'Compliance', 'Compliance Sheet'],
		},
		{
			pageName: 'Violation Letter Statistics',
			url: '#/violations/reports/letters/letterstatistics',
			expectedText: 'Violation Letter Statistics Report',
			menuPath: ['Violations', 'Reports', 'Letters', 'Violation Letter Statistics'],
		},
		{
			pageName: 'Letter Activity (Completed and Pending)',
			url: '#/violations/reports/letters/letteractivity',
			expectedText: 'Letter Activity (Completed and Pending) Report',
			menuPath: ['Violations', 'Reports', 'Letters', 'Letter Activity (Completed and Pending)'],
		},
		{
			pageName: 'Violations Created/Updated',
			url: '#/violations/reports/activity/CreatedUpdated',
			expectedText: 'Violations Created/Updated Report',
			menuPath: ['Violations', 'Reports', 'Activity', 'Violations Created/Updated'],
		},
		{
			pageName: 'Reinspection Activities',
			url: '#/violations/reports/activity/Reinspection',
			expectedText: 'Reinspection Activities Report',
			menuPath: ['Violations', 'Reports', 'Activity', 'Reinspection Activities'],
		},
		{
			pageName: 'Violation Cited',
			url: '#/violations/reports/activity/Cited',
			expectedText: 'Violation Cited Report',
			menuPath: ['Violations', 'Reports', 'Activity', 'Violation Cited'],
		},
		{
			pageName: 'Violation Activity',
			url: '#/violations/reports/activity/Activity',
			expectedText: 'Violation Activity Report',
			menuPath: ['Violations', 'Reports', 'Activity', 'Violation Activity'],
		},
		{
			pageName: 'Violation Status',
			url: '#/violations/reports/activity/Status',
			expectedText: 'Violation Status Report',
			menuPath: ['Violations', 'Reports', 'Activity', 'Violation Status'],
		},
		{
			pageName: 'Association Options',
			url: '#/violations/options/ManageViol_Overview',
			expectedText: 'Send on violation creation',
			menuPath: ['Violations', 'More', 'Violation Options', 'Association Options'],
		},
		{
			pageName: 'Automailing Exclusions',
			url: '#/violations/options/automailingexclusions',
			expectedText: 'Automailing Exclusions',
			menuPath: ['Violations', 'More', 'Violation Options', 'Automailing Exclusions'],
		},
		{
			pageName: 'Policies',
			url: '#/violations/options/policies',
			expectedText: 'Open Policies',
			menuPath: ['Violations', 'More', 'Violation Options', 'Policies'],
		},
		{
			pageName: 'Letters',
			url: '#/violations/options/letters',
			expectedText: 'Violations letter templates',
			menuPath: ['Violations', 'More', 'Violation Options', 'Letters'],
		},
		{
			pageName: 'Multi-Violation policy',
			url: '#/violations/options/ManageMultiViolLetter',
			expectedText: 'Letter Name',
			menuPath: ['Violations', 'More', 'Violation Options', 'Multi-Violation Policy'],
		},
		{
			pageName: 'Statuses',
			url: '#/violations/options/statuslist',
			expectedText: 'Statuses New Status',
			menuPath: ['Violations', 'More', 'Violation Options', 'Statuses'],
		},
		{
			pageName: 'CCRs',
			url: '#/manage/association_details/ccrs',
			expectedText: 'New category',
			menuPath: ['Violations', 'More', 'CC&Rs'],
		},
		{
			pageName: 'Config Overview',
			url: '#/violations/config_overview',
			expectedText: 'Critical info missing:',
			menuPath: ['Violations', 'More', 'Config Overview'],
		},
	];
	test('Check pages loaded', async ({ page, helpers, navigationHelper, morePO, commonPO }) => {
		try {
			await Promise.all([
				page.goto('/'),
				page.waitForResponse(resp => resp.url().includes('token') && resp.status() == 200),
			]);
			await navigationHelper.selectAssociationDropdown('HUTTO');

			await helpers.softStepsForPages(availablePagesViolations, async (webPage) => {
				await navigationHelper.leftMenuNavigation(...webPage.menuPath);

				await expect(page).toHaveURL(webPage.url);

				await (webPage.pageName === 'Association Options'
					? expect(page.locator('#legacy-iframe').contentFrame().getByText('Violation email option')).toBeVisible()
					: webPage.pageName === 'Multi-Violation policy'
						? expect(page.locator('#legacy-iframe').contentFrame().locator('#UltraWebTab1__ctl7_PolicyList_UltraWebTab1__ctl3_frmMultiViolLtrs').contentFrame().locator('#SpnMultViolLtrSaveNew')).toBeVisible()
						: webPage.pageName === 'Config Overview'
							? expect(page.locator('#legacy-iframe').contentFrame().getByText('Critical info missing:')).toBeVisible()
							: Promise.resolve());

				await commonPO.checkTextOnPageOrIframe(webPage.expectedText);

				if (webPage.pageName === 'Policies') {
					await morePO.closedPoliciesTab.click();
					await expect(page.getByText('Alternate Address')).toBeVisible();
				}

				if (webPage.pageName === 'Letters') {
					await morePO.multiViolationsTab.click();
					await commonPO.checkTextOnPageOrIframe('MultiViolation letter templates');
					await morePO.closedViolationsTab.click();
					await commonPO.checkTextOnPageOrIframe('Closed Violations letter templates');
				}
			});
		} finally {
			await page.context().close();
		}
	});
});