import { OwnerUnitRequests } from "./UnitRequests";
import * as fs from 'fs';

interface Cookie {
    name: string;
    value: string;
}
export class API {
	readonly ownerUnitRequests: OwnerUnitRequests;
	readonly bearerToken: string;

	constructor(storageStatePath: string) {
        this.ownerUnitRequests = new OwnerUnitRequests();

		const cookiesPaths = {
			sa: `${storageStatePath}/sa.json`,
		};

		const readStorageState = (path: string): Cookie[] => {
			const storageStateContents = fs.readFileSync(path, 'utf8');
			const parsedContents = JSON.parse(storageStateContents);
			return parsedContents.cookies;
		};

		const findAccessToken = (cookies: Cookie[]): string => {
			const accessTokenCookie = cookies.find((item: Cookie) => item.name === 'Smartwebs.Sts.Smartweb.Sts');
			return accessTokenCookie ? accessTokenCookie.value : '';
		};

		this.bearerToken = findAccessToken(readStorageState(cookiesPaths.sa));
	}
}
