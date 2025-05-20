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
	test('Check Violation pages loaded', async ({ page, helpers, navigationHelper, morePO, commonPO }) => {
		try {
			await Promise.all([page.goto('/'), page.waitForResponse((resp) => resp.url().includes('token') && resp.status() == 200)]);
			await navigationHelper.selectAssociationDropdown('HUTTO');

			await helpers.softStepsForPages(availablePagesViolations, async (webPage) => {
				await navigationHelper.leftMenuNavigation(...webPage.menuPath);

				await expect(page).toHaveURL(webPage.url);

				const legacyFrame = await page.locator('#legacy-iframe').contentFrame();

				switch (webPage.pageName) {
					case 'Association Options':
						await expect(legacyFrame.getByText('Violation email option')).toBeVisible();
						break;

					case 'Multi-Violation policy': {
						const innerFrame = await legacyFrame.locator('#UltraWebTab1__ctl7_PolicyList_UltraWebTab1__ctl3_frmMultiViolLtrs').contentFrame();

						await expect(innerFrame.locator('#SpnMultViolLtrSaveNew')).toBeVisible();
						break;
					}

					case 'Config Overview':
						await expect(legacyFrame.getByText('Critical info missing:')).toBeVisible();
						break;

					default:
						// No validation needed
						break;
				}

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

	const availableWorkOrderPages: PageInfo[] = [
		{
			pageName: 'Dashboard',
			url: '#/workorders/dashboard',
			expectedText: 'Work Orders Dashboard',
			menuPath: ['WorkOrders', 'Dashboard'],
		},
		{
			pageName: 'Open Work Orders',
			url: '#/workorders/list',
			expectedText: 'Work Orders: Open WOs',
			menuPath: ['WorkOrders', 'Open WOs'],
		},
		{
			pageName: 'Vendor',
			url: '#/workorders/list',
			expectedText: 'Work Orders: Vendor',
			menuPath: ['WorkOrders', 'Vendor'],
		},
		{
			pageName: 'Board View',
			url: '#/workorders/list',
			expectedText: 'Work Orders: Board View',
			menuPath: ['WorkOrders', 'Board View'],
		},
		{
			pageName: 'Closed WOs',
			url: '#/workorders/list',
			expectedText: 'Work Orders: Closed WOs',
			menuPath: ['WorkOrders', 'Closed WOs'],
		},
		{
			pageName: 'All Work Orders',
			url: '#/workorders/list',
			expectedText: 'Work Orders: All Work Orders',
			menuPath: ['WorkOrders', 'All Work Orders'],
		},
		{
			pageName: 'Open',
			url: '#/workorders/list',
			expectedText: 'Work Orders: Open',
			menuPath: ['WorkOrders', 'Open'],
		},
		{
			pageName: 'Vendor Management',
			url: '#/workorders/vendor_management',
			expectedText: 'Vendor Management',
			menuPath: ['WorkOrders', 'Vendor Management'],
		},
		{
			pageName: 'Workorder Detail Report',
			url: '#/workorders/reports/detail_report',
			expectedText: 'Workorder Detail Report',
			menuPath: ['WorkOrders', 'Reports', 'Work Orders Detail'],
		},
		{
			pageName: 'Work Order Picture Report',
			url: '#/workorders/reports/picture_report',
			expectedText: 'Work Order Picture Report',
			menuPath: ['WorkOrders', 'Reports', 'Work Orders Picture'],
		},
		{
			pageName: 'Work Order Statistics Report',
			url: '#/workorders/reports/statistics',
			expectedText: 'Work Order Statistics Report',
			menuPath: ['WorkOrders', 'Reports', 'Work Orders Statistics'],
		},
		{
			pageName: 'Workflow Templates',
			url: '#/workorders/more/workflow/templates/wo',
			expectedText: 'Workflow Templates',
			menuPath: ['WorkOrders', 'More', 'Workflow', 'Email, Voice, Text Templates'],
		},
		{
			pageName: 'Workflow Rules',
			url: '#/workorders/more/workflow/rules/wo',
			expectedText: 'Workflow Rules',
			menuPath: ['WorkOrders', 'More', 'Workflow', 'Rules'],
		},
		{
			pageName: 'Workflow Triggers',
			url: '#/workorders/more/workflow/triggers/wo',
			expectedText: 'Workflow Triggers',
			menuPath: ['WorkOrders', 'More', 'Workflow', 'Triggers'],
		},
		{
			pageName: 'Categories',
			url: '#/workorders/more/management_settings/categories',
			expectedText: 'Categories',
			menuPath: ['WorkOrders', 'More', 'Management Settings', 'Categories'],
		},
		{
			pageName: 'Subcategories',
			url: '#/workorders/more/management_settings/sub_categories',
			expectedText: 'Subcategories',
			menuPath: ['WorkOrders', 'More', 'Management Settings', 'Subcategories'],
		},
		{
			pageName: 'Priorities',
			url: '#/workorders/more/management_settings/enums/priorities',
			expectedText: 'Priorities',
			menuPath: ['WorkOrders', 'More', 'Management Settings', 'Priorities'],
		},
		{
			pageName: 'Statuses',
			url: '#/workorders/more/management_settings/enums/statuses',
			expectedText: 'Statuses',
			menuPath: ['WorkOrders', 'More', 'Management Settings', 'Statuses'],
		},
		{
			pageName: 'Due Date',
			url: '#/workorders/more/management_settings/due_date',
			expectedText: 'Default Due Date',
			menuPath: ['WorkOrders', 'More', 'Management Settings', 'Due Date'],
		},
		{
			pageName: 'Reported By',
			url: '#/workorders/more/management_settings/enums/reported_by',
			expectedText: 'Reported By Options',
			menuPath: ['WorkOrders', 'More', 'Management Settings', 'Reported By'],
		},
		{
			pageName: 'Filtered Views',
			url: '#/workorders/more/management_settings/filtered_views',
			expectedText: 'Filtered Views',
			menuPath: ['WorkOrders', 'More', 'Management Settings', 'Filtered Views'],
		},
		{
			pageName: 'Amenity Types',
			url: '#/workorders/more/management_settings/amenity_types',
			expectedText: 'Amenity Types',
			menuPath: ['WorkOrders', 'More', 'Management Settings', 'Amenity Type'],
		},
		{
			pageName: 'Amenity Setup',
			url: '#/workorders/more/association_settings/amenities',
			expectedText: 'Amenities',
			menuPath: ['WorkOrders', 'More', 'Association Settings', 'Amenity Setup'],
		},
	];

	test('Check Workorders pages loaded', async ({ page, helpers, navigationHelper, commonPO }) => {
		page.setDefaultTimeout(60000);
		try {
			await Promise.all([page.goto('/'), page.waitForResponse((resp) => resp.url().includes('token') && resp.status() == 200)]);
			await navigationHelper.selectAssociationDropdown('HUTTO');

			await helpers.softStepsForPages(availableWorkOrderPages, async (webPage) => {
				await navigationHelper.leftMenuNavigation(...webPage.menuPath);

				await commonPO.checkTextOnPageOrIframe(webPage.expectedText);
				expect(page.url()).toContain(webPage.url);
			});
		} finally {
			await page.context().close();
		}
	});

	const availableArcPages: PageInfo[] = [
		{
			pageName: 'Arc Dashboard: Activity',
			url: '#/arc/dashboard/activity',
			expectedText: 'Arc Dashboard: Activity',
			menuPath: ['Arc', 'Dashboard', 'Activity'],
		},
		{
			pageName: 'Arc Dashboard: Config',
			url: '#/arc/dashboard/configuration',
			expectedText: 'Arc Dashboard: Config',
			menuPath: ['Arc', 'Dashboard', 'Configurations'],
		},
		{
			pageName: 'Projects: Staged',
			url: '#/arc/projects/list/staged',
			expectedText: 'Projects: Staged',
			menuPath: ['Arc', 'Staged'],
		},
		{
			pageName: 'Projects: Review',
			url: '#/arc/projects/list/current',
			expectedText: 'Projects: Review',
			menuPath: ['Arc', 'Review'],
		},
		{
			pageName: 'Projects: Pending Build Completion',
			url: '#/arc/projects/list/pending',
			expectedText: 'Projects: Pending Build Completion',
			menuPath: ['Arc', 'Build'],
		},
		{
			pageName: 'Projects: Completed',
			url: '#/arc/projects/list/completed',
			expectedText: 'Projects: Completed',
			menuPath: ['Arc', 'Completed'],
		},
		{
			pageName: 'Projects: Declined / Withdrawn',
			url: '#/arc/projects/list/declined',
			expectedText: 'Projects: Declined / Withdrawn',
			menuPath: ['Arc', 'Declined / Withdrawn'],
		},
		{
			pageName: 'Projects: Declined / Withdrawn',
			url: '#/arc/projects/list/declined',
			expectedText: 'Projects: Declined / Withdrawn',
			menuPath: ['Arc', 'Declined / Withdrawn'],
		},
		{
			pageName: 'Projects: Advanced Search',
			url: '#/arc/projects/list/search',
			expectedText: 'Projects: Advanced Search',
			menuPath: ['Arc', 'Search'],
		},
		{
			pageName: 'Community Arc Summary',
			url: '#/arc/reports/summary',
			expectedText: 'Association List:',
			menuPath: ['Arc', 'Reports', 'Community Arc Summary'],
		},
		{
			pageName: 'Community Arc Detail',
			url: '#/arc/reports/detail',
			expectedText: 'Association List:',
			menuPath: ['Arc', 'Reports', 'Community Arc Detail'],
		},
		{
			pageName: 'Uploaded Projects Report',
			url: '#/arc/reports/uploaded',
			expectedText: 'Report Type:',
			menuPath: ['Arc', 'Reports', 'Uploaded Projects'],
		},
		{
			pageName: 'Pending Projects Report',
			url: '#/arc/reports/pending',
			expectedText: 'Report Type:',
			menuPath: ['Arc', 'Reports', 'Pending Projects'],
		},
		{
			pageName: 'Completed Projects Report',
			url: '#/arc/reports/completed',
			expectedText: 'Report Type:',
			menuPath: ['Arc', 'Reports', 'Completed Projects'],
		},
		{
			pageName: 'Modification Report',
			url: '#/arc/reports/modification',
			expectedText: 'Architectural Modification Report',
			menuPath: ['Arc', 'Reports', 'Modification Report'],
		},
	];

	test('Check Arc pages loaded', async ({ page, helpers, navigationHelper, commonPO }) => {
		page.setDefaultTimeout(60000);
		try {
			await Promise.all([page.goto('/'), page.waitForResponse((resp) => resp.url().includes('token') && resp.status() == 200)]);
			await navigationHelper.selectAssociationDropdown('HUTTO');

			await helpers.softStepsForPages(availableArcPages, async (webPage) => {
				await navigationHelper.leftMenuNavigation(...webPage.menuPath);

				if (webPage.pageName === 'Arc Dashboard: Config') {
					await expect(page.locator('h1')).toBeVisible();
				}
				await commonPO.checkTextOnPageOrIframe(webPage.expectedText);
				expect(page.url()).toContain(webPage.url);
			});
		} finally {
			await page.context().close();
		}
	});
});
