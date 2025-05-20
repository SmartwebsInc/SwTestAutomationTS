import { test, expect } from '../../fixtures/BasePages';

type MyCallbackFunction = (role: any) => Promise<void>;
export class helpers {
	async softStepsForRoles(roleList: any[], steps: MyCallbackFunction) {
		for (const role of roleList) {
			try {
				await test.step(
					`${role.userRole}`,
					async () => {
						await steps(role);
					},
					{ box: true },
				);
			} catch (err) {
				await test.step(
					'Failed 🔼',
					async () => {
						expect.soft(1, `Failed for ${role.userRole}\n${err}`).toBe(0);
					},
					{ box: true },
				);
			}
		}
	}

	async softStepsForPages(pageList: any[], steps: MyCallbackFunction) {
		for (const pageObj of pageList) {
			try {
				await test.step(
					`${pageObj.pageName}`,
					async () => {
						await steps(pageObj);
					},
					{ box: true },
				);
			} catch (err) {
				await test.step(
					'Failed 🔼',
					async () => {
						expect.soft(1, `Failed for ${pageObj.pageName}\n${err}`).toBe(0);
					},
					{ box: true },
				);
			}
		}
	}
}
