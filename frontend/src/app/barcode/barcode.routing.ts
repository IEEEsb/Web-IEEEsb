import { NgModule }             from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { BarcodeComponent }  from './barcode.component';
import { BarcodeInventoryComponent }  from './inventory/inventory.component';
import { BarcodeDetailsComponent }  from './details/details.component';
import { BarcodeLoginComponent }  from './login/login.component';

export const BarcodeRoute: Route = {
	path: 'barcode', component: BarcodeComponent,
	children: [
		{ path: '', component: BarcodeLoginComponent },
		{ path: 'item/:id', component: BarcodeDetailsComponent },
		{ path: 'inventory', component: BarcodeInventoryComponent },
	]
};