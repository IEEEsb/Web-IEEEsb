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

	constructor(private router: Router, private userService: UserService, private inventoryService: InventoryService) {

		userService.userSubject.subscribe((user) => {
			if(user !== null){
				this.user = user;

				this.inventoryService.getPurchases(user._id).then((purchases) => {
					this.purchases = purchases;
					this.sort();
				})
			}
		});
	}

	get displayPurchases() {
		return this.sortedPurchases.slice( (this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
	}

	sort() {
		this.sortedPurchases = this.purchases.sort(this.arraySort);
	}

	arraySort(a: any, b: any) {
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	}

	cancel(purchaseId: any) {
		this.inventoryService.cancelPurchase(purchaseId).then((ok) => {
			this.userService.update();
		});
	}
}
