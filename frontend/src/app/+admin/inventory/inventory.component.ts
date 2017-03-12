import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { InventoryService } from '../../_services/inventory.service';
import { InventoryItem } from '../../_models/inventory-item';

@Component({
	moduleId: module.id,
	selector: 'inventory-admin',
	templateUrl: 'inventory.component.html',
	styleUrls: ['inventory.component.css'],

})
export class InventoryAdminComponent {

	items: InventoryItem[] = [];
	filteredItems: InventoryItem[] = [];
	loading: boolean = true;
	params: any = {
		search: "",
		order: "asc"
	}

	constructor(private inventoryService: InventoryService) {}

	ngOnInit() {

		this.inventoryService.itemsSubject.subscribe((items) => {
			this.items = items;
			this.filter();
			this.loading = false;
		});

	}

	filter() {
		console.log(this.params.search);
		this.filteredItems = [];
		for (let index in this.items) {
			let item = this.items[index];
			if (item.name.match(new RegExp(this.params.search, "i"))) {
				this.filteredItems.push(item);
			}
		}
	}

	remove(id: any) {
		window.confirm('¿Seguro de que lo quieres borrar?') ? this.inventoryService.removeItem(id) : false;
	}

	getItemIcon(item: any){
		if( item.icon !== "" )
			return "/media/" + item.icon;
		return "/images/profile_icon.png";
	}
}