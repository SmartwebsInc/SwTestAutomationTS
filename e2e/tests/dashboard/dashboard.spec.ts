import { test, expect } from '@playwright/test';
import { LoginPO } from '../../page-objects/login/LoginPO';
import { DashboardPO } from '../../page-objects/dashboard/DashboardPO';
import { ProfilePO } from '../../page-objects/dashboard/ProfilePO';
import { PreferencesPO } from '../../page-objects/dashboard/PreferencesPO';
import { CommonPO } from '../../page-objects/common/CommonPO';
import { SearchPO } from '../../page-objects/dashboard/SearchPO';
import { BaseFixtures } from '../../fixtures/BasePages';

test.describe('Dashboard Tests', () => {
	let loginPage: LoginPO;
	let dashboardPage: DashboardPO;
	let profilePage: ProfilePO;
	let preferencesPage: PreferencesPO;
	let common: CommonPO;
	let searchPage: SearchPO;

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPO(page);
		dashboardPage = new DashboardPO(page);
		profilePage = new ProfilePO(page);
		preferencesPage = new PreferencesPO(page);
		common = new CommonPO(page);
		searchPage = new SearchPO(page);

		await page.goto('');
		await loginPage.login(process.env.ACC_SUPER_ADMIN_USERNAME!, process.env.SUPER_ADMIN_PASSWORD!);
	});

	test('Should verify all blocks of Dashboard are loaded', async ({ page }) => {
		// Verify main dashboard blocks
		await dashboardPage.verifyDashboardElements();

		// Navigate to Associations Dashboard
		await dashboardPage.navigateToAssociationsDashboard();
		await expect(page).toHaveURL(/manage\/units\/dashboard/);
		await expect(common.headerPage).toContainText('Associations Dashboard');

		await dashboardPage.navigateToMainMenu();

		// Navigate to Messages Dashboard
		await dashboardPage.navigateToMessagesDashboard();
		await expect(page).toHaveURL(/manage\/units\/messaging/);
		await expect(common.headerPage).toContainText('New Messages');

		await dashboardPage.navigateToMainMenu();

		// Navigate to Accounting Dashboard
		await dashboardPage.navigateToAccountingDashboard();
		await expect(page).toHaveURL(/smartAccounts\/dashboard/);
		await expect(common.headerPage).toContainText('Accounting Dashboard');

		await dashboardPage.navigateToMainMenu();

		// Navigate to Violations Dashboard
		await dashboardPage.navigateToViolationsDashboard();
		await expect(page).toHaveURL(/violations\/dashboard/);
		await expect(common.headerPage).toContainText('Violations Dashboard');

		await dashboardPage.navigateToMainMenu();

		// Navigate to Architectural Dashboard
		await dashboardPage.navigateToArcDashboard();
		await expect(page).toHaveURL(/arc\/dashboard\/activity/);
		await expect(common.headerPage).toContainText('Arc Dashboard: Activity');

		await dashboardPage.navigateToMainMenu();

		// Navigate to Work Orders Dashboard
		await dashboardPage.navigateToWorkOrdersDashboard();
		await expect(page).toHaveURL(/workorders\/dashboard/);
		await expect(common.headerPage).toContainText('Work Orders Dashboard');
	});

	test('Should find any owner/unit via Search icon in header', async () => {
		// Perform Quick Search
		await searchPage.performQuickSearch('Cypress Automation (DO NOT USE)', 'Lennon');

		// Perform Advanced Search
		await searchPage.performAdvancedSearch('Cypress Automation (DO NOT USE)', 'Cheshire', 'wonderland', 'wonderland', '4Z4KB4');
	});

	test('Should go to My Profile page and change role of user', async ({ page }) => {
		await profilePage.goToProfile();

		await profilePage.changeUserRole('Administrator');

		await page.reload();

		await profilePage.verifyUserRole('Administrator');

		await profilePage.changeUserRole('ACC Super Admin');

		await profilePage.verifyUserRole('ACC Super Admin');
	});

	test('Should go to My Preferences page and change settings for any module', async () => {
		await preferencesPage.goToPreferences();

		await preferencesPage.changeArcReviewSettings('Project Name', '10');

		await preferencesPage.verifyArcReviewSettings('Project Name', '10');

		await preferencesPage.changeArcReviewSettings('Owner Name', '25');

		await preferencesPage.verifyArcReviewSettings('Owner Name', '25');
	});
});
