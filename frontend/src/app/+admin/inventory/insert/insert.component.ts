import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { InventoryService } from '../../../_services/inventory.service';

import { InventoryItem } from '../../../_models/inventory-item';

@Component({
	moduleId: module.id,
	selector: 'item-editor',
	templateUrl: 'insert.component.html',
	styleUrls: ['insert.component.css'],

})
export class InsertItemComponent {

	private item: InventoryItem = new InventoryItem();

	constructor(private router: Router, private inventoryService: InventoryService) {}


	save() {
		this.inventoryService.insertItem(this.item)
			.then((item: InventoryItem) => {
				this.item = item;
				this.router.navigate(["/admin/inventory/editor/" + item._id]);
			});
	}

	selectMedia() {
		$('#media').modal('show');
	}

	selectedMedia(files) {
		this.item.icon = files[0]._id;
		$('#media').modal('hide');
	}

	get icon() {
		if( this.item.icon !== "" )
			return "/media/" + this.item.icon;
		return "/images/profile_icon.png";
	}
}