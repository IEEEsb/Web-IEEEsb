import { Component, Input } from '@angular/core';
import { Router }       from '@angular/router';

import { InventoryItem } from '../../_models/inventory-item';

@Component({
	selector: 'item',
	templateUrl: 'app/inventory/itemFrame/item.component.html',
    styleUrls: ['app/inventory/itemFrame/item.component.css']
})
export class ItemComponent {

    @Input() item: InventoryItem = new InventoryItem();
	
	get icon(){
		return 'files/items/icons/' + (this.item.icon === '' ? 'item.png' : this.item.icon);
	}
}