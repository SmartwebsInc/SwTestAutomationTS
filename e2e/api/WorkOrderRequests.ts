import { APIRequestContext } from '@playwright/test';
import { WorkOrderRequest, WorkOrder } from './APItypes';

export class WorkOrderRequests {
	async defaultWorkOrderValues(): Promise<WorkOrderRequest> {
		return {
			workOrder: {
				PriorityIdEncrypted: 'AXrmwDmEtXnCPuAs-0QFew',
				StatusIdEncrypted: 'AY9_ek8iJFY_30LZWUSnjg',
				ManagementIdEncrypted: 'AaavFNVy_PDnRBmn',
				AssociationIdEncrypted: 'AZ0a8xEZyYmD7yrLMUTPnA',
				CreatedByUserIdEncrypted: 'AXdji-T5ZLUvvkshUESudg',
				IsPreWo: false,
				ReportedFromTypeIdEncrypted: 'AViukqDF5vXFsQIOGUTnWQ',
				ReportedBy: 'Test 201',
				ReportedDate: new Date().toISOString(),
				UnitIdEncrypted: 'AarjQODUdAUrRp78hUR7qw',
				OwnerIdEncrypted: 'AUf__ENQX337GoERmkRkRg',
				UnitAddress: 'Primary 692 Terry St SE',
				Owner: 'Den Coin',
				CategoryIdEncrypted: 'AVDViRwsOwYgRN5R',
				Category: 'General',
				SubCategoryIdEncrypted: 'AYNAKUe9M9UoRNaC',
				SubCategory: 'General',
				Name: 'General - General',
				CustomActivityNote: '',
				CustomActivityNoteIsPublic: false,
				EmailResidents: [],
				TrackingEmails: '',
				MustCompleteByDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days from now
				LastUpdatedByUserIdEncrypted: 'AXdji-T5ZLUvvkshUESudg',
				DocumentsToSave: [],
				DocumentsToDelete: [],
			},
		};
	}

	async createWorkOrder(request: APIRequestContext, bearerToken: string, workOrderData: WorkOrderRequest, mgtIdEncrypted: string) {
		const response = await request.post('SWWebservice/Services/WorkOrdersArea/WorkOrdersAreaService.svc/SaveWorkOrder', {
			params: {
				mgtIdEncrypted,
			},
			data: workOrderData,
			headers: {
				Authorization: `Bearer ${bearerToken}`,
				'Content-Type': 'application/json;charset=UTF-8',
				Accept: 'application/json',
			},
		});

		if (response.status() !== 200) {
			const responseText = await response.text();
			console.log('Error response:', responseText);
			throw new Error(`API request failed with status ${response.status()}: ${responseText}`);
		}

		const responseText = await response.text();
		try {
			const responseJson = JSON.parse(responseText);
			return responseJson;
		} catch (e) {
			console.log('Failed to parse response as JSON:', responseText);
			throw new Error('Response was not valid JSON: ' + responseText);
		}
	}
}
