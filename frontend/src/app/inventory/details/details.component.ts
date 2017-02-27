import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { InventoryService } from '../../_services/inventory.service';

import { InventoryItem } from '../../_models/inventory-item';

@Component({
	selector: 'item-details',
	templateUrl: 'app/inventory/details/details.component.html',
	styleUrls: ['app/inventory/details/details.component.css']
})
export class ItemDetailsComponent implements OnInit {

	private item: InventoryItem = new InventoryItem();

	constructor(private router: Router, private route: ActivatedRoute, private inventoryService: InventoryService) {}

	ngOnInit() {
		this.route.params.subscribe(params => {
			if (params['id']) {
				this.inventoryService.getItem(params['id'])
					.then((item: InventoryItem) => {
						this.item = item;
					}).catch(err => {
						this.router.navigate(["/admin/inventory/item"]);
					});
			}
		});
	}

	get icon() {
		if( this.item.icon !== "" )
			return "/media/" + this.item.icon;
		return "/images/profile_icon.png";
	}
}