import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { InventoryService } from '../../../_services/inventory.service';

import { InventoryItem } from '../../../_models/inventory-item';

@Component({

	selector: 'item-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.less']
})
export class ItemDetailsComponent implements OnInit {

	item: InventoryItem = new InventoryItem();
	loading: boolean = false;
	quantity: number = 1;

	constructor(private router: Router, private route: ActivatedRoute, private inventoryService: InventoryService) {}

	ngOnInit() {
		this.route.params.subscribe(params => {
			if (params['id']) {
				this.inventoryService.getItem(params['id'])
					.then((item: InventoryItem) => {
						this.item = item;
					}).catch(err => {
						this.router.navigate(["/inventory"]);
					});
			}
		});
	}

	buy(item: any, quantity: any) {
		this.loading = true;
		this.inventoryService.buyItem(item, quantity)
		.then((item: InventoryItem) => {
			this.loading = false;
			this.quantity = 1;
			this.router.navigate(["/inventory"]);
			alert('Compra realizada');
		}).catch((error) => {
			this.loading = false;
			alert('No se ha podido realizar la compra');
		});

	}
}