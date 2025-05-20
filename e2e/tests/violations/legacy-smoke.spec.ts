import { test, expect } from '@playwright/test';
import { ViolationsPO } from '../../page-objects/violations/ViolationsPO';
import { LoginPO } from '../../page-objects/login/LoginPO';
import { NavigationHelper } from '../../page-objects/helpers/NavigationHelper';

test.describe('Legacy Smoke Tests', () => {
	let violationsPO: ViolationsPO;
	let loginPO: LoginPO;
	let navigationHelper: NavigationHelper;

	test.beforeEach(async ({ page }) => {
		loginPO = new LoginPO(page);
		navigationHelper = new NavigationHelper(page);
		violationsPO = new ViolationsPO(page);

		await page.goto('');
		await loginPO.login();
		await navigationHelper.selectDefaultAssociation();
	});

	// Commented tests converted but kept commented as per request

	/* test('should create single violation and send it', async ({ page }) => {
        await page.locator('.sw-btn-wrp.sw-btn-large.sw-lightgreen-color', { hasText: 'New' }).click();

        await expect(page.locator('.modal-content', { hasText: 'Find Owner/Unit' })).toBeVisible();
        await page.locator("input[ng-model='$ctrl.ownerFilter.name.value']").fill('John');
        await page.waitForTimeout(2000);
        await page.locator("div[role='gridcell']", { hasText: 'John' }).click();

        await expect(page.locator('cat-sub-cat-modal', { hasText: 'Select Category/Subcategory' })).toBeVisible();
        await page.locator('.category-item', { hasText: 'Cypress' }).click();
        await page.locator('.category-item', { hasText: 'New Test' }).click();
        await page.locator('.btn.btn-primary.category-ok-btn', { hasText: 'Ok' }).click();

        await expect(page.locator('add-violation-drawer')).toBeVisible();
        await page.locator('.sw-btn-wrp.sw-btn-small.sw-send-color.sw-icon-only', { hasText: 'Send' }).click();

        await expect(page.locator('text=Success')).toBeVisible();
        await page.waitForTimeout(3000);

        //await page.locator("select[ng-model='$ctrl.filter.selectedSearchString']").selectOption({ label: 'Owner Name (First or Last)' });
        await page.locator("input[ng-model='$ctrl.filter.selectedSearchString.value']").fill('John Lennon');
        await page.locator("button[type='submit']").click();

        await expect(page.locator('.flexbox.unit-list-view-header-inner', { hasText: 'John Lennon' })).toBeVisible();
        await page.locator('.flexbox.unit-list-view-header-inner', { hasText: 'John Lennon' }).click();
        await expect(page.locator('.violation')).toContainText('Cypress: New Test');
    }); */

	/* test('should put violation on hold and off hold', async ({ page }) => {
        //await page.locator("select[ng-model='$ctrl.filter.selectedSearchString']").selectOption({ label: 'Owner Name (First or Last)' });
        await page.locator("input[ng-model='$ctrl.filter.selectedSearchString.value']").fill('John Lennon');
        await page.locator("button[type='submit']").click();

        await expect(page.locator('.flexbox.unit-list-view-header-inner', { hasText: 'John Lennon' })).toBeVisible();
        await page.locator('.flexbox.unit-list-view-header-inner', { hasText: 'John Lennon' }).click();

        await expect(page.locator('.violation')).toContainText('Cypress: New Test');

        await page.locator('div.sw-btn-wrp.sw-btn-small.sw-options-color', { hasText: 'Options' }).click();
        await page.locator('li', { hasText: 'On/Off Hold' }).click();
        await page.locator('button.btn.btn-primary', { hasText: 'Put violation on Hold' }).click();
        await page.waitForTimeout(3000);

        await expect(page.locator('.violation', { hasText: 'Cypress: New Test' })).toBeVisible();
        await expect(page.locator('.violation')).toContainText('On hold');

        // Off Hold
        await page.locator('div.sw-btn-wrp.sw-btn-small.sw-options-color', { hasText: 'Options' }).click();
        await page.locator('li', { hasText: 'On/Off Hold' }).click();
        await page.locator("button[ng-show='$ctrl.violation.OnHold']", { hasText: 'Take violation off Hold' }).click();
        await page.waitForTimeout(3000);

        const testRow = page.locator('.violation', { hasText: 'Cypress: New Test' });
        await expect(testRow).toBeVisible();
        await expect(testRow).not.toContainText('On hold');
    }); */

	/* test('should update cure of existing violation', async ({ page }) => {
        await page.fill("input[ng-model='$ctrl.filter.selectedSearchString.value']", "John Lennon");
        await page.click("button[type='submit']");

        await expect(page.locator('.flexbox.unit-list-view-header-inner').filter({ hasText: 'John Lennon' })).toBeVisible();
        await page.locator('.flexbox.unit-list-view-header-inner').filter({ hasText: 'John Lennon' }).click();

        await expect(page.locator('.violation')).toContainText('Cypress: New Test');

        await page.locator('div.sw-btn-wrp.sw-btn-small.sw-options-color').filter({ hasText: 'Options' }).click();
        await page.locator('li').filter({ hasText: 'Update Cure' }).click();
        await page.fill("input[ng-change='$ctrl.cureChanged()']", "20");
        await page.locator("button[ng-click='$ctrl.saveCureRemaining()']").click();
        await page.waitForTimeout(2000);

        await expect(page.locator('.violation')).toContainText('Cypress: New Test');
        await expect(page.locator('div.third-column')).toContainText('Cure remaining updated to 20');
    }); */

	/* test('should upload document to existing violation', async ({ page }) => {
        await page.locator("select[ng-model='$ctrl.filter.selectedSearchString']").selectOption('Owner Name (First or Last)');
        await page.fill("input[ng-model='$ctrl.filter.selectedSearchString.value']", "John Lennon");
        await page.click("button[type='submit']");

        await page.locator('.flexbox.unit-list-view-header-inner').filter({ hasText: 'John Lennon' }).click();
        await expect(page.locator('.violation')).toContainText('Cypress: New Test');

        await page.locator('div.sw-btn-wrp.sw-btn-small.sw-options-color').filter({ hasText: 'Options' }).click();
        await page.locator('li').filter({ hasText: 'Upload a document' }).click();

        await page.setInputFiles("input[type='file']", "img.png");
        await expect(page.locator('.file-list')).toContainText('img.png');

        await page.locator("button[ng-click='$ctrl.uploadFiles()']").click();
        await page.waitForTimeout(3000);

        await expect(page.locator('.violation').filter({ hasText: 'Cypress: New Test' })).toBeVisible();
        await expect(page.locator('div.third-column')).toContainText('img.png');
    }); */

	/* test('should close existing violation', async ({ page }) => {
        await page.locator("select[ng-model='$ctrl.filter.selectedSearchString']").selectOption('Owner Name (First or Last)');
        await page.fill("input[ng-model='$ctrl.filter.selectedSearchString.value']", "John Lennon");
        await page.click("button[type='submit']");

        await page.locator('.flexbox.unit-list-view-header-inner').filter({ hasText: 'John Lennon' }).click();
        await expect(page.locator('.violation')).toContainText('Cypress: New Test');

        await page.locator('.sw-btn-wrp.sw-btn-small.sw-close-color').filter({ hasText: 'Close' }).click();
        await expect(page.locator('.closed-letter-confirmation')).toBeVisible();
        await page.locator('.btn.btn-warning.confirmation-button').filter({ hasText: 'Yes' }).click();

        await expect(page.locator('.violation')).toContainText('Cypress: New Test');
        await expect(page.locator('div.third-column')).toContainText('Violation was closed.');
    }); */

	/* test('should delete stage or violation', async ({ page }) => {
        const deleteViolation = async (ownerName: string) => {
            await page.locator("select[ng-model='$ctrl.filter.selectedSearchString']").selectOption('Owner Name (First or Last)');
            await page.fill("input[ng-model='$ctrl.filter.selectedSearchString.value']", ownerName);
            await page.click("button[type='submit']");

            await page.locator('.flexbox.unit-list-view-header-inner').filter({ hasText: ownerName }).click();
            await expect(page.locator('.violation')).toContainText('Cypress');

            await page.locator('div.sw-btn-wrp.sw-btn-small.sw-options-color').filter({ hasText: 'Options' }).click();
            await page.locator('li').filter({ hasText: 'Delete this stage or violation' }).click();
            await page.locator("button[ng-click='$ctrl.deleteViolation()']").click();
        };

        await deleteViolation('John Lennon');

        await page.locator("select[ng-model='$ctrl.filter.selectedSearchString']").selectOption('Owner Name (First or Last)');
        await page.fill("input[ng-model='$ctrl.filter.selectedSearchString.value']", 'John Lennon');
        await page.click("button[type='submit']");
        await expect(page.locator('.flexbox.unit-list-view-header-inner').filter({ hasText: 'John Lennon' })).not.toBeVisible();

        await deleteViolation('Margot');
        await page.waitForTimeout(3000);
        await page.reload();

        await page.locator("select[ng-model='$ctrl.filter.selectedSearchString']").selectOption('Owner Name (First or Last)');
        await page.fill("input[ng-model='$ctrl.filter.selectedSearchString.value']", 'Margot');
        await page.click("button[type='submit']");
        await page.waitForTimeout(2000);

        await expect(page.locator('#violations-view')).not.toContainText('Margot Tester');
    }); */

	/* test('Config overview page loads', async ({ page }) => {
        //await violationsLeftMenu.GoToConfigOverviewAsync();
        expect(page.url()).toContain('violations/config_overview');

        await page.frameLocator('#legacy-iframe').locator('.new-look-card.administrator-container').waitFor();
        await page.frameLocator('#legacy-iframe').locator('.management-tips').waitFor();
        await page.frameLocator('#legacy-iframe').locator('.content').waitFor();
    }); */

	/* test('CCRs page loads', async ({ page }) => {
        //await violationsLeftMenu.GoToCCRSAsync();
        expect(page.url()).toContain('manage/association_details/ccrs');

        await expect(page.locator('.sw-main-content-wrp')).toBeVisible();
        await expect(page.locator('.sw-page-header-wrp', { hasText: 'CCRs' })).toBeVisible();
        await expect(page.locator('.form-inline.assoc-violation-duration')).toBeVisible();
        await expect(page.locator("input[placeholder='Type here to filter...']")).toBeVisible();
        await expect(page.locator('.sw-btn-wrp.sw-btn-large.sw-lightgreen-color', { hasText: 'New' })).toBeVisible();
        await expect(page.locator('.sw-btn-wrp.sw-btn-large.sw-blue-color', { hasText: 'Show Inactive' })).toBeVisible();
        await expect(page.locator('#viol_accordion')).toBeVisible();
    }); */

	/* test('click each link in Violation Options and verify pages', async ({ page }) => {
        // Association Options
        await page.click("a[href*='ManageViol_Overview']");
        await expect(page).toHaveURL(/violations\/options\/ManageViol_Overview/);
        await page.waitForTimeout(2000);
        await expect(page.frameLocator('#legacy-iframe').locator('.content')).toBeVisible();

        // Automailing Exclusions
        await page.click("a[href*='automailingexclusions']");
        await expect(page).toHaveURL(/violations\/options\/automailingexclusions/);
        await page.waitForTimeout(2000);
        await expect(page.locator('.sw-page-header', { hasText: 'Automailing Exclusions' })).toBeVisible();
        await expect(page.locator('#violations-view')).toBeVisible();

        // Policies
        await page.click("a[href*='options/policies']");
        await expect(page).toHaveURL(/violations\/options\/policies/);
        await page.waitForTimeout(2000);
        await expect(page.locator('#violations-view')).toBeVisible();
        await expect(page.locator('text=Open Policies')).toBeVisible();
        await expect(page.locator('text=Closed Policies')).toBeVisible();
        await expect(page.frameLocator('.open-legacy-iframe').locator('.content')).toBeVisible();
        await expect(page.frameLocator('.open-legacy-iframe').locator('#UltraWebTab1__ctl7_PolicyList_UltraWebTab1__ctl1_dpdnAssociationList')).toBeVisible();
        await expect(page.frameLocator('.open-legacy-iframe').locator('#UltraWebTab1__ctl7_PolicyList_UltraWebTab1__ctl1_gridPolicies')).toBeVisible();

        // Letters
        await page.click("a[href*='options/letters']");
        await expect(page).toHaveURL(/violations\/options\/letters/);
        await page.waitForTimeout(2000);
        await expect(page.locator('#violations-view')).toBeVisible();
        await page.locator('.nav-link', { hasText: 'Single Violations' }).click();
        await expect(page.locator('text=Violations letter templates')).toBeVisible();

        // Multi Violations tab
        await page.locator('.nav-link', { hasText: 'Multi-violations' }).click();
        await expect(page.locator('text=MultiViolation letter templates')).toBeVisible();

        // Closed Violations tab
        await page.locator('.nav-link', { hasText: 'Closed-violations' }).click();
        await expect(page.locator('text=Closed Violations letter templates')).toBeVisible();

        // Multi-Violation Policy
        await page.click("a[href*='ManageMultiViolLetter']");
        await expect(page).toHaveURL(/violations\/options\/ManageMultiViolLetter/);
        await page.waitForTimeout(7000);
        await expect(page.frameLocator('#legacy-iframe').locator('.content')).toBeVisible();

        // Statuses
        await page.click("a[href*='statuslist']");
        await expect(page).toHaveURL(/violations\/options\/statuslist/);
        await page.waitForTimeout(2000);
        await expect(page.locator('h3', { hasText: 'Statuses' })).toBeVisible();
        await expect(page.locator('button.btn.btn-primary', { hasText: 'New Status' })).toBeVisible();
        await expect(page.locator("input[ng-model='$ctrl.filterText']")).toBeVisible();
        await expect(page.locator('.status-list.list-group')).toBeVisible();
    }); */

	/* test('change email option settings and verify changes are saved', async ({ page }) => {
        // Go to options and change setting
        await page.click("a[href*='ManageViol_Overview']");
        await page.waitForTimeout(2000);
        await page.frameLocator('#legacy-iframe').locator('#UltraWebTab1__ctl7_PolicyList_UltraWebTab1__ctl5_rdbSendPrinting').click();
        await page.frameLocator('#legacy-iframe').locator('#UltraWebTab1__ctl7_PolicyList_UltraWebTab1__ctl5_btnSaveActivation').click();
        await page.waitForTimeout(5000);
        await page.reload();

        // Create test violation
        await page.click("div[ng-click='$ctrl.addNewViolation()']:has-text('New')");
        await expect(page.locator('.modal-content')).toBeVisible();
        await page.fill("input[ng-model='$ctrl.ownerFilter.name.value']", 'John');
        await page.locator("div[role='gridcell']:has-text('John')").click();
        await page.locator(".category-item:has-text('Cypress')").click();
        await page.locator(".category-item:has-text('Automation Test')").click();
        await page.locator(".btn.btn-primary.category-ok-btn:has-text('Ok')").click();
        await expect(page.locator('add-violation-drawer')).toBeVisible();
        await page.waitForTimeout(2000);
        await page.locator(".sw-btn-wrp.sw-btn-small.sw-send-color.sw-icon-only:has-text('Send')").click();
        await page.waitForTimeout(1000);
        await expect(page.locator('text=No email sent due to current')).toBeVisible();

        // Delete the violation
        await page.locator(".flexbox.unit-list-view-header-inner:has-text('John Lennon')").click();
        await expect(page.locator(".violation:has-text('Cypress: Automation Test')")).toBeVisible();
        await page.locator("div.sw-btn-wrp.sw-btn-small.sw-options-color:has-text('Options')").click();
        await page.locator("li:has-text('Delete this stage or violation')").click();
        await page.locator("button[ng-click='$ctrl.deleteViolation()']:has-text('Delete')").click();
        await page.waitForTimeout(2000);
        await page.reload();
        await page.selectOption("select[ng-model='$ctrl.filter.selectedSearchString']", 'Owner Name (First or Last)');
        await page.fill("input[ng-model='$ctrl.filter.selectedSearchString.value']", 'John Lennon');
        await page.click("button[type='submit']");
        await expect(page.locator('#violations-view')).not.toContainText('John Lennon');

        // Reset email config to default
        await page.click("a[href*='ManageViol_Overview']");
        await page.waitForTimeout(2000);
        await page.frameLocator('#legacy-iframe').locator('#UltraWebTab1__ctl7_PolicyList_UltraWebTab1__ctl5_rdbSendCreation').click();
        await page.frameLocator('#legacy-iframe').locator('#UltraWebTab1__ctl7_PolicyList_UltraWebTab1__ctl5_btnSaveActivation').click();
        await page.waitForTimeout(5000);
    }); */

	/* test('change any Policy (update cure and/or fine)', async ({ page }) => {
        // Navigate to Policies
        await page.click("a[href*='options/policies']");
        await page.waitForTimeout(2000);

        // Open iframe and edit policy
        const frame = page.frameLocator('.open-legacy-iframe');
        await frame.locator('#UltraWebTab1__ctl7_PolicyList_UltraWebTab1__ctl1_gridPolicies_ctl03_lnkEdit').click();
        await page.waitForTimeout(3000);
        await frame.locator('#UltraWebTab1__ctl7_PolicyList_UltraWebTab1__ctl1_gridPolicies_ctl03_txtCure').fill('30');
        await frame.locator('#UltraWebTab1__ctl7_PolicyList_UltraWebTab1__ctl1_gridPolicies_ctl03_lnkSave').click();
        await page.waitForTimeout(5000);

        // Navigate to violations list
        await page.click("a[href*='violations/list']");
        await page.waitForTimeout(2000);

        // Create new violation
        await page.locator("div[ng-click='$ctrl.addNewViolation()']:has-text('New')").click();
        await expect(page.locator('.modal-content')).toBeVisible();
        await page.locator("input[ng-model='$ctrl.ownerFilter.name.value']").fill('John');
        await page.locator("div[role='gridcell']:has-text('John')").click();
        await page.locator(".category-item:has-text('Cypress')").click();
        await page.locator(".category-item:has-text('Automation Test')").click();
        await page.locator(".btn.btn-primary.category-ok-btn:has-text('Ok')").click();
        await expect(page.locator('add-violation-drawer')).toBeVisible();
        await page.waitForTimeout(2000);

        // Verify cure is updated to 30
        await expect(page.locator("input[ng-model='$ctrl.selectedStage.Cure']")).toHaveValue('30');

        // Cancel the violation
        await page.locator('div.cursor-pointer').nth(1).click();
        await expect(page.locator('.modal-content')).toBeVisible();
        await page.locator("button.btn.btn-default.btn-warning:has-text('Yes')").click();
        await page.waitForTimeout(2000);

        // Disable the policy again
        await page.click("a[href*='options/policies']");
        await page.waitForTimeout(2000);
        await frame.locator('#UltraWebTab1__ctl7_PolicyList_UltraWebTab1__ctl1_gridPolicies_ctl03_lnkDisable').click();
        await page.waitForTimeout(5000);
    }); */

	// More tests to follow...

	/* test('should create test violation for reports', async ({ page }) => {
        await page.waitForTimeout(2000);

        await page.getByText('New').click();
        await expect(page.locator('.modal-content').getByText('Find Owner/Unit')).toBeVisible();
        await page.locator("input[ng-model='$ctrl.ownerFilter.name.value']").fill('Lennon');
        await page.waitForTimeout(2000);

        await expect(page.locator('cat-sub-cat-modal').getByText('Select Category/Subcategory')).toBeVisible();
        await page.getByText('Cypress').click();
        await page.getByText('Automation Test').click();
        await page.getByText('Ok').click();

        await expect(page.locator('add-violation-drawer')).toBeVisible();
        await page.waitForTimeout(2000);

        await page.getByText('Send').click();
        await expect(page.getByText('Success')).toBeVisible();
        await page.waitForTimeout(3000);

        await page.locator("input[ng-model='$ctrl.filter.selectedSearchString.value']").fill('John Lennon');
        await page.getByRole('button', { name: 'submit' }).click();
        await expect(page.locator('.flexbox.unit-list-view-header-inner').getByText('John Lennon')).toBeVisible();
    }); */

	/* test('should load Community Snapshot report', async ({ page }) => {
        await expect(page).toHaveURL(/.*violations\/reports\/snapshot/);
        await page.waitForTimeout(2000);

        await expect(page.locator('.sw-page-header')).toBeVisible();
        await page.getByText('Refresh now').click();
        await expect(page.locator('.viol-report-box.viol-chart-label')).toBeVisible();
    }); */

	/* test('should run Dashboard report', async ({ page }) => {
        await expect(page).toHaveURL(/.*violations\/reports\/dashboard/);
        await page.waitForTimeout(2000);

        await expect(page.getByText('Dashboard Report')).toBeVisible();
        await page.selectOption("select[name='group']", ['Last week']);
        await page.getByText('Run Report').click();
        await expect(page.locator('#idDashBoardPdf')).toBeVisible();
    }); */

	/* test('should run compliance reports and export PDF', async ({ page }) => {
        await expect(page).toHaveURL(/.*violations\/reports\/custom\/Default/);
        await page.waitForTimeout(2000);

        await page.getByText('Get data').click();
        await expect(page.locator('violation-community-report')).toBeVisible();
        await page.locator('.far.fa-file-pdf.fa-2x.sw-red-color').click();

        await expect(page.locator('.modal-content')).toBeVisible();
        await page.getByText('Download').click();
        await page.locator("input[ng-model='$ctrl.fileName']").fill('TestPDFExport');
        await page.getByText('Download Document').click();
        await page.waitForTimeout(3000);

        // Remaining reports tests
        await page.waitForTimeout(2000);
        await page.getByText('Get data').click();
        await expect(page.locator('violation-community-report')).toBeVisible();

        await page.waitForTimeout(2000);
        await page.getByText('Get data').click();
        await expect(page.locator('violation-community-report')).toBeVisible();

        await page.waitForTimeout(2000);
        await page.getByLabel('PicOnly').click();
        await page.getByText('Get data').click();
        await expect(page.locator('violation-picture-report')).toBeVisible();

        await page.waitForTimeout(2000);
        await page.getByText('Get Data').click();
        await expect(page.locator('violation-compliance-report')).toBeVisible();
        await expect(page.locator("div[role='grid']")).toBeVisible();
    }); */

	/* test('should run activity report and print', async ({ page }) => {
        await page.click('text=Activity Report');
        await expect(page).toHaveURL(/violations\/reports\/letters\/queuedprinted/);
        await page.click(".btn.btn-primary.viol-report-btn:has-text('Refresh')");
        await expect(page.locator('.viol-report-box.viol-report-height')).toBeVisible();
        await page.click("i[title='Print Chart']");
    }); */

	/* test('should delete test violation', async ({ page }) => {
        await page.click('text=Violations');
        await page.selectOption("select[ng-model='$ctrl.filter.selectedSearchString']", ['Owner Name (First or Last)']);
        await page.fill("input[ng-model='$ctrl.filter.selectedSearchString.value']", 'Lennon');
        await page.click("button[type='submit']");
        await expect(page.locator('.flexbox.unit-list-view-header-inner:has-text("Lennon")')).toBeVisible();
        await page.click('.flexbox.unit-list-view-header-inner:has-text("Lennon")');
        await expect(page.locator('.violation:has-text("Cypress: Automation Test")')).toBeVisible();
        await page.click("div.sw-btn-wrp.sw-btn-small.sw-options-color:has-text('Options')");
        await page.click("li:has-text('Delete this stage or violation')");
        await page.click("button[ng-click='$ctrl.deleteViolation()']:has-text('Delete')");
        await page.reload();
        await page.selectOption("select[ng-model='$ctrl.filter.selectedSearchString']", ['Owner Name (First or Last)']);
        await page.fill("input[ng-model='$ctrl.filter.selectedSearchString.value']", 'Lennon');
        await page.click("button[type='submit']");
        await expect(page.locator('#violations-view:has-text("John Lennon")')).not.toBeVisible();
    }); */
});
