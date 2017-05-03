import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { InventoryService } from '../../_services/inventory.service';

import { InventoryItem } from '../../_models/inventory-item';

@Component({

	selector: 'details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.less']
})
export class BarcodeDetailsComponent implements OnInit {

	item: InventoryItem = new InventoryItem();

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
}