import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, trigger, state, style, transition, animate } from '@angular/core';
import { Router } from '@angular/router';

import { InventoryService } from '../../_services/inventory.service';
import { UserService } from '../../_services/user.service';
import { InventoryItem } from '../../_models/inventory-item';
import { User } from '../../_models/user';

@Component({
	
	selector: 'inventory',
	templateUrl: './inventory.component.html',
	styleUrls: ['./inventory.component.less'],

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
export class BarcodeInventoryComponent implements OnInit, OnDestroy, AfterViewInit {
	@ViewChild("searchBar")
	private _searchBar: ElementRef;

	items: InventoryItem[] = [];
	filteredItems: InventoryItem[] = [];
	params: any = {
		search: "",
		order: "asc"
	}
	quantity: number = 1;
	messages: string[] = [];
	userSubject: any = null;
	inventorySubject: any = null;
	user: User = new User();
	timer: any = null;
	loading: boolean = false;

	constructor(private router: Router, private inventoryService: InventoryService, private userService: UserService) {}

	ngOnInit() {
		this.userSubject = this.userService.userSubject.subscribe((user) => {
			if(user){
				this.user = user;
				this.timer = window.setTimeout(() => {this.logoutUser()}, 60000);
			} else {
				this.router.navigate(['/barcode']);
			}
		});
		this.inventorySubject = this.inventoryService.itemsSubject.subscribe((items) => {
			this.items = items;
			this.filter();
			this.loading = false;
		});
	}

	ngAfterViewInit(): void {
		this._searchBar.nativeElement.focus();
	}

	ngOnDestroy() {
		clearTimeout(this.timer);
		if(this.userSubject){
			this.userSubject.unsubscribe();
			if(this.inventorySubject){
				this.inventorySubject.unsubscribe();
			}
		}
	}

	logoutUser(): void {
		this.loading = true;
		this.userService.logout()
		.then((logout: boolean) => {
			this.router.navigate(['/barcode']);
			this.loading = false;
		}).catch((error) => {
			alert('Hubo un error al desconectarse');
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

	buy(item: any, quantity: any) {
		this.loading = true;
		this.inventoryService.buyItem(item, quantity)
		.then((item: InventoryItem) => {
			this.quantity = 1;
			this.userService.update();
			this.messages.push(item.name + ' comprado');
			setTimeout(() => {
				this.messages.shift();
			}, 2500);
			this.loading = false;
		})
		.catch(error => {
			alert('No se ha podido realizar la compra');
			this.loading = false;
		});
	}
}