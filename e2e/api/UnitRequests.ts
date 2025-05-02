import { APIRequestContext, expect } from '@playwright/test';
import { OwnerUnitData } from './APItypes';

export class UnitRequests {
	async defaultUnitValues(ownerFirstName: string, ownerLastName: string): Promise<OwnerUnitData> {
		return ({
			owner: {
				MailingAddress: '693 Terry St SE',
				MailingAddress2: '',
				MailingCity: 'Atlanta',
				MailingZip: '30315',
				EnableEmail: true,
				EnableMail: true,
				EnableTextMessage: true,
				EnableVoiceMessage: true,
				EnableEmailBilling: true,
				EnablePaperBilling: true,
				PrimaryPhoneNumber: '',
				OwnerFirstName: ownerFirstName,
				OwnerLastName: ownerLastName,
				OwnerEmail: 'example@gmail.com',
				DayPhone: '',
				NightPhone: '',
				CellPhone1: '',
				CellPhone2: '',
				OtherPhone: '',
				MailingState: 'GA',
				MailingCountryCode: 'United States',
				MailingProvence: '',
				AssociationIdEncrypted: 'AZ0a8xEZyYmD7yrLMUTPnA',
				CreatedByUserIdEncrypted: 'AXdji-T5ZLUvvkshUESudg',
			},
			unit: {
				AssociationIdEncrypted: 'AZ0a8xEZyYmD7yrLMUTPnA',
				UnitCity: 'Atlanta',
				UnitZip: '30315',
				UnitState: 'GA',
				UnitTypeCodeEidEncrypted: 'ASigsN0fqH6zRE0p',
				UnitAddressStreet: 'Terry St SE',
				UnitAddressNumber: '693',
			},
			clientKey: {
				AssociationIdEncrypted: 'AZ0a8xEZyYmD7yrLMUTPnA',
				ManagementIdEncrypted: 'AaavFNVy_PDnRBmn',
				UserIdEncrypted: 'AXdji-T5ZLUvvkshUESudg',
			},
			closingDate: null,
		});
	}
    
	async createUnit(request: APIRequestContext, bearerToken: string, ownerUnitData: OwnerUnitData) {
		const createOwnerResponse = await request.post(
			'SWWebservice/Services/UnitsArea/UnitsAreaService.svc/SaveOwnerUnitEx',
			{
				data: ownerUnitData,
				headers: {
					'Authorization': `Bearer ${bearerToken}`,
					'Content-Type': 'application/json;charset=UTF-8',
					'Accept': 'application/json',
				},
			},
		);
        
		if (createOwnerResponse.status() !== 200) {
			const responseText = await createOwnerResponse.text();
			console.log('Error response:', responseText);
			throw new Error(`API request failed with status ${createOwnerResponse.status()}: ${responseText}`);
		}
        
		const responseText = await createOwnerResponse.text();
		try {
			const responseJson = JSON.parse(responseText);
			return responseJson;
		} catch (e) {
			console.log('Failed to parse response as JSON:', responseText);
			throw new Error('Response was not valid JSON: ' + responseText);
		}
	}
}