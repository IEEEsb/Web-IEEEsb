import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml} from '@angular/platform-browser';

import { UserService } from '../../../_services/user.service';
import { InventoryService } from '../../../_services/inventory.service';

import { User } from '../../../_models/user';
import { InventoryPurchase } from '../../../_models/inventory-purchase';

@Component({
	
	selector: 'editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.less']
})
export class UserEditorComponent implements OnInit {

	user: User = new User();
	private sub: any;
	private purchases: InventoryPurchase[] = [];
	private sortedPurchases: InventoryPurchase[] = [];
	private perPage = 10;
	private currentPage = 1;
	private money = 0;
	loading: boolean = false;

	constructor(private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer, private userService: UserService, private inventoryService: InventoryService) {}

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			if (params['id']) {
				this.userService.getUser(params['id'])
				.then((user: User) => {
					this.user = user;
					this.inventoryService.getPurchases(this.user._id).then((purchases) => {
						this.purchases = purchases;
						this.sort();
					});
				});
			}
		});
	}

	isIEEEuser(){
		return this.user.roles.indexOf('ieee') > 0;
	}
	
	get filteredPurchases() {
		return this.sortedPurchases.slice( (this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
	}

	sort() {
		this.sortedPurchases = this.purchases.sort(this.arraySort);
	}

	arraySort(a: any, b: any) {
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	}

	toIEEE(id: any) {
		this.userService.toIEEE(id)
		.then(() => {
			this.userService.getUser(this.user._id)
			.then((user: User) => {
				this.user = user;
			});
		});
	}

	updateUser() {
		this.userService.updateUser(this.user)
		.then((user: any) => {
			alert("Usuario Actualizado");
		})
		.catch(() => {
			alert("Hubo un error");
		});
	}

	addMoney() {
		this.userService.addMoney(this.user._id, this.money)
		.then(() => {
			alert("Dinero Insertado");
			this.userService.getUser(this.user._id)
			.then((user: User) => {
				this.user = user;
			});
		})
		.catch(() => {
			alert("Hubo un error");
		});
	}
}
