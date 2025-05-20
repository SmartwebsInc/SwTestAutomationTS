import { APIRequestContext } from '@playwright/test';
import { ViolationData } from './APItypes';

// letter text should be dynamic?
export class ViolationRequests {
	async defaultViolationValues(): Promise<ViolationData> {
		return {
			associationIdEnc: 'AZ0a8xEZyYmD7yrLMUTPnA',
			userIdEnc: 'AXdji-T5ZLUvvkshUESudg',
			unitIdEnc: 'AarjQODUdAUrRp78hUR7qw',
			categoryIdEnc: 'AXKxctlS-yXbMkIkWUSncw',
			subCategoryIdEnc: 'AQbeLBwE1fb_IYVQnkRgBw',
			locationIdEnc: 'AWQGH3sPXjJFRLtl',
			stageIdEnc: 'AR-l-_WpikmRRG8e',
			tempDocFKID: 'e4fbf4ba-a32a-5716-131d-bbb45bb351b9',
			includePdfInLetter: true,
			sendViolation: true,
			reasonText: '',
			letterText:
				'<p><span style="background-color: rgb(74, 134, 232);"><strong>management_company_logo: <img src="https://office.demo.smartwebs.com/ArcCommonResources/ClientUploadedAppResources/DefaultLogoSignatureImages/SW-No-WhiteSpace-Logo_250x68.png" /></strong></span></p>',
			fine: 6,
			cure: 26,
			notes: null,
		};
	}

	async createViolation(request: APIRequestContext, bearerToken: string, violationData: ViolationData) {
		const createViolationResponse = await request.post('SWWebService/Services/Simple/ViolationService.svc/SaveNewViolationEnc', {
			data: violationData,
			headers: {
				Authorization: `Bearer ${bearerToken}`,
				'Content-Type': 'application/json;charset=UTF-8',
				Accept: 'application/json',
			},
		});

		if (createViolationResponse.status() !== 200) {
			const responseText = await createViolationResponse.text();
			console.log('Error response:', responseText);
			throw new Error(`API request failed with status ${createViolationResponse.status()}: ${responseText}`);
		}

		const responseText = await createViolationResponse.text();
		try {
			const responseJson = JSON.parse(responseText);
			return responseJson;
		} catch (e) {
			console.log('Failed to parse response as JSON:', responseText);
			throw new Error('Response was not valid JSON: ' + responseText);
		}
	}
}
