import { Injectable, OnInit } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/toPromise';

import { InventoryItem } from '../_models/inventory-item';
import { InventoryPurchase } from '../_models/inventory-purchase';

@Injectable()
export class InventoryService {

	itemsSubject: BehaviorSubject<InventoryItem[]> = new BehaviorSubject<InventoryItem[]>([]);

	constructor(private http: Http) {
		this.update();
	}

	getItem(id: string): Promise<InventoryItem> {
		return this.http.get('api/inventory/' + id)
		.toPromise()
		.then((response: Response) => {
			return response.json() as InventoryItem;
		})
		.catch(this.handleError);
	}

	insertItem(item: InventoryItem): Promise<InventoryItem> {
		item = Object.assign({}, item);
		return this.http.post('api/inventory/insert', item)
		.toPromise()
		.then((response: Response) => {
			return response.json() as InventoryItem;
		})
		.catch(this.handleError);
	}

	updateItem(item: any, reset: boolean): Promise<InventoryItem> {
		let body = Object.assign({}, item);
		body.reset = reset;
		console.log(item);
		return this.http.post('api/inventory/update', body)
		.toPromise()
		.then((response: Response) => {
			this.update();
			return response.json() as InventoryItem;
		})
		.catch(this.handleError);
	}

	removeItem(id: String): Promise<boolean> {
		return this.http.post('api/inventory/remove/' + id, {})
		.toPromise()
		.then((response: Response) => {
			this.update();
			return response.json() as Boolean;
		})
		.catch(this.handleError);
	}

	buyItem(item: string, quantity: Number): Promise<InventoryItem> {
		return this.http.post('api/inventory/buy', {item: item, quantity: quantity})
		.toPromise()
		.then((response: Response) => {
			this.update();
			return response.json() as InventoryItem;
		})
		.catch(this.handleError);
	}

	getPurchases(id: string): Promise<InventoryPurchase[]> {
		return this.http.get('api/inventory/purchases/' + id)
		.toPromise()
		.then((response: Response) => {
			return response.json() as InventoryPurchase[];
		})
		.catch(this.handleError);
	}

	cancelPurchase(id: string): Promise<boolean> {

		return this.http.post('api/inventory/purchases/cancel/' + id, {})
		.toPromise()
		.then((response: Response) => {
			this.update();
			return response.json();
		})
		.catch(this.handleError);
	}

	update() {
		this.http.get('api/inventory/all')
		.toPromise()
		.then((response: Response) => {
			this.itemsSubject.next(response.json() as InventoryItem[]);
		})
		.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}