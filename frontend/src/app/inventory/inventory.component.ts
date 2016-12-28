import { Component, OnInit } from '@angular/core';
import { Router }       from '@angular/router';

import { InventoryService } from '../_services/inventory.service';
import { InventoryItem } from '../_models/inventory-item';

@Component({
	selector: 'inventory',
	templateUrl: 'app/inventory/inventory.component.html',
    styleUrls: ['app/inventory/inventory.component.css'],
	providers: [InventoryService]
})
export class InventoryComponent implements OnInit {

	items: InventoryItem[] = [];
	filteredItems: InventoryItem[] = [];
	loading: boolean = true;
	params: any = {
		search: "",
		order: "asc"
	}

	constructor(private inventoryService: InventoryService){
		
	}
	ngOnInit() {
		
		this.inventoryService.getItems()
			.then((items: InventoryItem[]) => {
				this.items = items;
				this.filter();
				this.loading = false;
			})
			.catch((error: any) => this.error = error);

		/*for (let i = 0; i < 29; i++) {
			this.items.push(new InventoryItem());
		}*/
	}
	
	filter() {
		console.log(this.params.search);
		this.filteredItems = [];
		for(let index in this.items){
			let item = this.items[index];
			if(item.name.match(new RegExp(this.params.search,"i"))){
				this.filteredItems.push(item);
			}
		}
		//this.filteredItems = this.items;
	}
	
	click(item){
		console.log(item);
	}
}