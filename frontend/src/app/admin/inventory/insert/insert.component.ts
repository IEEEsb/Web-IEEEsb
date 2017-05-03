import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { InventoryService } from '../../../_services/inventory.service';

import { InventoryItem } from '../../../_models/inventory-item';

declare var $: any;

@Component({

	selector: 'item-editor',
	templateUrl: 'insert.component.html',
	styleUrls: ['insert.component.less'],

})
export class InsertItemComponent {

	item: InventoryItem = new InventoryItem();
	loading: boolean = false;

	constructor(private router: Router, private inventoryService: InventoryService) {}


	save() {
		this.loading = true;
		this.inventoryService.insertItem(this.item)
		.then((item: InventoryItem) => {
			this.item = item;
			this.router.navigate(["/admin/inventory/editor/" + item._id]);
			this.loading = false;
		}).catch(reason => {
			alert("Hubo un error");
			this.loading = false;
		});
	}

	selectMedia() {
		$('#media').modal('show');
	}

	selectedMedia(files: any) {
		this.item.icon = files[0].url;
		$('#media').modal('hide');
	}
}