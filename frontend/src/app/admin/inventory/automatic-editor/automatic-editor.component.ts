import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { InventoryService } from '../../../_services/inventory.service';

import { InventoryItem } from '../../../_models/inventory-item';

@Component({
	selector: 'item-editor',
	templateUrl: 'app/admin/inventory/automatic-editor/automatic-editor.component.html',
	styleUrls: ['app/admin/inventory/automatic-editor/automatic-editor.component.css'],
	providers: [InventoryService]
})
export class ItemAutomaticEditorComponent implements OnInit {

	private state: number = 1;
	private item: InventoryItem = new InventoryItem();

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
		this.inventoryService.saveItem(this.item)
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