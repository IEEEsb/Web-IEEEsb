import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { InventoryService } from '../../_services/inventory.service';

import { InventoryItem } from '../../_models/inventory-item';

@Component({
	moduleId: module.id,
	selector: 'details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.css']
})
export class BarcodeDetailsComponent implements OnInit {

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
}