import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { InventoryService } from '../../_services/inventory.service';
import { InventoryItem } from '../../_models/inventory-item';

@Component({
	
	selector: 'inventory-admin',
	templateUrl: 'inventory.component.html',
	styleUrls: ['inventory.component.less'],

})
export class InventoryAdminComponent {

	items: InventoryItem[] = [];
	filteredItems: InventoryItem[] = [];
	loading: boolean = false;
	params: any = {
		search: "",
		order: "asc"
	}

	constructor(private inventoryService: InventoryService) {}

	ngOnInit() {
		this.loading = true;
		this.inventoryService.itemsSubject.subscribe((items) => {
			this.items = items;
			this.filter();
			this.loading = false;
		});

	}

	filter() {
		console.log(this.params.search);
		this.filteredItems = [];
		for (let item of this.items) {
			if (item.name.match(new RegExp(this.params.search, "i"))) {
				this.filteredItems.push(item);
			}
		}
	}

	remove(id: any) {
		if(window.confirm('¿Seguro de que lo quieres borrar?')){
			this.inventoryService.removeItem(id);
		}
	}
}