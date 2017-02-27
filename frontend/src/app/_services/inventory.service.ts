import { Injectable, OnInit } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/toPromise';

import { InventoryItem } from '../_models/inventory-item';

declare var CryptoJS: any;

@Injectable()
export class InventoryService {

	private itemsSubject: BehaviorSubject<InventoryItem[]> = new BehaviorSubject<InventoryItem[]>([]);

    constructor(private http: Http) {
		this.update();
	}

	getItem(id: string): Promise<InventoryItem> {
        return this.http.get('api/inventory/item/' + id)
			.toPromise()
			.then((response: Response) => {
                return response.json() as InventoryItem;
            })
			.catch(this.handleError);
    }

	saveItem(item: InventoryItem): Promise<InventoryItem> {
        item = Object.assign({}, item);
        return this.http.post('api/inventory/item', item)
			.toPromise()
			.then((response: Response) => {
                return response.json() as InventoryItem;
            })
			.catch(this.handleError);
    }

	buyItem(item: string, quantity): Promise<InventoryItem> {
        return this.http.post('api/inventory/buy', {item: item, quantity: quantity})
			.toPromise()
			.then((response: Response) => {
				this.update();
                return response.json() as InventoryItem;
            })
			.catch(this.handleError);
    }

    update(): Promise<> {

        this.http.get('api/inventory/items')
			.toPromise()
			.then((response: Response) => {
				this.itemsSubject.next(response.json() as InventoryItem);
            })
			.catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}