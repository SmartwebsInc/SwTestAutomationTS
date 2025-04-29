import { test, expect } from '@playwright/test';
import { ViolationsPO } from '../../page-objects/violations/ViolationsPO';
import { LoginPO } from '../../page-objects/login/LoginPO';
import { NavigationHelper } from '../../page-objects/helpers/NavigationHelper';
import { AssessmentsPO } from '../../page-objects/violations/AssessmentsPO';

test.describe('Violations Assessment Tests', () => {
	let violationsPO: ViolationsPO;
	let loginPO: LoginPO;
	let navigationHelper: NavigationHelper;
	let assessmentsPage: AssessmentsPO;

	test.beforeEach(async ({ page }) => {
		loginPO = new LoginPO(page);
		navigationHelper = new NavigationHelper(page);
		violationsPO = new ViolationsPO(page);
		assessmentsPage = new AssessmentsPO(page);

		await page.goto('');
		await loginPO.login();
		await navigationHelper.selectDefaultAssociation();
		await page.goto('#/violations/assessments');
	});

	test('ID_0252 should assess selected violation', async ({ page }) => {
		try {
			// Navigate to Violations List Page
			await navigationHelper.leftMenuNavigation('Violations', 'Add');

			// Create a new violation
			await violationsPO.addViolationPO.addViolationAndSend('Lennon', 'Cypress', 'Automation Test');

			// Search for the violation
			await violationsPO.printTab.click();
			await violationsPO.searchViolation('Last Name', 'Lennon');

			// Print the violation
			await violationsPO.printViolation();

			// Search for the violation
			await violationsPO.assessmentsTab.click();
			await violationsPO.searchViolation('Last Name', 'Lennon');

			// Assess the violation
			await violationsPO.assessViolation();
            
			// Assert that the violation was assessed
			await violationsPO.assessmentsPO.showDropdown.selectOption('Fines Assessed');
			await violationsPO.searchViolation('Last Name', 'Lennon');
			await expect(violationsPO.assessmentsPO.cardViolation).toContainText('Lennon');
			await expect(violationsPO.assessmentsPO.cardViolation).toContainText('Automation Test');
		} finally {
			// Ensure the violation is deleted in any case
			await violationsPO.deleteViolation('Owner Name (First or Last)', 'Lennon');
		}
	});
});