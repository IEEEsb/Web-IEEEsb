import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { InventoryService } from '../../../_services/inventory.service';

import { InventoryItem } from '../../../_models/inventory-item';

declare var $: any;

@Component({

	selector: 'item-editor',
	templateUrl: 'automatic-editor.component.html',
	styleUrls: ['automatic-editor.component.less'],

})
export class ItemAutomaticEditorComponent implements OnInit {

	newItem: boolean = false;
	items: InventoryItem[] = [];
	item: InventoryItem = new InventoryItem();
	disabled: boolean = true;
	reset: boolean = false;
	loading: boolean = false;

	constructor(private inventoryService: InventoryService) {}

	ngOnInit() {
		this.inventoryService.itemsSubject.subscribe((items) => {
			console.log(items);
			this.items = items;
		});
	}

	clean(){
		this.item = new InventoryItem();
		this.newItem = false;
		this.disabled = true;
	}

	search(event: any) {
		let code = this.item.code;
		this.newItem = true;
		for (let item of this.items) {
			if(item.code === code){
				this.item = item;
				this.newItem = false;
				break;
			}
		}
		if(this.newItem) {
			this.item = new InventoryItem();
		} else {
			this.inventoryService.getItem(this.item._id)
			.then((item: InventoryItem) => {
				this.item = item;
			});
		}
		this.disabled = false;
		this.next(event);
	}

	save() {
		this.loading = true;
		this.inventoryService.insertItem(this.item)
		.then((item: InventoryItem) => {
			this.clean();
			document.getElementById('0').focus();
			this.loading = false;
		});
	}

	update(event: any){
		this.loading = true;
		if(event.currentTarget.id == '5'){
			this.inventoryService.updateItem(this.item, this.reset)
			.then((item: InventoryItem) => {
				this.clean();
				this.loading = false;
				document.getElementById('0').focus();
			});
		}
	}

	back(event: any){
		document.getElementById((parseInt(event.currentTarget.id) - 1) + '').focus();
	}

	next(event: any){
		document.getElementById((parseInt(event.currentTarget.id) + 1) + '').focus();
	}

	selectMedia() {
		$('#media').modal('show');
	}

	selectedMedia(files: any[]) {
		this.item.icon = files[0].url;
		$('#media').modal('hide');
	}
}