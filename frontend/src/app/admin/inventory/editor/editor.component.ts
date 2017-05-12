import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { InventoryService } from '../../../_services/inventory.service';

import { InventoryItem } from '../../../_models/inventory-item';

declare var $: any;

@Component({

	selector: 'item-editor',
	templateUrl: 'editor.component.html',
	styleUrls: ['editor.component.less']
})
export class ItemEditorComponent implements OnInit {

	item: InventoryItem = new InventoryItem();
	loading: boolean = false;

	constructor(private router: Router, private route: ActivatedRoute, private inventoryService: InventoryService) {}

	ngOnInit() {
		this.route.params.subscribe(params => {
			if (params['id']) {
				this.inventoryService.getItem(params['id'])
				.then((item: InventoryItem) => {
					this.item = item;
				}).catch(err => {
					this.router.navigate(["/admin/inventory/editor"]);
				});
			}
		});
	}

	save() {
		this.loading = true;
		this.inventoryService.updateItem(this.item, false)
		.then((item: InventoryItem) => {
			this.item = item;
			this.loading = false;
		});
	}

	selectMedia() {
		$('#media').modal('show');
	}

	selectedMedia(file: any) {
		this.item.icon = file.url;
		$('#media').modal('hide');
	}
}