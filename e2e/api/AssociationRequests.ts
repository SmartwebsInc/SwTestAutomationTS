import { APIRequestContext } from '@playwright/test';
import { AssociationRequest } from './APItypes';

export class AssociationRequests {
	async defaultAssociationValues(name: string): Promise<AssociationRequest> {
		return {
			$id: '1',
			hoaDetails: {
				$id: '2',
				Name: name,
				AssociationLongName: `HOA ${name}`,
				Address1: '693 Terry St SE',
				City: 'Atlanta',
				State: 'GA',
				Zip: '30315',
				TimeZoneOffset: 1,
				PreferredStartDate: new Date().toISOString(),
				IsImport: false,
				IsMultiOwnerEnabled: true,
				IsNameUnique: true,
			},
			productSettings: {
				General: {
					BoardHearingEnabled: false,
				},
				SmartBooks: {
					SmartAccountingEnabled: false,
					SecurityDepositEnabled: false,
					FiscalStartMonth: 11,
					WrapBudgetByFiscalMonth: false,
					ImportCollectionSetup: true,
					ImportStatementSetup: true,
					ImportVendors: true,
				},
				SmartArc: {
					SmartArchitecturalsEnabled: false,
				},
				SmartVio: {
					SmartViolationsEnabled: false,
					ViolationEmailsOn: false,
					MultiViolationEnabled: false,
					MapsEnabled: false,
					SingleViolDisplayLetter: false,
					TenantEmail: false,
					TenantCertified: false,
					TenantFirstClass: false,
					ViolLetterToAltAddress: false,
					AltAddressEmail: false,
					AltAddressFirstClass: false,
					AltAddressCertified: false,
					FirstClassMailing: false,
					CertifiedMailing: false,
					FirstClassColor: false,
					CertifiedColor: false,
					EmailOnPrint: false,
					ViolationDurationPeriod: 0,
				},
				SmartWO: {
					SmartWorkOrdersEnabled: false,
				},
				SmartComm: {
					SmartCommunicationsEnabled: false,
				},
				SmartPortals: {
					ResidentPortalEnabled: false,
				},
				GlobalReporting: {
					GlobalReportingEnabled: false,
				},
				Community: {
					SmartCommunityEnabled: false,
				},
			},
			userSettings: {
				tab: 'role',
				SelectedUsers: {
					$id: '14',
					$values: [],
				},
				SelectedRoles: {
					$id: '15',
					$values: [],
				},
				NewUsers: {
					$id: '16',
					$values: [],
				},
				IsManagementRolesOnly: true,
				ShowAllContacts: false,
				AddCurrentUser: true,
				AssociationIdEncrypted: 'AZ0a8xEZyYmD7yrLMUTPnA',
			},
			geoCodeSettings: {
				IsEnabled: false,
				DayOfWeek: 7,
				Hour: 4,
			},
			markSiteLive: true,
		};
	}

	// url has to be fixed and contains the encrypted management id like this:
	// https://api-sworg.demo.smartwebs.com/SiteSetup/SetupAssociation?mgtIdEncrypted=AaavFNVy_PDnRBmn
	async createAssociation(request: APIRequestContext, bearerToken: string, associationData: AssociationRequest) {
		const createAssociationResponse = await request.post('SWWebservice/Services/AssociationArea/AssociationAreaService.svc/SaveAssociation', {
			data: associationData,
			headers: {
				Authorization: `Bearer ${bearerToken}`,
				'Content-Type': 'application/json;charset=UTF-8',
				Accept: 'application/json',
			},
		});

		if (createAssociationResponse.status() !== 200) {
			const responseText = await createAssociationResponse.text();
			console.log('Error response:', responseText);
			throw new Error(`API request failed with status ${createAssociationResponse.status()}: ${responseText}`);
		}

		const responseText = await createAssociationResponse.text();
		try {
			const responseJson = JSON.parse(responseText);
			return responseJson;
		} catch (e) {
			console.log('Failed to parse response as JSON:', responseText);
			throw new Error('Response was not valid JSON: ' + responseText);
		}
	}
}
