import { Component, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../_services/user.service';
import { InventoryService } from '../../_services/inventory.service';

import { User } from '../../_models/user';
import { InventoryPurchase } from '../../_models/inventory-purchase';

declare var paypal: any;

@Component({

	selector: 'profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.less'],

})
export class ProfileComponent implements AfterViewInit{

	perPage = 10;
	user: User = new User();
	purchases: InventoryPurchase[] = [];
	sortedPurchases: InventoryPurchase[] = [];
	currentPage = 1;
	amount = 0;
	loading: boolean = false;
	oldPassword: string = "";
	newPassword: string = "";

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

	ngAfterViewInit() {
		this.paypalButton();
	}

	updateUser() {
		this.loading = true;
		this.userService.updateUser(this.user)
		.then((user: any) => {
			this.loading = false;
			alert("Usuario Actualizado");
		})
		.catch(() => {
			this.loading = false;
			alert("Hubo un error");
		});
	}

	changePassword() {
		this.loading = true;
		this.userService.changePassword(this.user.alias, this.oldPassword, this.newPassword)
		.then(() => {
			this.loading = false;
			alert("Contraseña Actualizada");
		})
		.catch(() => {
			this.loading = false;
			alert("Hubo un error");
		});
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

	get fee() {
		let fee = 0.034;
		let fix = 0.35;
		return Math.round(((this.amount * fee + fix) / (1 - fee)) * 100) / 100;
	}

	get totalAmount() {
		return Math.round((this.amount + this.fee) * 100) / 100;
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

	paypalButton(){
		paypal.Button.render({

			// Set your environment

			env: 'production', // sandbox | production

			// Specify the style of the button

			style: {
				label: 'checkout', // checkout || credit
				size:  'medium',    // tiny | small | medium
				shape: 'rect',     // pill | rect
				color: 'blue'      // gold | blue | silver
			},
			// Wait for the PayPal button to be clicked

			payment: () => {

				// Make a call to the merchant server to set up the payment
				return paypal.request.post('/api/paypal/createpayment/' + this.totalAmount).then(function(res) {
					return res.id;
				});
			},

			// Wait for the payment to be authorized by the customer

			onAuthorize: (data, actions) => {

				// Make a call to the merchant server to execute the payment
				return paypal.request.post('/api/paypal/executepayment', {
					paymentID: data.paymentID,
					payerID: data.payerID
				}).then((res) => {
					this.userService.update();
				});
			}

		}, '.paypal-button');
	}
}
