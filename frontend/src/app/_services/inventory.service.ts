import { Injectable, OnInit } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { InventoryItem } from '../_models/inventory-item';

declare var CryptoJS: any;

@Injectable()
export class InventoryService {

    constructor(private http: Http) {}
    
    getItems(): Promise<InventoryItem[]> {

        return this.http.get('api/inventory/items')
			.toPromise()
			.then((response: Response) => {
                return response.json() as InventoryItem[];
            })
			.catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}