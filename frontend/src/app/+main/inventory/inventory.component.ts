import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { Router } from '@angular/router';

import { InventoryService } from '../../_services/inventory.service';
import { UserService } from '../../_services/user.service';
import { InventoryItem } from '../../_models/inventory-item';

@Component({
	moduleId: module.id,
	selector: 'inventory',
	templateUrl: './inventory.component.html',
	styleUrls: ['./inventory.component.css'],
	animations: [
		trigger('message', [
			transition('void => *', [
				style({transform: 'translateY(1000%)'}),
				animate(500)
			]),
			transition('* => void', [
				animate(500, style({opacity: '0'}))
			])
		])
	]
})
export class InventoryComponent implements OnInit {

	items: InventoryItem[] = [];
	filteredItems: InventoryItem[] = [];
	loading: boolean = true;
	params: any = {
		search: "",
		order: "asc"
	}
	quantity: number = 1;
	messages: string[] = [];

	constructor(private inventoryService: InventoryService, private userService: UserService) {

	}
	ngOnInit() {
		this.inventoryService.itemsSubject.subscribe((items) => {
			this.items = items;
			this.filter();
			this.loading = false;
		});

	}

	filter() {
		this.filteredItems = this.items.filter(this.arrayFilter, this);
	}

	arrayFilter(element: any) {
		let find = false;
		for(let key in element) {
			if(['code', 'name'].indexOf(key) >= 0) {
				if(element[key].toString().match(new RegExp(this.params.search, "i"))){
					find = true;
				}
			} else if (['location', 'tags'].indexOf(key) >= 0){
				for(let value of element[key]) {
					if(value.toString().match(new RegExp(this.params.search, "i"))){
						find = true;
					}
				}
			}
		}

		return find;
	}

	searchEnter() {
		let item = this.items.find(this.codeIsOnArray, this);
		if(item){
			this.buy(item, 1);
			this.params.search = "";
			this.filter();
		}
	}

	codeIsOnArray(element: any) {
		return element.code == this.params.search;
	}

	getItemIcon(item: any) {
		if( item.icon !== "" )
		return "/media/" + item.icon;
		return "/images/profile_icon.png";
	}

	buy(item: any, quantity: any) {
		this.inventoryService.buyItem(item, quantity)
		.then(
			(item: InventoryItem) => {
				this.quantity = 1;
				this.userService.update();
				this.messages.push(item.name + ' comprado');
				setTimeout(() => {
					this.messages.shift();
				}, 2500);
			},
			(error) => {
				alert('No se ha podido realizar la compra')
			});
		}
	}