import { UnitRequests } from './UnitRequests';
import { AssociationRequests } from './AssociationRequests';
import { ViolationRequests } from './ViolationRequests';
import { WorkOrderRequests } from './WorkOrderRequests';
import * as fs from 'fs';
import * as path from 'path';

export function getAccessTokenFromSessionStorage(): string {
	const sessionStoragePath = path.join(__dirname, '../auth/session-storage.json');
	const storageContents = fs.readFileSync(sessionStoragePath, 'utf8');
	const parsedContents = JSON.parse(storageContents);
    
	// Find the oidc.user key
	const userDataKey = Object.keys(parsedContents).find(key => key.includes('oidc.user'));
	if (!userDataKey) return '';
    
	// Parse the user data string and extract access_token
	const userData = JSON.parse(parsedContents[userDataKey]);
	return userData.access_token || '';
}

export class API {
	readonly ownerUnitRequests: UnitRequests;
	readonly associationRequests: AssociationRequests;
	readonly violationRequests: ViolationRequests;
	readonly workOrderRequests: WorkOrderRequests;
	readonly bearerToken: string;

	constructor() {
		this.ownerUnitRequests = new UnitRequests();
		this.associationRequests = new AssociationRequests();
		this.violationRequests = new ViolationRequests();
		this.workOrderRequests = new WorkOrderRequests();
		this.bearerToken = getAccessTokenFromSessionStorage();
	}
}
