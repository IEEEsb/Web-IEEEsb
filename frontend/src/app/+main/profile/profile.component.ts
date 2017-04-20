import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../_services/user.service';
import { InventoryService } from '../../_services/inventory.service';

import { User } from '../../_models/user';
import { InventoryPurchase } from '../../_models/inventory-purchase';

@Component({
	moduleId: module.id,
	selector: 'profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css'],

})
export class ProfileComponent {

	private perPage = 10;
	private user: User = new User();
	private purchases: InventoryPurchase[] = [];
	private sortedPurchases: InventoryPurchase[] = [];
	private currentPage = 1;
	private loading: boolean = false;

	constructor(private router: Router, private userService: UserService, private inventoryService: InventoryService) {

		userService.userSubject.subscribe((user) => {
			if(user !== null){
				this.user = user;
			}
		});

		if(this.user !== new User()){
			this.inventoryService.getPurchases(this.user._id).then((purchases) => {
				this.purchases = purchases;
				this.sort();
			});
		}
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

	cancel(purchaseId: any) {
		this.loading = true;
		this.inventoryService.cancelPurchase(purchaseId)
		.then((ok) => {
			let index = this.purchases.findIndex(element => {
				return element._id === purchaseId;
			});
			this.purchases[index].cancelled = true;
			this.userService.update();
			this.loading = false;
		})
		.catch(reason => {
			this.loading = false;
		});
	}
}
